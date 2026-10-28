// Popcar: What a pain. This kind of ruins the point of Fixi by overcomplicating page changes. I didn't want a single page app.

// browsers without cross-document view transitions (Firefox) ignore the pages' @view-transition rule, but they do run
// same-document ones. so there, following a link to another of our pages fetches it and swaps it into this one inside
// a view transition, which gives the same crossfade: its missing stylesheets and scripts are added first, then its
// title and body replace ours and its inline scripts run as on a real load (play.html's script is written to allow that)
if (!window.CSSViewTransitionRule && document.startViewTransition) {
  let shown = location.pathname, visits = 0

  async function visit(url, push) {
    let current = ++visits
    try {
      let response = await fetch(url)
      if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) throw response
      let page = new DOMParser().parseFromString(await response.text(), "text/html")
      await Promise.all([...page.head.querySelectorAll("link[rel=stylesheet], script[src]")].map(load))
      if (current != visits) return  // a newer click took over
      document.startViewTransition(() => {
        document.dispatchEvent(new Event("page:leave"))  // the old page drops its listeners on document and window
        if (push) history.pushState(null, "", url)
        shown = location.pathname
        document.title = page.title
        document.body.replaceWith(document.importNode(page.body, true))
        document.body.querySelectorAll("script").forEach(run)
        scrollTo(0, 0)
        document.dispatchEvent(new Event("DOMContentLoaded"))  // fixi and play.html set up on it
      }).updateCallbackDone.catch(() => location.href = url)
    } catch {
      location.href = url  // anything unexpected gets a plain page load instead
    }
  }

  // adds a stylesheet or script the new page has and we don't, resolving once it has loaded
  function load(tag) {
    let attr = tag.localName == "link" ? "href" : "src"
    let url = new URL(tag.getAttribute(attr), location).href
    if ([...document.head.querySelectorAll(tag.localName)].some((old) => old[attr] == url)) return
    let copy = document.createElement(tag.localName)
    for (let a of tag.attributes) copy.setAttribute(a.name, a.value)
    return new Promise((resolve) => { copy.onload = copy.onerror = resolve; document.head.append(copy) })
  }

  // scripts that come in parsed don't run, but fresh copies do
  function run(old) {
    let script = document.createElement("script")
    for (let a of old.attributes) script.setAttribute(a.name, a.value)
    script.text = old.text
    old.replaceWith(script)
  }

  document.addEventListener("click", (e) => {
    let link = e.target.closest("a[href]")
    if (!link || e.defaultPrevented || e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
    if (link.target || link.hasAttribute("download") || link.origin != location.origin) return
    if (link.pathname == location.pathname) return  // same page, e.g. a #hash
    e.preventDefault()
    visit(link.href, true)
  })

  // Back and Forward between pages we swapped in; moves between #hashes of the same page are left to it
  addEventListener("popstate", () => { if (location.pathname != shown) visit(location.href, false) })
}
