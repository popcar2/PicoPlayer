// visit counter (goatcounter), only in the browser: the installed app doesn't count. loaded at the end of each page's
// body rather than its head, so it runs again (and counts the visit) when transitions.js swaps in another page.
// it's optional, so anything going wrong here (a blocker, goatcounter failing) is ignored.
// no top-level let/const: running a second time would redeclare them

// checked before anything is sent rather than once on load: installing can move an open tab into an app window
function inApp() {
  return matchMedia("(display-mode: standalone), (display-mode: fullscreen), (display-mode: minimal-ui)").matches || !!navigator.standalone
}

if (!inApp()) {
  let counter = document.createElement("script")
  counter.dataset.goatcounter = "https://popcar2.goatcounter.com/count"
  counter.src = "//gc.zgo.at/count.js"
  document.body.append(counter)
}

// play.html counts which games get played, as events named after the game's folder. goatcounter's script loads
// async, so a game picked before it's ready counts once it is
function countGame(slug, title) {
  let count = () => { if (!inApp()) try { goatcounter.count({ path: "game/" + slug, title, event: true }) } catch {} }
  if (window.goatcounter?.count) count()
  else document.querySelector("script[data-goatcounter]")?.addEventListener("load", count, { once: true })
}
