// service worker: keeps every file the site loads so it works offline, and once the site is installed as an app
// (js/offline_pwa.js asks for it) downloads the rest: every page, the player and every cart.
// each file is cached under "<path>?v=<hash>", so an update only refetches the files whose hash changed
// and copies the rest over from the previous cache. the list below is written by "bash scripts/build-offline.sh"

// precache:start
let version = "tinyfun-bf02c9b1"
let files = {
  "about.html": "4828a836",
  "assets/github.svg": "a5101cbd",
  "assets/icon-192.png": "84bd9c2b",
  "assets/icon-512.png": "c2d08021",
  "assets/icon.svg": "83240aa6",
  "assets/loading.svg": "7f0ff003",
  "assets/style.css": "8fb2179f",
  "assets/thumbnails.css": "75d32dad",
  "assets/thumbnails.webp": "bc1e776e",
  "games/512px-under/512px-under.p8.rom": "990df63b",
  "games/512px-under/meta.html": "96c56838",
  "games/age-of-ants/age-of-ants.p8.rom": "cd3d66b4",
  "games/age-of-ants/meta.html": "a58e91a3",
  "games/air-delivery/air-delivery.p8.rom": "aed407ff",
  "games/air-delivery/meta.html": "17406755",
  "games/baba-is-you-demake/baba-is-you-demake.p8.rom": "689422a8",
  "games/baba-is-you-demake/meta.html": "c295ff7a",
  "games/balloon/balloon.p8.rom": "fe1a995a",
  "games/balloon/meta.html": "521ed632",
  "games/bas/bas.p8.rom": "e4ef235d",
  "games/bas/meta.html": "2f574a69",
  "games/beam/beam.p8.rom": "e4f8f953",
  "games/beam/meta.html": "3bf0a2e7",
  "games/berzerk/berzerk.p8.rom": "012aa5ed",
  "games/berzerk/meta.html": "17142d28",
  "games/birds-with-guns/birds-with-guns.p8.rom": "c5b20553",
  "games/birds-with-guns/meta.html": "078a443b",
  "games/blood-of-vladula-jr/blood-of-vladula-jr.p8.rom": "37b95e3f",
  "games/blood-of-vladula-jr/meta.html": "18388aa3",
  "games/build-a-jetpack/build-a-jetpack.p8.rom": "b3518331",
  "games/build-a-jetpack/meta.html": "f5d36ca9",
  "games/bun-bun-samurai/bun-bun-samurai.p8.rom": "4b63de91",
  "games/bun-bun-samurai/meta.html": "b550325b",
  "games/bunny-survivor/bunny-survivor.p8.rom": "12f08a67",
  "games/bunny-survivor/meta.html": "67b75962",
  "games/bustin/bustin.p8.rom": "560af917",
  "games/bustin/meta.html": "f177df1f",
  "games/cab-ride/cab-ride.p8.rom": "76e0e492",
  "games/cab-ride/meta.html": "71597b07",
  "games/caped-feline-arena/caped-feline-arena.p8.rom": "ed741f76",
  "games/caped-feline-arena/meta.html": "e77fd5ca",
  "games/cherry-bomb/cherry-bomb.p8.rom": "9420ec06",
  "games/cherry-bomb/meta.html": "0fb42662",
  "games/crimson-night/crimson-night.p8.rom": "6ec1d583",
  "games/crimson-night/meta.html": "f662a36e",
  "games/digger/digger.p8.rom": "11556e78",
  "games/digger/meta.html": "953a4ff7",
  "games/donsol/donsol.p8.rom": "f25cacb7",
  "games/donsol/meta.html": "e1017118",
  "games/dont-dig-up-the-dead/dont-dig-up-the-dead.p8.rom": "f07bc3ea",
  "games/dont-dig-up-the-dead/dontdig_game.p8.rom": "5b72988d",
  "games/dont-dig-up-the-dead/meta.html": "a98babec",
  "games/downward/downward.p8.rom": "6fcfbe74",
  "games/downward/meta.html": "73008814",
  "games/driftmania/driftmania.p8.rom": "73e1ef12",
  "games/driftmania/meta.html": "2231d765",
  "games/dungeon/dungeon.p8.rom": "d05ea9c2",
  "games/dungeon/meta.html": "a4f01f2d",
  "games/dust-bunny/dust-bunny.p8.rom": "78640991",
  "games/dust-bunny/meta.html": "4fec7586",
  "games/feathered-escape/feathered-escape.p8.rom": "578f0061",
  "games/feathered-escape/meta.html": "523c38c9",
  "games/floodedcaves/floodedcaves.p8.rom": "f6f6d61f",
  "games/floodedcaves/meta.html": "86b79454",
  "games/freezing-knights/freezing-knights.p8.rom": "064bea1f",
  "games/freezing-knights/freezing_knights_battle1.p8.rom": "cfb360ae",
  "games/freezing-knights/freezing_knights_battle2.p8.rom": "da660eb6",
  "games/freezing-knights/freezing_knights_battle3.p8.rom": "3e7e28a8",
  "games/freezing-knights/freezing_knights_boss1.p8.rom": "4fa83491",
  "games/freezing-knights/freezing_knights_boss2.p8.rom": "f629762a",
  "games/freezing-knights/freezing_knights_boss3.p8.rom": "26d81dd7",
  "games/freezing-knights/freezing_knights_boss4.p8.rom": "f48d0ddf",
  "games/freezing-knights/freezing_knights_boss5.p8.rom": "ea39d1c5",
  "games/freezing-knights/freezing_knights_boss6.p8.rom": "a6303041",
  "games/freezing-knights/freezing_knights_boss7.p8.rom": "5524b009",
  "games/freezing-knights/freezing_knights_rest.p8.rom": "6df72a40",
  "games/freezing-knights/meta.html": "86422720",
  "games/guncho/guncho.p8.rom": "9b560992",
  "games/guncho/meta.html": "49d3473f",
  "games/hakai/hakai.p8.rom": "24ab51fe",
  "games/hakai/meta.html": "f428ef97",
  "games/happy-larry/happy-larry.p8.rom": "c4ca28fb",
  "games/happy-larry/meta.html": "3f54a032",
  "games/harolds-bad-day/harolds-bad-day.p8.rom": "64e3431e",
  "games/harolds-bad-day/meta.html": "2c779cb8",
  "games/heliopause/heliopause.p8.rom": "907fcdc9",
  "games/heliopause/meta.html": "75718be4",
  "games/high-stakes/high-stakes.p8.rom": "ddc65652",
  "games/high-stakes/meta.html": "55bfe1fd",
  "games/holiday-bowling/holiday-bowling.p8.rom": "6900a2a5",
  "games/holiday-bowling/meta.html": "f4fe8bfc",
  "games/holiday-jumper/holiday-jumper.p8.rom": "a12351fa",
  "games/holiday-jumper/meta.html": "1773fea1",
  "games/hot-wax/hot-wax.p8.rom": "e101d4de",
  "games/hot-wax/meta.html": "6fbc6faf",
  "games/into-ruins/into-ruins.p8.rom": "77e8a36c",
  "games/into-ruins/intoruins.p8.rom": "77e8a36c",
  "games/into-ruins/intoruins_main-7.p8.rom": "6def639c",
  "games/into-ruins/meta.html": "43cdaa7d",
  "games/lab-cat/lab-cat.p8.rom": "1f8f9227",
  "games/lab-cat/meta.html": "a2dc6516",
  "games/linecraft/linecraft.p8.rom": "4e02f0b0",
  "games/linecraft/linecraft_buttongame.p8.rom": "2a3ca816",
  "games/linecraft/linecraft_compdecomp.p8.rom": "7772f4e6",
  "games/linecraft/linecraft_devkitgame.p8.rom": "3f9c1b8f",
  "games/linecraft/linecraft_polybuttongame.p8.rom": "f4792fc1",
  "games/linecraft/linecraft_polygame.p8.rom": "5920b21e",
  "games/linecraft/meta.html": "8cd86f11",
  "games/little-eidolons/little-eidolons.p8.rom": "0b29c2c4",
  "games/little-eidolons/littleeidolons_data_1.p8.rom": "71de689b",
  "games/little-eidolons/meta.html": "2750a46c",
  "games/loop/loop.p8.rom": "362893d8",
  "games/loop/meta.html": "5a2ef838",
  "games/marble-merger/marble-merger.p8.rom": "7e6b5ec2",
  "games/marble-merger/meta.html": "bd8472f6",
  "games/motion-rec/meta.html": "244b60df",
  "games/motion-rec/motion-rec.p8.rom": "982a5459",
  "games/mots-8-ball-pool/meta.html": "9531e269",
  "games/mots-8-ball-pool/mots-8-ball-pool.p8.rom": "e63e6d1f",
  "games/muse/meta.html": "c4403c89",
  "games/muse/muse.p8.rom": "ac9b6e1b",
  "games/neath/meta.html": "b61d900c",
  "games/neath/neath.p8.rom": "2910b78c",
  "games/nemo-2/meta.html": "3ce54e67",
  "games/nemo-2/nemo-2.p8.rom": "fba7c0e7",
  "games/nemo/meta.html": "9107e2d1",
  "games/nemo/nemo.p8.rom": "e62481c8",
  "games/nest-2/meta.html": "b94fef3e",
  "games/nest-2/nest-2.p8.rom": "c799d356",
  "games/night-ride/meta.html": "ca136c47",
  "games/night-ride/night-ride.p8.rom": "31abb247",
  "games/pakpok/meta.html": "a9c6da03",
  "games/pakpok/pakpok.p8.rom": "2108d6d4",
  "games/pengo/meta.html": "ad7db046",
  "games/pengo/pengo.p8.rom": "d47c53b7",
  "games/petal-quest/meta.html": "3f339cb8",
  "games/petal-quest/petal-quest.p8.rom": "7d979694",
  "games/petal-to-the-metal/meta.html": "97609a0d",
  "games/petal-to-the-metal/petal-to-the-metal.p8.rom": "7b3a1c09",
  "games/pico-ball/meta.html": "787595d1",
  "games/pico-ball/pico-ball.p8.rom": "1f262d0b",
  "games/pico-ball/pico_ball.p8.rom": "1f262d0b",
  "games/pico-ball/pico_ball_match.p8.rom": "b8a2ec55",
  "games/pico-dino/meta.html": "55313cc9",
  "games/pico-dino/pico-dino.p8.rom": "b9532acf",
  "games/pico-froggo/meta.html": "e9bd7ba0",
  "games/pico-froggo/pico-froggo.p8.rom": "0c7eb96a",
  "games/pico-valley/jotpkdemade-3.p8.rom": "b0863c36",
  "games/pico-valley/meta.html": "c7c865de",
  "games/pico-valley/pico-valley.p8.rom": "cff7c0be",
  "games/pico-world-race/meta.html": "1ef88d67",
  "games/pico-world-race/pico-world-race.p8.rom": "0ae14f96",
  "games/pico-zombie-garden/meta.html": "6f85c4b8",
  "games/pico-zombie-garden/pico-zombie-garden.p8.rom": "228844f0",
  "games/picowings/meta.html": "3d09d0e0",
  "games/picowings/picowings.p8.rom": "73375f50",
  "games/pigments/meta.html": "a6a80a72",
  "games/pigments/pigments.p8.rom": "0f05dabf",
  "games/pizza-panda/meta.html": "9fd6bf86",
  "games/pizza-panda/pizza-panda.p8.rom": "7e898fd2",
  "games/polder/meta.html": "e0f65ea5",
  "games/polder/polder.p8.rom": "2598b919",
  "games/pole-station/meta.html": "78489110",
  "games/pole-station/pole-station.p8.rom": "9856d055",
  "games/pony-9000/meta.html": "df621bee",
  "games/pony-9000/pony-9000.p8.rom": "20f20865",
  "games/poom/meta.html": "e25bb871",
  "games/poom/poom.p8.rom": "9d9e4e11",
  "games/poom/poom_0.p8.rom": "9d9e4e11",
  "games/poom/poom_1.p8.rom": "ba99fdf9",
  "games/poom/poom_e1.p8.rom": "b1f9b7bd",
  "games/province/meta.html": "a89286bd",
  "games/province/province.p8.rom": "ce35464f",
  "games/qbert/meta.html": "b44dc22a",
  "games/qbert/qbert.p8.rom": "df78f3b2",
  "games/return-of-the-slimepires/meta.html": "e4feeed8",
  "games/return-of-the-slimepires/return-of-the-slimepires.p8.rom": "3b83cd05",
  "games/ruby-eyes/meta.html": "9b160349",
  "games/ruby-eyes/ruby-eyes.p8.rom": "93468003",
  "games/samurise/meta.html": "1cea07de",
  "games/samurise/samurise.p8.rom": "9f7811ef",
  "games/samurise/samurise_level.p8.rom": "68c3eaa9",
  "games/shooting-star/meta.html": "ef69c209",
  "games/shooting-star/shooting-star.p8.rom": "c2dfbd39",
  "games/sneaky-stealy/meta.html": "ef349432",
  "games/sneaky-stealy/sneaky-stealy.p8.rom": "5817d02e",
  "games/snekburd/meta.html": "3ecd420d",
  "games/snekburd/snekburd.p8.rom": "83af8570",
  "games/snekburd/snekburd_2.p8.rom": "74b22b98",
  "games/snekburd/snekburd_3.p8.rom": "20fe6111",
  "games/snekburd/snekburd_4.p8.rom": "26f941d8",
  "games/snekburd/snekburd_5.p8.rom": "36033a12",
  "games/snekburd/snekburd_6.p8.rom": "f1b667ca",
  "games/snekburd/snekburd_7.p8.rom": "11030a7c",
  "games/snekburd/snekburd_c.p8.rom": "6757e14b",
  "games/snekburd/snekburd_extra.p8.rom": "e6c543de",
  "games/sokoblox/meta.html": "05f05c62",
  "games/sokoblox/sokoblox.p8.rom": "3eb78614",
  "games/sphero/meta.html": "e7fe580a",
  "games/sphero/sphero.p8.rom": "037e2cd4",
  "games/sphongos/meta.html": "6276bcb9",
  "games/sphongos/sphongos.p8.rom": "ceb3de9d",
  "games/star-patrol/meta.html": "70d2720d",
  "games/star-patrol/star-patrol.p8.rom": "b514bab4",
  "games/subsurface/meta.html": "3e05cb17",
  "games/subsurface/subsurface.p8.rom": "a96328e5",
  "games/suika/meta.html": "9762cf0a",
  "games/suika/suika.p8.rom": "77e6cfdc",
  "games/super-disc-box/meta.html": "a610e25d",
  "games/super-disc-box/super-disc-box.p8.rom": "dffbed1f",
  "games/super-world-of-goo/meta.html": "4222cb90",
  "games/super-world-of-goo/super-world-of-goo.p8.rom": "5a64ba47",
  "games/tad/meta.html": "7dfcf754",
  "games/tad/tad.p8.rom": "55235203",
  "games/terra-nova-pinball/meta.html": "de065d91",
  "games/terra-nova-pinball/terra-nova-pinball.p8.rom": "e3c0ef21",
  "games/terra/meta.html": "a93479fb",
  "games/terra/terra.p8.rom": "4ccf10c5",
  "games/terra/terra_1cart.p8.rom": "4ccf10c5",
  "games/terra/terra_char_edit.p8.rom": "38113f19",
  "games/the-lost-night/meta.html": "af661c20",
  "games/the-lost-night/the-lost-night.p8.rom": "17c6c956",
  "games/time-for-lunch/meta.html": "160117a9",
  "games/time-for-lunch/time-for-lunch.p8.rom": "aaa73d5e",
  "games/tiny-hawk/meta.html": "1584c5e9",
  "games/tiny-hawk/tiny-hawk.p8.rom": "957f013d",
  "games/to-a-starling/meta.html": "e275f4f6",
  "games/to-a-starling/to-a-starling.p8.rom": "1469196c",
  "games/trichromat/meta.html": "922469f1",
  "games/trichromat/trichromat.p8.rom": "28063b4e",
  "games/tutankham/meta.html": "8744be0b",
  "games/tutankham/tutankham.p8.rom": "3c8e7c58",
  "games/undune-2/meta.html": "2eaff830",
  "games/undune-2/undune-2.p8.rom": "a1dd68bd",
  "games/undune-2/undune2.p8.rom": "a1dd68bd",
  "games/undune-2/undune2_credits.p8.rom": "52577aef",
  "games/undune-2/undune2_map1.p8.rom": "5bef4541",
  "games/undune-2/undune2_map2.p8.rom": "e3099ca0",
  "games/undune-2/undune2_map3.p8.rom": "63ab6ca8",
  "games/undune-2/undune2_map4.p8.rom": "55c8c93a",
  "games/undune-2/undune2_map5.p8.rom": "dee187a6",
  "games/undune-2/undune2_map6.p8.rom": "cfc69a72",
  "games/undune-2/undune2_map7.p8.rom": "58856811",
  "games/undune-2/undune2_map8.p8.rom": "0619cefd",
  "games/undune-2/undune2_map9.p8.rom": "a594255d",
  "games/up-and-away/meta.html": "eb9bbe29",
  "games/up-and-away/up-and-away.p8.rom": "71e5d959",
  "games/vacay-volley/meta.html": "acf48056",
  "games/vacay-volley/vacay-volley.p8.rom": "c2c120db",
  "games/walker/meta.html": "dfc237bc",
  "games/walker/walker.p8.rom": "272299d5",
  "games/whiplash-taxi/meta.html": "b67ea74c",
  "games/whiplash-taxi/whiplash-taxi.p8.rom": "2c9c3bda",
  "games/willo/meta.html": "aef07cef",
  "games/willo/willo.p8.rom": "57375fe7",
  "games/willthemangetfrog/meta.html": "881aad48",
  "games/willthemangetfrog/willthemangetfrog.p8.rom": "c4fed432",
  "games/willthemangetfrog/willthemangetfrog_fr.p8.rom": "9d8378a2",
  "games/zip-zapper/meta.html": "2d368939",
  "games/zip-zapper/zip-zapper.p8.rom": "dfb1e851",
  "games/zoo-keeper/meta.html": "786e0a4d",
  "games/zoo-keeper/zoo-keeper.p8.rom": "ec0d7e6e",
  "index.html": "e9dcf9ed",
  "js/fixi.js": "f513737c",
  "js/offline_pwa.js": "6a74254f",
  "js/transitions.js": "ff113666",
  "manifest.webmanifest": "2ab6d2a3",
  "pico8/pico8.js": "c81bddbc",
  "pico8/player.html": "4a6d10a9",
  "play.html": "148a6238",
  "technical_deets.html": "8132de99",
}
// precache:end

let scope = new URL(registration.scope)

// the cache key for a site path: its URL with the file's hash as the query
let keyFor = (path) => new URL(path + "?v=" + files[path], scope).href

// the site path a request is for, or nothing if it isn't one of the listed files. queries are dropped
// (player.html?cart=, the thumbnails' cache-buster), the root means index.html, and a page
// linked without its extension (/play, as GitHub Pages serves it) means its .html file
function pathFor(url) {
  url = new URL(url)
  if (url.origin != scope.origin || !url.pathname.startsWith(scope.pathname)) return
  let path = decodeURIComponent(url.pathname.slice(scope.pathname.length)) || "index.html"
  if (files[path]) return path
  if (files[path + ".html"]) return path + ".html"
}

// fetch a listed file into this version's cache, unless it's already there
async function store(cache, path) {
  if (await cache.match(keyFor(path))) return
  let response = await fetch(new URL(path, scope), { cache: "reload" })
  if (!response.ok) throw new Error(`couldn't cache ${path}: ${response.status}`)
  await cache.put(keyFor(path), response)
}

// carry over what the previous version had: unchanged files are copied, changed ones refetched,
// so an installed app stays complete and a visitor's copy doesn't grow
self.addEventListener("install", (e) => e.waitUntil((async () => {
  let cache = await caches.open(version)
  let old = (await caches.keys()).filter((name) => name != version)
  await Promise.all(Object.keys(files).map(async (path) => {
    for (let name of old) {
      let previous = await caches.open(name)
      let same = await previous.match(keyFor(path))
      if (same) return cache.put(keyFor(path), same)
      if (await previous.match(new URL(path, scope), { ignoreSearch: true })) return store(cache, path).catch(() => {})
    }
  }))
  self.skipWaiting()
})()))

// drop the previous version's cache once this one has taken over
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (let name of await caches.keys()) if (name != version) await caches.delete(name)
  await self.clients.claim()
})()))

// the installed app asks for everything
self.addEventListener("message", (e) => {
  if (e.data == "download-all") e.waitUntil(caches.open(version).then((cache) =>
    Promise.all(Object.keys(files).map((path) => store(cache, path).catch(() => {})))))
})

// listed files come from the cache, or the network (and are kept) the first time. anything else of ours
// (e.g. a game added without rerunning the script) goes to the network first, and is kept for offline use
self.addEventListener("fetch", (e) => {
  if (e.request.method != "GET") return
  let url = new URL(e.request.url)
  if (url.origin != scope.origin) return
  let path = pathFor(url)
  e.respondWith((async () => {
    let cache = await caches.open(version)
    if (path) {
      let cached = await cache.match(keyFor(path))
      if (cached) return cached
      let response = await fetch(new URL(path, scope))  // the file itself, so /play works even where the server doesn't add .html
      if (response.ok) cache.put(keyFor(path), response.clone())
      return response
    }
    try {
      let response = await fetch(e.request)
      if (response.ok) cache.put(e.request, response.clone())
      return response
    } catch (error) {
      return await cache.match(e.request, { ignoreSearch: e.request.mode == "navigate" }) || Promise.reject(error)
    }
  })())
})
