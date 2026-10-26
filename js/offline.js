// registers sw.js, which keeps whatever the site loads for offline use. once the site is installed as an app,
// it's asked to download every game too: right after installing, and on each launch (which also covers iOS's
// Add to Home Screen, which fires no event, and fills in anything new after an update)
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("sw.js")
  let downloadAll = () => navigator.serviceWorker.ready.then((registration) => registration.active.postMessage("download-all"))
  if (matchMedia("(display-mode: standalone), (display-mode: fullscreen), (display-mode: minimal-ui)").matches || navigator.standalone) downloadAll()
  addEventListener("appinstalled", downloadAll)
}
