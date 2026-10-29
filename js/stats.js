// visit counter (goatcounter), only in the browser: the installed app doesn't count. loaded at the end of each page's
// body rather than its head, so it runs again (and counts the visit) when transitions.js swaps in another page.
// it's optional, so anything going wrong here (a blocker, offline_pwa.js missing, goatcounter failing) is ignored.
// no top-level let/const: running a second time would redeclare them
function inApp() { return typeof installedApp != "undefined" && installedApp }
if (!inApp()) {
  let counter = document.createElement("script")
  counter.dataset.goatcounter = "https://popcar2.goatcounter.com/count"
  counter.src = "//gc.zgo.at/count.js"
  document.body.append(counter)
}

// play.html counts which games get played, as events named after the game's folder. goatcounter's script loads
// async, so a game picked before it's ready counts once it is
function countGame(slug, title) {
  if (inApp()) return
  let count = () => { try { goatcounter.count({ path: "game/" + slug, title, event: true }) } catch {} }
  if (window.goatcounter?.count) count()
  else document.querySelector("script[data-goatcounter]")?.addEventListener("load", count, { once: true })
}
