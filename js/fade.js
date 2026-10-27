// browsers without cross-document view transitions (Firefox) ignore the pages' @view-transition rule, so they
// get a fade instead: each page fades in, and following a link to another of our pages fades out first
if (!window.CSSViewTransitionRule) {
  let html = document.documentElement
  html.classList.add("fade-in")

  document.addEventListener("click", (e) => {
    let link = e.target.closest("a[href]")
    if (!link || e.defaultPrevented || e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
    if (link.target || link.hasAttribute("download") || link.origin != location.origin) return
    if (link.pathname == location.pathname && link.search == location.search) return  // same page, e.g. a #hash
    e.preventDefault()
    html.classList.add("fade-out")
    setTimeout(() => location.href = link.href, 100)  // the fade-out's length in style.css
  })

  // coming Back restores the page as it was left, faded out
  addEventListener("pageshow", (e) => { if (e.persisted) html.classList.remove("fade-out") })
}
