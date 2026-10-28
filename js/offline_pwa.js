// only for the site installed as an app: registers sw.js, which keeps whatever the site loads for offline use, and
// asks it to download every game too: right after installing, and on each launch (which also covers iOS's
// Add to Home Screen, which fires no event, and fills in anything new after an update)
if (navigator.serviceWorker) {
  let downloadAll = () => navigator.serviceWorker.register("sw.js")
    .then(() => navigator.serviceWorker.ready)
    .then((registration) => registration.active.postMessage("download-all"))
  if (matchMedia("(display-mode: standalone), (display-mode: fullscreen), (display-mode: minimal-ui)").matches || navigator.standalone) downloadAll()
  addEventListener("appinstalled", downloadAll)
}

// pages come from sw.js's cache, so after a deploy this page is the old version. the browser checks sw.js on every load
// though, and once the new one has installed and taken over, reload to show the new version. not while a game is
// running (it shows on the next load instead), and not on a first visit, when sw.js takes over a page that's already new
if (navigator.serviceWorker?.controller) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!document.querySelector("#player")) location.reload()
  })
}
