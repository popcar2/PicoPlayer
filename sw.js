// service worker: keeps every file the site loads so it works offline, and once the site is installed as an app
// (js/offline_pwa.js asks for it) downloads the rest: every page, the player and every cart.
// each file is cached under "<path>?v=<hash>", so an update only refetches the files whose hash changed
// and copies the rest over from the previous cache. the list below is written by "bash scripts/build-offline.sh"

// precache:start
let version = "tinyfun-0fbde662"
let files = {
  "about.html": "9bfd2449",
  "assets/github.svg": "a5101cbd",
  "assets/icon-192.png": "84bd9c2b",
  "assets/icon-512.png": "c2d08021",
  "assets/icon.svg": "83240aa6",
  "assets/loading.svg": "7f0ff003",
  "assets/style.css": "e152a832",
  "assets/thumbnails.css": "75d32dad",
  "assets/thumbnails.webp": "bc1e776e",
  "games/512px-under/512px-under.p8.rom": "e83ab144",
  "games/512px-under/meta.html": "96c56838",
  "games/age-of-ants/age-of-ants.p8.rom": "c6db1ed4",
  "games/age-of-ants/meta.html": "a58e91a3",
  "games/air-delivery/air-delivery.p8.rom": "f09ddc46",
  "games/air-delivery/meta.html": "17406755",
  "games/baba-is-you-demake/baba-is-you-demake.p8.rom": "dab38af2",
  "games/baba-is-you-demake/meta.html": "c295ff7a",
  "games/balloon/balloon.p8.rom": "cbd8401d",
  "games/balloon/meta.html": "521ed632",
  "games/bas/bas.p8.rom": "13305f46",
  "games/bas/meta.html": "2f574a69",
  "games/beam/beam.p8.rom": "d8d42156",
  "games/beam/meta.html": "3bf0a2e7",
  "games/berzerk/berzerk.p8.rom": "76f17d94",
  "games/berzerk/meta.html": "17142d28",
  "games/birds-with-guns/birds-with-guns.p8.rom": "278c07a0",
  "games/birds-with-guns/meta.html": "078a443b",
  "games/blood-of-vladula-jr/blood-of-vladula-jr.p8.rom": "11c03fc0",
  "games/blood-of-vladula-jr/meta.html": "18388aa3",
  "games/build-a-jetpack/build-a-jetpack.p8.rom": "233df840",
  "games/build-a-jetpack/meta.html": "f5d36ca9",
  "games/bun-bun-samurai/bun-bun-samurai.p8.rom": "a1965917",
  "games/bun-bun-samurai/meta.html": "b550325b",
  "games/bunny-survivor/bunny-survivor.p8.rom": "7870eef6",
  "games/bunny-survivor/meta.html": "67b75962",
  "games/bustin/bustin.p8.rom": "36eaf38d",
  "games/bustin/meta.html": "f177df1f",
  "games/cab-ride/cab-ride.p8.rom": "fddb97ac",
  "games/cab-ride/meta.html": "71597b07",
  "games/caped-feline-arena/caped-feline-arena.p8.rom": "3debffb1",
  "games/caped-feline-arena/meta.html": "e77fd5ca",
  "games/cherry-bomb/cherry-bomb.p8.rom": "2bb6f71a",
  "games/cherry-bomb/meta.html": "0fb42662",
  "games/crimson-night/crimson-night.p8.rom": "1c150eb0",
  "games/crimson-night/meta.html": "f662a36e",
  "games/digger/digger.p8.rom": "b6057b14",
  "games/digger/meta.html": "953a4ff7",
  "games/donsol/donsol.p8.rom": "da601325",
  "games/donsol/meta.html": "e1017118",
  "games/dont-dig-up-the-dead/dont-dig-up-the-dead.p8.rom": "b6222561",
  "games/dont-dig-up-the-dead/dontdig_game.p8.rom": "5dd79713",
  "games/dont-dig-up-the-dead/meta.html": "a98babec",
  "games/downward/downward.p8.rom": "1cae7083",
  "games/downward/meta.html": "73008814",
  "games/driftmania/driftmania.p8.rom": "e18dcba3",
  "games/driftmania/meta.html": "2231d765",
  "games/dungeon/dungeon.p8.rom": "dcd2a1f0",
  "games/dungeon/meta.html": "a4f01f2d",
  "games/dust-bunny/dust-bunny.p8.rom": "53e231a7",
  "games/dust-bunny/meta.html": "4fec7586",
  "games/feathered-escape/feathered-escape.p8.rom": "82d8a0f2",
  "games/feathered-escape/meta.html": "523c38c9",
  "games/floodedcaves/floodedcaves.p8.rom": "09161736",
  "games/floodedcaves/meta.html": "86b79454",
  "games/freezing-knights/freezing-knights.p8.rom": "90c90493",
  "games/freezing-knights/freezing_knights_battle1.p8.rom": "6cbbc77b",
  "games/freezing-knights/freezing_knights_battle2.p8.rom": "50952138",
  "games/freezing-knights/freezing_knights_battle3.p8.rom": "96692767",
  "games/freezing-knights/freezing_knights_boss1.p8.rom": "94045aa8",
  "games/freezing-knights/freezing_knights_boss2.p8.rom": "1797158e",
  "games/freezing-knights/freezing_knights_boss3.p8.rom": "4967a451",
  "games/freezing-knights/freezing_knights_boss4.p8.rom": "a4563617",
  "games/freezing-knights/freezing_knights_boss5.p8.rom": "d76d37cb",
  "games/freezing-knights/freezing_knights_boss6.p8.rom": "f99a1628",
  "games/freezing-knights/freezing_knights_boss7.p8.rom": "ef3cce06",
  "games/freezing-knights/freezing_knights_rest.p8.rom": "55cee268",
  "games/freezing-knights/meta.html": "86422720",
  "games/guncho/guncho.p8.rom": "b54f81d6",
  "games/guncho/meta.html": "49d3473f",
  "games/hakai/hakai.p8.rom": "f849eb98",
  "games/hakai/meta.html": "f428ef97",
  "games/happy-larry/happy-larry.p8.rom": "03e75c07",
  "games/happy-larry/meta.html": "3f54a032",
  "games/harolds-bad-day/harolds-bad-day.p8.rom": "78dda767",
  "games/harolds-bad-day/meta.html": "2c779cb8",
  "games/heliopause/heliopause.p8.rom": "30f94eee",
  "games/heliopause/meta.html": "75718be4",
  "games/high-stakes/high-stakes.p8.rom": "9b1bfd2e",
  "games/high-stakes/meta.html": "55bfe1fd",
  "games/holiday-bowling/holiday-bowling.p8.rom": "200388fe",
  "games/holiday-bowling/meta.html": "f4fe8bfc",
  "games/holiday-jumper/holiday-jumper.p8.rom": "239ecd7b",
  "games/holiday-jumper/meta.html": "1773fea1",
  "games/hot-wax/hot-wax.p8.rom": "57800509",
  "games/hot-wax/meta.html": "6fbc6faf",
  "games/into-ruins/into-ruins.p8.rom": "afa93452",
  "games/into-ruins/intoruins.p8.rom": "afa93452",
  "games/into-ruins/intoruins_main-7.p8.rom": "66d19766",
  "games/into-ruins/meta.html": "43cdaa7d",
  "games/lab-cat/lab-cat.p8.rom": "0d3160ea",
  "games/lab-cat/meta.html": "a2dc6516",
  "games/linecraft/linecraft.p8.rom": "9d21d6c3",
  "games/linecraft/linecraft_buttongame.p8.rom": "2a491ba7",
  "games/linecraft/linecraft_compdecomp.p8.rom": "a1ec29ec",
  "games/linecraft/linecraft_devkitgame.p8.rom": "5842c70e",
  "games/linecraft/linecraft_polybuttongame.p8.rom": "ec9950e5",
  "games/linecraft/linecraft_polygame.p8.rom": "97e4d9fd",
  "games/linecraft/meta.html": "8cd86f11",
  "games/little-eidolons/little-eidolons.p8.rom": "d7527049",
  "games/little-eidolons/littleeidolons_data_1.p8.rom": "c3f85dce",
  "games/little-eidolons/meta.html": "2750a46c",
  "games/loop/loop.p8.rom": "14cd567f",
  "games/loop/meta.html": "5a2ef838",
  "games/marble-merger/marble-merger.p8.rom": "6e16b26d",
  "games/marble-merger/meta.html": "bd8472f6",
  "games/motion-rec/meta.html": "244b60df",
  "games/motion-rec/motion-rec.p8.rom": "db8e6737",
  "games/mots-8-ball-pool/meta.html": "9531e269",
  "games/mots-8-ball-pool/mots-8-ball-pool.p8.rom": "8d433138",
  "games/muse/meta.html": "c4403c89",
  "games/muse/muse.p8.rom": "634a225e",
  "games/neath/meta.html": "b61d900c",
  "games/neath/neath.p8.rom": "5cdea9ea",
  "games/nemo-2/meta.html": "3ce54e67",
  "games/nemo-2/nemo-2.p8.rom": "cc20baf3",
  "games/nemo/meta.html": "9107e2d1",
  "games/nemo/nemo.p8.rom": "f56fd6d7",
  "games/nest-2/meta.html": "b94fef3e",
  "games/nest-2/nest-2.p8.rom": "5a7eebba",
  "games/night-ride/meta.html": "ca136c47",
  "games/night-ride/night-ride.p8.rom": "de4a1c9c",
  "games/pakpok/meta.html": "a9c6da03",
  "games/pakpok/pakpok.p8.rom": "2ddc95bb",
  "games/pengo/meta.html": "ad7db046",
  "games/pengo/pengo.p8.rom": "4d61ca15",
  "games/petal-quest/meta.html": "3f339cb8",
  "games/petal-quest/petal-quest.p8.rom": "2bee43fd",
  "games/petal-to-the-metal/meta.html": "97609a0d",
  "games/petal-to-the-metal/petal-to-the-metal.p8.rom": "ec138d18",
  "games/pico-ball/meta.html": "787595d1",
  "games/pico-ball/pico-ball.p8.rom": "2b12384a",
  "games/pico-ball/pico_ball.p8.rom": "2b12384a",
  "games/pico-ball/pico_ball_match.p8.rom": "80787ecd",
  "games/pico-dino/meta.html": "55313cc9",
  "games/pico-dino/pico-dino.p8.rom": "ff1d9e42",
  "games/pico-froggo/meta.html": "e9bd7ba0",
  "games/pico-froggo/pico-froggo.p8.rom": "0236dcee",
  "games/pico-valley/jotpkdemade-3.p8.rom": "76a17039",
  "games/pico-valley/meta.html": "c7c865de",
  "games/pico-valley/pico-valley.p8.rom": "15ea7ab5",
  "games/pico-world-race/meta.html": "1ef88d67",
  "games/pico-world-race/pico-world-race.p8.rom": "e9c0ff76",
  "games/pico-zombie-garden/meta.html": "6f85c4b8",
  "games/pico-zombie-garden/pico-zombie-garden.p8.rom": "61303b37",
  "games/picowings/meta.html": "3d09d0e0",
  "games/picowings/picowings.p8.rom": "bcea69da",
  "games/pigments/meta.html": "a6a80a72",
  "games/pigments/pigments.p8.rom": "5f5c168a",
  "games/pizza-panda/meta.html": "9fd6bf86",
  "games/pizza-panda/pizza-panda.p8.rom": "160770de",
  "games/polder/meta.html": "e0f65ea5",
  "games/polder/polder.p8.rom": "6793a9b4",
  "games/pole-station/meta.html": "78489110",
  "games/pole-station/pole-station.p8.rom": "49693f32",
  "games/pony-9000/meta.html": "df621bee",
  "games/pony-9000/pony-9000.p8.rom": "fd459bb1",
  "games/poom/meta.html": "e25bb871",
  "games/poom/poom.p8.rom": "c8649e51",
  "games/poom/poom_0.p8.rom": "c8649e51",
  "games/poom/poom_1.p8.rom": "ccf3d432",
  "games/poom/poom_e1.p8.rom": "8844a691",
  "games/province/meta.html": "a89286bd",
  "games/province/province.p8.rom": "a01a42a2",
  "games/qbert/meta.html": "b44dc22a",
  "games/qbert/qbert.p8.rom": "28bf9070",
  "games/return-of-the-slimepires/meta.html": "e4feeed8",
  "games/return-of-the-slimepires/return-of-the-slimepires.p8.rom": "a8221136",
  "games/ruby-eyes/meta.html": "9b160349",
  "games/ruby-eyes/ruby-eyes.p8.rom": "50f6d359",
  "games/samurise/meta.html": "1cea07de",
  "games/samurise/samurise.p8.rom": "e3d5d46e",
  "games/samurise/samurise_level.p8.rom": "c281cf49",
  "games/shooting-star/meta.html": "ef69c209",
  "games/shooting-star/shooting-star.p8.rom": "d25d5497",
  "games/sneaky-stealy/meta.html": "ef349432",
  "games/sneaky-stealy/sneaky-stealy.p8.rom": "492a083e",
  "games/snekburd/meta.html": "3ecd420d",
  "games/snekburd/snekburd.p8.rom": "91352d8a",
  "games/snekburd/snekburd_2.p8.rom": "1390fa9c",
  "games/snekburd/snekburd_3.p8.rom": "1d97a52c",
  "games/snekburd/snekburd_4.p8.rom": "f05265e9",
  "games/snekburd/snekburd_5.p8.rom": "42a12c4e",
  "games/snekburd/snekburd_6.p8.rom": "26c6b513",
  "games/snekburd/snekburd_7.p8.rom": "30be73b3",
  "games/snekburd/snekburd_c.p8.rom": "1c789e53",
  "games/snekburd/snekburd_extra.p8.rom": "5dc944a9",
  "games/sokoblox/meta.html": "05f05c62",
  "games/sokoblox/sokoblox.p8.rom": "2b3b9fa2",
  "games/sphero/meta.html": "e7fe580a",
  "games/sphero/sphero.p8.rom": "1159b62c",
  "games/sphongos/meta.html": "6276bcb9",
  "games/sphongos/sphongos.p8.rom": "001eb4fd",
  "games/star-patrol/meta.html": "70d2720d",
  "games/star-patrol/star-patrol.p8.rom": "a839f21e",
  "games/subsurface/meta.html": "3e05cb17",
  "games/subsurface/subsurface.p8.rom": "1b83823a",
  "games/suika/meta.html": "9762cf0a",
  "games/suika/suika.p8.rom": "d7dab3c9",
  "games/super-disc-box/meta.html": "a610e25d",
  "games/super-disc-box/super-disc-box.p8.rom": "6c7fce8c",
  "games/super-world-of-goo/meta.html": "4222cb90",
  "games/super-world-of-goo/super-world-of-goo.p8.rom": "8ed488d0",
  "games/tad/meta.html": "7dfcf754",
  "games/tad/tad.p8.rom": "d403a97c",
  "games/terra-nova-pinball/meta.html": "de065d91",
  "games/terra-nova-pinball/terra-nova-pinball.p8.rom": "5dd389f3",
  "games/terra/meta.html": "a93479fb",
  "games/terra/terra.p8.rom": "d0fffcb2",
  "games/terra/terra_1cart.p8.rom": "d0fffcb2",
  "games/terra/terra_char_edit.p8.rom": "7e28dce0",
  "games/the-lost-night/meta.html": "af661c20",
  "games/the-lost-night/the-lost-night.p8.rom": "d2eed2d2",
  "games/time-for-lunch/meta.html": "160117a9",
  "games/time-for-lunch/time-for-lunch.p8.rom": "e233c9e9",
  "games/tiny-hawk/meta.html": "1584c5e9",
  "games/tiny-hawk/tiny-hawk.p8.rom": "ad8bfdc0",
  "games/to-a-starling/meta.html": "e275f4f6",
  "games/to-a-starling/to-a-starling.p8.rom": "06ccbc07",
  "games/trichromat/meta.html": "922469f1",
  "games/trichromat/trichromat.p8.rom": "7803794a",
  "games/tutankham/meta.html": "8744be0b",
  "games/tutankham/tutankham.p8.rom": "adb38a4b",
  "games/undune-2/meta.html": "2eaff830",
  "games/undune-2/undune-2.p8.rom": "e719a260",
  "games/undune-2/undune2.p8.rom": "e719a260",
  "games/undune-2/undune2_credits.p8.rom": "c76db95c",
  "games/undune-2/undune2_map1.p8.rom": "5f74612e",
  "games/undune-2/undune2_map2.p8.rom": "8b7ceb6d",
  "games/undune-2/undune2_map3.p8.rom": "0857f3df",
  "games/undune-2/undune2_map4.p8.rom": "4fd9cfe0",
  "games/undune-2/undune2_map5.p8.rom": "5f71d141",
  "games/undune-2/undune2_map6.p8.rom": "6541d3af",
  "games/undune-2/undune2_map7.p8.rom": "eff4c0a1",
  "games/undune-2/undune2_map8.p8.rom": "a6c814dc",
  "games/undune-2/undune2_map9.p8.rom": "dcaddc95",
  "games/up-and-away/meta.html": "eb9bbe29",
  "games/up-and-away/up-and-away.p8.rom": "ce878672",
  "games/vacay-volley/meta.html": "acf48056",
  "games/vacay-volley/vacay-volley.p8.rom": "11ee4ce5",
  "games/walker/meta.html": "dfc237bc",
  "games/walker/walker.p8.rom": "32ae1f49",
  "games/whiplash-taxi/meta.html": "b67ea74c",
  "games/whiplash-taxi/whiplash-taxi.p8.rom": "337d85f2",
  "games/willo/meta.html": "aef07cef",
  "games/willo/willo.p8.rom": "7b2fd19f",
  "games/willthemangetfrog/meta.html": "881aad48",
  "games/willthemangetfrog/willthemangetfrog.p8.rom": "0e8dd43a",
  "games/willthemangetfrog/willthemangetfrog_fr.p8.rom": "dda2c260",
  "games/zip-zapper/meta.html": "2d368939",
  "games/zip-zapper/zip-zapper.p8.rom": "77608b49",
  "games/zoo-keeper/meta.html": "786e0a4d",
  "games/zoo-keeper/zoo-keeper.p8.rom": "77d214da",
  "index.html": "6e7f26f1",
  "js/fixi.js": "f513737c",
  "js/offline_pwa.js": "6a74254f",
  "js/transitions.js": "f810f4a0",
  "manifest.webmanifest": "0e94d18d",
  "pico8/pico8.js": "c81bddbc",
  "pico8/player.html": "4a6d10a9",
  "play.html": "148a6238",
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
