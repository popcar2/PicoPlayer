// service worker: keeps every file the site loads so it works offline, and once the site is installed as an app
// (js/offline_pwa.js asks for it) downloads the rest: every page, the player and every cart.
// each file is cached under "<path>?v=<hash>", so an update only refetches the files whose hash changed
// and copies the rest over from the previous cache. the list below is written by "bash scripts/build-offline.sh"

// precache:start
let version = "tinyfun-eec95204"
let files = {
  "about.html": "95914e5a",
  "assets/github.svg": "a5101cbd",
  "assets/icon-192.png": "84bd9c2b",
  "assets/icon-512.png": "c2d08021",
  "assets/icon.svg": "83240aa6",
  "assets/loading.svg": "7f0ff003",
  "assets/style.css": "34ead2de",
  "assets/thumbnails.css": "b41127d5",
  "assets/thumbnails.png": "ef6896b0",
  "games/512px-under/512px-under.p8.png": "c1f2da24",
  "games/512px-under/meta.html": "95a8125d",
  "games/age-of-ants/age-of-ants.p8.png": "100905a7",
  "games/age-of-ants/meta.html": "59adad66",
  "games/air-delivery/air-delivery.p8.png": "2224f757",
  "games/air-delivery/meta.html": "fb952a46",
  "games/baba-is-you-demake/baba-is-you-demake.p8.png": "4e8e8b7b",
  "games/baba-is-you-demake/meta.html": "87751366",
  "games/balloon/balloon.p8.png": "f22e38fd",
  "games/balloon/meta.html": "98d33af6",
  "games/bas/bas.p8.png": "e8eedc68",
  "games/bas/meta.html": "dff62970",
  "games/beam/beam.p8.png": "cdceb9cf",
  "games/beam/meta.html": "4ef5b399",
  "games/berzerk/berzerk.p8.png": "c177f9e6",
  "games/berzerk/meta.html": "1298cac1",
  "games/birds-with-guns/birds-with-guns.p8.png": "305aad16",
  "games/birds-with-guns/meta.html": "86fa19c8",
  "games/blood-of-vladula-jr/blood-of-vladula-jr.p8.png": "1babb224",
  "games/blood-of-vladula-jr/meta.html": "3d14684e",
  "games/build-a-jetpack/build-a-jetpack.p8.png": "586ae626",
  "games/build-a-jetpack/meta.html": "0a83d76a",
  "games/bun-bun-samurai/bun-bun-samurai.p8.png": "b67f94c7",
  "games/bun-bun-samurai/meta.html": "913b6ac0",
  "games/bunny-survivor/bunny-survivor.p8.png": "fec53da4",
  "games/bunny-survivor/meta.html": "0f095478",
  "games/bustin/bustin.p8.png": "f9bc302d",
  "games/bustin/meta.html": "3acba898",
  "games/cab-ride/cab-ride.p8.png": "b4c9de86",
  "games/cab-ride/meta.html": "817d0abc",
  "games/caped-feline-arena/caped-feline-arena.p8.png": "1de0d1e5",
  "games/caped-feline-arena/meta.html": "3f03f93e",
  "games/cherry-bomb/cherry-bomb.p8.png": "1d4080e8",
  "games/cherry-bomb/meta.html": "b831847a",
  "games/crimson-night/crimson-night.p8.png": "11f1b039",
  "games/crimson-night/meta.html": "4312ba23",
  "games/digger/digger.p8.png": "58d7c36b",
  "games/digger/meta.html": "5e016bb8",
  "games/donsol/donsol.p8.png": "de9eb311",
  "games/donsol/meta.html": "12b539c4",
  "games/dont-dig-up-the-dead/dont-dig-up-the-dead.p8.png": "14a24ed5",
  "games/dont-dig-up-the-dead/dontdig_game.p8.png": "880b538c",
  "games/dont-dig-up-the-dead/meta.html": "8b7d59eb",
  "games/downward/downward.p8.png": "b5116a79",
  "games/downward/meta.html": "7bbf9f65",
  "games/driftmania/driftmania.p8.png": "7730979c",
  "games/driftmania/meta.html": "2570a5a0",
  "games/dungeon/dungeon.p8.png": "a59f584d",
  "games/dungeon/meta.html": "e3dd87ed",
  "games/dust-bunny/dust-bunny.p8.png": "8f38b2a7",
  "games/dust-bunny/meta.html": "610c355c",
  "games/feathered-escape/feathered-escape.p8.png": "4f1997db",
  "games/feathered-escape/meta.html": "5076b2b9",
  "games/floodedcaves/floodedcaves.p8.png": "6edefab8",
  "games/floodedcaves/meta.html": "148f0640",
  "games/freezing-knights/freezing-knights.p8.png": "3efab2aa",
  "games/freezing-knights/freezing_knights_battle1.p8.png": "5c1410be",
  "games/freezing-knights/freezing_knights_battle2.p8.png": "a03bf948",
  "games/freezing-knights/freezing_knights_battle3.p8.png": "0d8ebf60",
  "games/freezing-knights/freezing_knights_boss1.p8.png": "91123100",
  "games/freezing-knights/freezing_knights_boss2.p8.png": "4c02bf5d",
  "games/freezing-knights/freezing_knights_boss3.p8.png": "43936379",
  "games/freezing-knights/freezing_knights_boss4.p8.png": "50cc7319",
  "games/freezing-knights/freezing_knights_boss5.p8.png": "aa3b62c5",
  "games/freezing-knights/freezing_knights_boss6.p8.png": "1e7fcded",
  "games/freezing-knights/freezing_knights_boss7.p8.png": "2f958b9a",
  "games/freezing-knights/freezing_knights_rest.p8.png": "362af07d",
  "games/freezing-knights/meta.html": "57443b41",
  "games/guncho/guncho.p8.png": "485672c1",
  "games/guncho/meta.html": "6b838649",
  "games/hakai/hakai.p8.png": "4e0fe362",
  "games/hakai/meta.html": "4484e3b2",
  "games/happy-larry/happy-larry.p8.png": "890d51d1",
  "games/happy-larry/meta.html": "36377321",
  "games/harolds-bad-day/harolds-bad-day.p8.png": "e05b60d8",
  "games/harolds-bad-day/meta.html": "d47c8e54",
  "games/heliopause/heliopause.p8.png": "8f0ecd80",
  "games/heliopause/meta.html": "9be03b79",
  "games/high-stakes/high-stakes.p8.png": "eb0223c5",
  "games/high-stakes/meta.html": "7e3d33bb",
  "games/holiday-bowling/holiday-bowling.p8.png": "4c387c00",
  "games/holiday-bowling/meta.html": "87c43380",
  "games/holiday-jumper/holiday-jumper.p8.png": "b26df532",
  "games/holiday-jumper/meta.html": "dece45e4",
  "games/hot-wax/hot-wax.p8.png": "ddee85eb",
  "games/hot-wax/meta.html": "de4418c8",
  "games/into-ruins/into-ruins.p8.png": "e220a668",
  "games/into-ruins/intoruins.p8.png": "e220a668",
  "games/into-ruins/intoruins_main-7.p8.png": "cfdfb330",
  "games/into-ruins/meta.html": "037920a4",
  "games/lab-cat/lab-cat.p8.png": "a41d6599",
  "games/lab-cat/meta.html": "dbb5a4ff",
  "games/linecraft/linecraft.p8.png": "771c081e",
  "games/linecraft/linecraft_buttongame.p8.png": "312a8908",
  "games/linecraft/linecraft_compdecomp.p8.png": "741a9202",
  "games/linecraft/linecraft_devkitgame.p8.png": "af760606",
  "games/linecraft/linecraft_polybuttongame.p8.png": "e6827c3c",
  "games/linecraft/linecraft_polygame.p8.png": "b94199e6",
  "games/linecraft/meta.html": "f8724812",
  "games/little-eidolons/little-eidolons.p8.png": "3230a175",
  "games/little-eidolons/littleeidolons_data_1.p8.png": "556a86d1",
  "games/little-eidolons/meta.html": "9f886e8f",
  "games/loop/loop.p8.png": "95e657f8",
  "games/loop/meta.html": "2ff9cd94",
  "games/marble-merger/marble-merger.p8.png": "69ec1ea5",
  "games/marble-merger/meta.html": "08a97770",
  "games/motion-rec/meta.html": "e73d6b80",
  "games/motion-rec/motion-rec.p8.png": "ebbc53e2",
  "games/mots-8-ball-pool/meta.html": "1e141e13",
  "games/mots-8-ball-pool/mots-8-ball-pool.p8.png": "0a5b1cf3",
  "games/muse/meta.html": "5660cb19",
  "games/muse/muse.p8.png": "8cd3ccdc",
  "games/neath/meta.html": "ad10edb5",
  "games/neath/neath.p8.png": "b9e25697",
  "games/nemo-2/meta.html": "388711e4",
  "games/nemo-2/nemo-2.p8.png": "64032f06",
  "games/nemo/meta.html": "f7bbf392",
  "games/nemo/nemo.p8.png": "213fcd9f",
  "games/nest-2/meta.html": "c4494e28",
  "games/nest-2/nest-2.p8.png": "57c494f4",
  "games/night-ride/meta.html": "fa72c2bd",
  "games/night-ride/night-ride.p8.png": "f4e4b670",
  "games/pakpok/meta.html": "74a79a79",
  "games/pakpok/pakpok.p8.png": "b897c913",
  "games/pengo/meta.html": "567ad394",
  "games/pengo/pengo.p8.png": "89de516a",
  "games/petal-quest/meta.html": "8410c4c2",
  "games/petal-quest/petal-quest.p8.png": "e44a2f18",
  "games/petal-to-the-metal/meta.html": "56fe7959",
  "games/petal-to-the-metal/petal-to-the-metal.p8.png": "85a6d57f",
  "games/pico-ball/meta.html": "422bf23a",
  "games/pico-ball/pico-ball.p8.png": "365b9673",
  "games/pico-ball/pico_ball.p8.png": "365b9673",
  "games/pico-ball/pico_ball_match.p8.png": "115cf500",
  "games/pico-dino/meta.html": "5ab50762",
  "games/pico-dino/pico-dino.p8.png": "684b8402",
  "games/pico-froggo/meta.html": "bb189511",
  "games/pico-froggo/pico-froggo.p8.png": "9f5b1e87",
  "games/pico-valley/jotpkdemade-3.p8.png": "9ded5add",
  "games/pico-valley/meta.html": "e97fb211",
  "games/pico-valley/pico-valley.p8.png": "fe225c9d",
  "games/pico-world-race/meta.html": "18ef5c11",
  "games/pico-world-race/pico-world-race.p8.png": "066adb08",
  "games/pico-zombie-garden/meta.html": "291be9d2",
  "games/pico-zombie-garden/pico-zombie-garden.p8.png": "aee89b76",
  "games/picowings/meta.html": "d5b2c5bc",
  "games/picowings/picowings.p8.png": "bf393232",
  "games/pigments/meta.html": "811e73d1",
  "games/pigments/pigments.p8.png": "04589e2f",
  "games/pizza-panda/meta.html": "92322846",
  "games/pizza-panda/pizza-panda.p8.png": "da6c4a9b",
  "games/polder/meta.html": "bca6c22f",
  "games/polder/polder.p8.png": "c197a86d",
  "games/pole-station/meta.html": "3c5e4016",
  "games/pole-station/pole-station.p8.png": "52ecf56c",
  "games/pony-9000/meta.html": "3ce86ac0",
  "games/pony-9000/pony-9000.p8.png": "c75c6dd6",
  "games/poom/meta.html": "e7c911de",
  "games/poom/poom.p8.png": "c1c72159",
  "games/poom/poom_0.p8.png": "c1c72159",
  "games/poom/poom_1.p8.png": "8ebc0e4d",
  "games/poom/poom_e1.p8.png": "b599ca98",
  "games/province/meta.html": "3f1c03d6",
  "games/province/province.p8.png": "abdc5977",
  "games/qbert/meta.html": "ecb806bb",
  "games/qbert/qbert.p8.png": "4cc125c8",
  "games/return-of-the-slimepires/meta.html": "7b37c329",
  "games/return-of-the-slimepires/return-of-the-slimepires.p8.png": "3fc34ed7",
  "games/ruby-eyes/meta.html": "c57a4000",
  "games/ruby-eyes/ruby-eyes.p8.png": "319ca1de",
  "games/samurise/meta.html": "bbfa05fd",
  "games/samurise/samurise.p8.png": "c540c1db",
  "games/samurise/samurise_level.p8.png": "9828a5c4",
  "games/shooting-star/meta.html": "800cb581",
  "games/shooting-star/shooting-star.p8.png": "ac36bafe",
  "games/sneaky-stealy/meta.html": "5caa8149",
  "games/sneaky-stealy/sneaky-stealy.p8.png": "7f070a6c",
  "games/snekburd/meta.html": "5cefe57e",
  "games/snekburd/snekburd.p8.png": "bc5762b4",
  "games/snekburd/snekburd_2.p8.png": "ae16eb4e",
  "games/snekburd/snekburd_3.p8.png": "2add775f",
  "games/snekburd/snekburd_4.p8.png": "d13eca17",
  "games/snekburd/snekburd_5.p8.png": "ba039a19",
  "games/snekburd/snekburd_6.p8.png": "8753618d",
  "games/snekburd/snekburd_7.p8.png": "fc2853f0",
  "games/snekburd/snekburd_c.p8.png": "66036d90",
  "games/snekburd/snekburd_extra.p8.png": "ad581384",
  "games/sokoblox/meta.html": "2e00c0e8",
  "games/sokoblox/sokoblox.p8.png": "b5e82ba7",
  "games/sphero/meta.html": "d2b11566",
  "games/sphero/sphero.p8.png": "6cb959d5",
  "games/sphongos/meta.html": "15611a15",
  "games/sphongos/sphongos.p8.png": "16918a2c",
  "games/star-patrol/meta.html": "95dcff4a",
  "games/star-patrol/star-patrol.p8.png": "8fb52adb",
  "games/subsurface/meta.html": "0ddaa4b1",
  "games/subsurface/subsurface.p8.png": "db2dc487",
  "games/suika/meta.html": "f95fd224",
  "games/suika/suika.p8.png": "a80f5913",
  "games/super-disc-box/meta.html": "0618f905",
  "games/super-disc-box/super-disc-box.p8.png": "75f3617d",
  "games/super-world-of-goo/meta.html": "92432332",
  "games/super-world-of-goo/super-world-of-goo.p8.png": "ae969ed2",
  "games/tad/meta.html": "7a7fa0be",
  "games/tad/tad.p8.png": "cc46bad5",
  "games/terra-nova-pinball/meta.html": "f8a23d24",
  "games/terra-nova-pinball/terra-nova-pinball.p8.png": "597d4ae4",
  "games/terra/meta.html": "66cbf0e7",
  "games/terra/terra.p8.png": "89e22a98",
  "games/terra/terra_1cart.p8.png": "89e22a98",
  "games/terra/terra_char_edit.p8.png": "a0fa9fb1",
  "games/the-lost-night/meta.html": "00caa986",
  "games/the-lost-night/the-lost-night.p8.png": "c730bd27",
  "games/time-for-lunch/meta.html": "f1373a58",
  "games/time-for-lunch/time-for-lunch.p8.png": "36e8a094",
  "games/tiny-hawk/meta.html": "70b9a17a",
  "games/tiny-hawk/tiny-hawk.p8.png": "89888c2e",
  "games/to-a-starling/meta.html": "d98e2f0c",
  "games/to-a-starling/to-a-starling.p8.png": "0be2cbb2",
  "games/trichromat/meta.html": "830fc5cd",
  "games/trichromat/trichromat.p8.png": "e02b8f02",
  "games/tutankham/meta.html": "75121c71",
  "games/tutankham/tutankham.p8.png": "84d53b72",
  "games/undune-2/meta.html": "0e8838b4",
  "games/undune-2/undune-2.p8.png": "ac6ca2dd",
  "games/undune-2/undune2.p8.png": "ac6ca2dd",
  "games/undune-2/undune2_credits.p8.png": "2bc1abae",
  "games/undune-2/undune2_map1.p8.png": "f60e936a",
  "games/undune-2/undune2_map2.p8.png": "d8f944b4",
  "games/undune-2/undune2_map3.p8.png": "f3e8a372",
  "games/undune-2/undune2_map4.p8.png": "666b70fe",
  "games/undune-2/undune2_map5.p8.png": "729c1c66",
  "games/undune-2/undune2_map6.p8.png": "24c3e15d",
  "games/undune-2/undune2_map7.p8.png": "43b3a40d",
  "games/undune-2/undune2_map8.p8.png": "ff88a811",
  "games/undune-2/undune2_map9.p8.png": "86ad81ac",
  "games/up-and-away/meta.html": "9bbc3a24",
  "games/up-and-away/up-and-away.p8.png": "8201f1dc",
  "games/vacay-volley/meta.html": "c7f729e5",
  "games/vacay-volley/vacay-volley.p8.png": "34f8b1b7",
  "games/walker/meta.html": "d42e5f41",
  "games/walker/walker.p8.png": "135e88f7",
  "games/whiplash-taxi/meta.html": "7d80d333",
  "games/whiplash-taxi/whiplash-taxi.p8.png": "0fdaf093",
  "games/willo/meta.html": "f22b0643",
  "games/willo/willo.p8.png": "095f8edd",
  "games/willthemangetfrog/meta.html": "90d3a045",
  "games/willthemangetfrog/willthemangetfrog.p8.png": "07078c4f",
  "games/willthemangetfrog/willthemangetfrog_fr.p8.png": "81ecf012",
  "games/zip-zapper/meta.html": "f11352d9",
  "games/zip-zapper/zip-zapper.p8.png": "e00d57a6",
  "games/zoo-keeper/meta.html": "51d72bc1",
  "games/zoo-keeper/zoo-keeper.p8.png": "75b98698",
  "index.html": "8f80b5d0",
  "js/fade.js": "a6ddc9a4",
  "js/fixi.js": "f513737c",
  "js/offline_pwa.js": "6a74254f",
  "manifest.webmanifest": "0e94d18d",
  "pico8/pico8.js": "c81bddbc",
  "pico8/player.html": "0747cc9e",
  "play.html": "91b52dc5",
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
