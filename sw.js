// service worker: keeps every file the site loads so it works offline, and once the site is installed as an app
// (js/offline_pwa.js asks for it) downloads the rest: every page, the player and every cart.
// each file is cached under "<path>?v=<hash>", so an update only refetches the files whose hash changed
// and copies the rest over from the previous cache. the list below is written by "bash scripts/build-offline.sh"

// precache:start
let version = "picoplayer-95aafd35"
let files = {
  "about.html": "a13ea3db",
  "assets/github.svg": "a5101cbd",
  "assets/icon-192.png": "145db495",
  "assets/icon-512.png": "993067c2",
  "assets/icon-any-192.png": "59711dda",
  "assets/icon-any-512.png": "ff2eb6b9",
  "assets/icon-any.svg": "07bdfcfb",
  "assets/icon.svg": "ddbab87b",
  "assets/loading.svg": "2c7642c3",
  "assets/style.css": "b8e44298",
  "assets/thumbnails.css": "ba696b0e",
  "assets/thumbnails.webp": "24d116db",
  "games/8-legs-to-love/8-legs-to-love.p8.rom": "d617c5f2",
  "games/8-legs-to-love/meta.html": "38aea05b",
  "games/air-delivery/air-delivery.p8.rom": "aed407ff",
  "games/air-delivery/meta.html": "17406755",
  "games/alfonzos-bowling-challenge/alfonzos-bowling-challenge.p8.rom": "c00375d9",
  "games/alfonzos-bowling-challenge/meta.html": "385fa020",
  "games/baba-is-you-demake/baba-is-you-demake.p8.rom": "689422a8",
  "games/baba-is-you-demake/meta.html": "77b75c49",
  "games/balloon/balloon.p8.rom": "fe1a995a",
  "games/balloon/meta.html": "521ed632",
  "games/barp-the-balldragon/barp-the-balldragon.p8.rom": "76618804",
  "games/barp-the-balldragon/meta.html": "0dedde88",
  "games/bas/bas.p8.rom": "e4ef235d",
  "games/bas/meta.html": "6ff15cb1",
  "games/beam/beam.p8.rom": "e4f8f953",
  "games/beam/meta.html": "dbab342b",
  "games/birds-with-guns/birds-with-guns.p8.rom": "c5b20553",
  "games/birds-with-guns/meta.html": "26e6ff46",
  "games/blood-of-vladula-jr/blood-of-vladula-jr.p8.rom": "37b95e3f",
  "games/blood-of-vladula-jr/meta.html": "12f3c737",
  "games/breakout-hero/breakout-hero.p8.rom": "5815ff06",
  "games/breakout-hero/meta.html": "2fa829d7",
  "games/brutal-pico-race/brutal-pico-race.p8.rom": "86c85338",
  "games/brutal-pico-race/meta.html": "f9c2e6ab",
  "games/bubble-bobble/bubble-bobble.p8.rom": "c358a72c",
  "games/bubble-bobble/meta.html": "79b9bd5a",
  "games/build-a-jetpack/build-a-jetpack.p8.rom": "b3518331",
  "games/build-a-jetpack/meta.html": "f5d36ca9",
  "games/bun-bun-samurai/bun-bun-samurai.p8.rom": "4b63de91",
  "games/bun-bun-samurai/meta.html": "baff7008",
  "games/bunny-survivor/bunny-survivor.p8.rom": "12f08a67",
  "games/bunny-survivor/meta.html": "67b75962",
  "games/bustin/bustin.p8.rom": "560af917",
  "games/bustin/meta.html": "f177df1f",
  "games/cab-ride/cab-ride.p8.rom": "76e0e492",
  "games/cab-ride/meta.html": "2c8c3ca2",
  "games/caped-feline-arena/caped-feline-arena.p8.rom": "ed741f76",
  "games/caped-feline-arena/meta.html": "9b724136",
  "games/cherry-bomb/cherry-bomb.p8.rom": "9420ec06",
  "games/cherry-bomb/meta.html": "022d78b1",
  "games/combo-pool/combo-pool.p8.rom": "fe2866f6",
  "games/combo-pool/meta.html": "8316b4c3",
  "games/crimson-night/crimson-night.p8.rom": "6ec1d583",
  "games/crimson-night/meta.html": "f662a36e",
  "games/demon-castle/demon-castle.p8.rom": "a09ee6ec",
  "games/demon-castle/meta.html": "f7006137",
  "games/digger/digger.p8.rom": "11556e78",
  "games/digger/meta.html": "1f039304",
  "games/dodge/dodge.p8.rom": "e27cde8e",
  "games/dodge/meta.html": "bcf32815",
  "games/dominion-ex/dominion-ex.p8.rom": "324c9ca5",
  "games/dominion-ex/meta.html": "e9b3d3cf",
  "games/donsol/donsol.p8.rom": "f25cacb7",
  "games/donsol/meta.html": "bfb6b367",
  "games/dont-dig-up-the-dead/dont-dig-up-the-dead.p8.rom": "f07bc3ea",
  "games/dont-dig-up-the-dead/dontdig_game.p8.rom": "5b72988d",
  "games/dont-dig-up-the-dead/meta.html": "386a4f2a",
  "games/downward/downward.p8.rom": "6fcfbe74",
  "games/downward/meta.html": "24ab97ee",
  "games/driftmania/driftmania.p8.rom": "73e1ef12",
  "games/driftmania/meta.html": "1c2bf608",
  "games/dungeon/dungeon.p8.rom": "d05ea9c2",
  "games/dungeon/meta.html": "a4f01f2d",
  "games/dust-bunny/dust-bunny.p8.rom": "78640991",
  "games/dust-bunny/meta.html": "4fec7586",
  "games/feathered-escape/feathered-escape.p8.rom": "578f0061",
  "games/feathered-escape/meta.html": "0d157536",
  "games/feed-the-ducks/feed-the-ducks.p8.rom": "aec985cd",
  "games/feed-the-ducks/meta.html": "60d1a621",
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
  "games/freezing-knights/freezing_knights_ending.p8.rom": "3f875377",
  "games/freezing-knights/freezing_knights_map.p8.rom": "05309aa0",
  "games/freezing-knights/freezing_knights_rest.p8.rom": "6df72a40",
  "games/freezing-knights/freezing_knights_start.p8.rom": "064bea1f",
  "games/freezing-knights/meta.html": "b71d23c8",
  "games/galactic-wars/galactic-wars.p8.rom": "1d365bab",
  "games/galactic-wars/meta.html": "b4b0c5b0",
  "games/gars-den/gars-den.p8.rom": "6f4053ea",
  "games/gars-den/meta.html": "0ed29fb1",
  "games/ghost-house/ghost-house.p8.rom": "69f9024e",
  "games/ghost-house/meta.html": "d22f3801",
  "games/guncho/guncho.p8.rom": "9b560992",
  "games/guncho/meta.html": "021413b1",
  "games/hakai/hakai.p8.rom": "24ab51fe",
  "games/hakai/meta.html": "4f612b4b",
  "games/happy-larry/happy-larry.p8.rom": "c4ca28fb",
  "games/happy-larry/meta.html": "3f54a032",
  "games/harolds-bad-day/harolds-bad-day.p8.rom": "64e3431e",
  "games/harolds-bad-day/meta.html": "2c779cb8",
  "games/high-stakes/high-stakes.p8.rom": "ddc65652",
  "games/high-stakes/meta.html": "3b735660",
  "games/holiday-bowling/holiday-bowling.p8.rom": "6900a2a5",
  "games/holiday-bowling/meta.html": "f38af929",
  "games/holiday-jumper/holiday-jumper.p8.rom": "a12351fa",
  "games/holiday-jumper/meta.html": "62b16b69",
  "games/hot-wax/hot-wax.p8.rom": "e101d4de",
  "games/hot-wax/meta.html": "81760e7f",
  "games/hungry-harry-3d/hungry-harry-3d.p8.rom": "048004fa",
  "games/hungry-harry-3d/meta.html": "a82cce36",
  "games/hydra/hydra.p8.rom": "97eee69b",
  "games/hydra/meta.html": "10911390",
  "games/impossible-mission-rt/impossible-mission-rt.p8.rom": "282adfc2",
  "games/impossible-mission-rt/meta.html": "93b3b115",
  "games/into-ruins/into-ruins.p8.rom": "77e8a36c",
  "games/into-ruins/intoruins.p8.rom": "77e8a36c",
  "games/into-ruins/intoruins_main-7.p8.rom": "6def639c",
  "games/into-ruins/meta.html": "9a4326cf",
  "games/invader-overload/invader-overload.p8.rom": "67f58cb9",
  "games/invader-overload/meta.html": "75ed0630",
  "games/just-one-boss/just-one-boss.p8.rom": "673bf2d4",
  "games/just-one-boss/meta.html": "de88d0b3",
  "games/katamari-christmassy/katamari-christmassy.p8.rom": "b49696df",
  "games/katamari-christmassy/meta.html": "586238a8",
  "games/lab-cat/lab-cat.p8.rom": "1f8f9227",
  "games/lab-cat/meta.html": "60428c01",
  "games/linecraft/linecraft.p8.rom": "4e02f0b0",
  "games/linecraft/linecraft_buttongame.p8.rom": "2a3ca816",
  "games/linecraft/linecraft_compdecomp.p8.rom": "7772f4e6",
  "games/linecraft/linecraft_devkitgame.p8.rom": "3f9c1b8f",
  "games/linecraft/linecraft_polybuttongame.p8.rom": "f4792fc1",
  "games/linecraft/linecraft_polygame.p8.rom": "5920b21e",
  "games/linecraft/meta.html": "82eef7fb",
  "games/little-dragon-adventure/little-dragon-adventure.p8.rom": "89621fde",
  "games/little-dragon-adventure/meta.html": "4054b407",
  "games/little-eidolons/little-eidolons.p8.rom": "0b29c2c4",
  "games/little-eidolons/littleeidolons_data_1.p8.rom": "71de689b",
  "games/little-eidolons/meta.html": "e1751fd3",
  "games/little-necromancer/little-necromancer.p8.rom": "f7b11723",
  "games/little-necromancer/meta.html": "0034094f",
  "games/loop/loop.p8.rom": "362893d8",
  "games/loop/meta.html": "a4e46d01",
  "games/mai-chans-sweet-buns/mai-chans-sweet-buns.p8.rom": "868cea64",
  "games/mai-chans-sweet-buns/meta.html": "3e128697",
  "games/mapuzzle/mapuzzle.p8.rom": "325746e0",
  "games/mapuzzle/meta.html": "b3feebc3",
  "games/marballs-2/marballs-2.p8.rom": "f8356960",
  "games/marballs-2/meta.html": "d51c8bc9",
  "games/marble-merger/marble-merger.p8.rom": "7e6b5ec2",
  "games/marble-merger/meta.html": "1b71c0b3",
  "games/meas-castle/meas-castle.p8.rom": "f20f99fe",
  "games/meas-castle/meta.html": "438c425c",
  "games/motion-rec/meta.html": "7d85ff58",
  "games/motion-rec/motion-rec.p8.rom": "982a5459",
  "games/mots-8-ball-pool/meta.html": "75103b60",
  "games/mots-8-ball-pool/mots-8-ball-pool.p8.rom": "e63e6d1f",
  "games/mots-grand-prix/meta.html": "3869b4b4",
  "games/mots-grand-prix/mot_grandprix2.p8.rom": "e639c3b2",
  "games/mots-grand-prix/mot_grandprix2game.p8.rom": "8ca31d4e",
  "games/mots-grand-prix/mots-grand-prix.p8.rom": "e639c3b2",
  "games/muse/meta.html": "c4403c89",
  "games/muse/muse.p8.rom": "ac9b6e1b",
  "games/nanoman/meta.html": "94fd0563",
  "games/nanoman/nanoman.p8.rom": "0394b699",
  "games/neath/meta.html": "b61d900c",
  "games/neath/neath.p8.rom": "2910b78c",
  "games/nemo-2/meta.html": "3ce54e67",
  "games/nemo-2/nemo-2.p8.rom": "fba7c0e7",
  "games/nemo/meta.html": "9107e2d1",
  "games/nemo/nemo.p8.rom": "e62481c8",
  "games/nemonic-crypt/meta.html": "296eab0a",
  "games/nemonic-crypt/nemonic-crypt.p8.rom": "c19bda49",
  "games/nest-2/meta.html": "7c86e7af",
  "games/nest-2/nest-2.p8.rom": "c799d356",
  "games/night-ride/meta.html": "ca136c47",
  "games/night-ride/night-ride.p8.rom": "31abb247",
  "games/one-room-dungeon/meta.html": "d514078e",
  "games/one-room-dungeon/one-room-dungeon.p8.rom": "697ad810",
  "games/orul/meta.html": "2c9fd468",
  "games/orul/orul.p8.rom": "ff32b4fb",
  "games/pakpok/meta.html": "a9c6da03",
  "games/pakpok/pakpok.p8.rom": "2108d6d4",
  "games/pengo/meta.html": "fb64163e",
  "games/pengo/pengo.p8.rom": "d47c53b7",
  "games/petal-quest/meta.html": "5fcc01b0",
  "games/petal-quest/petal-quest.p8.rom": "7d979694",
  "games/petal-to-the-metal/meta.html": "78c18ca1",
  "games/petal-to-the-metal/petal-to-the-metal.p8.rom": "7b3a1c09",
  "games/pico-ball/meta.html": "a0e05729",
  "games/pico-ball/pico-ball.p8.rom": "1f262d0b",
  "games/pico-ball/pico_ball.p8.rom": "1f262d0b",
  "games/pico-ball/pico_ball_match.p8.rom": "b8a2ec55",
  "games/pico-checkmate/meta.html": "6751bc40",
  "games/pico-checkmate/pico-checkmate.p8.rom": "03b8491c",
  "games/pico-de-pon/meta.html": "ac74067c",
  "games/pico-de-pon/pico-de-pon.p8.rom": "cc3ce4e6",
  "games/pico-dino/meta.html": "fe84286d",
  "games/pico-dino/pico-dino.p8.rom": "b9532acf",
  "games/pico-froggo/meta.html": "97c6a3e4",
  "games/pico-froggo/pico-froggo.p8.rom": "0c7eb96a",
  "games/pico-off-road/meta.html": "326b9e92",
  "games/pico-off-road/pico-off-road.p8.rom": "b810b56c",
  "games/pico-pirates/meta.html": "4ff82566",
  "games/pico-pirates/pico-pirates.p8.rom": "c32a628a",
  "games/pico-snail-dream-castle/meta.html": "0efeffcd",
  "games/pico-snail-dream-castle/pico-snail-dream-castle.p8.rom": "e0eb5960",
  "games/pico-tennis/meta.html": "bc1236a5",
  "games/pico-tennis/pico-tennis.p8.rom": "39e74dee",
  "games/pico-world-race/meta.html": "3556ece6",
  "games/pico-world-race/pico-world-race.p8.rom": "0ae14f96",
  "games/pico-zombie-garden/meta.html": "08f09d20",
  "games/pico-zombie-garden/pico-zombie-garden.p8.rom": "228844f0",
  "games/picohot/meta.html": "f7b1e864",
  "games/picohot/picohot.p8.rom": "85997f4b",
  "games/picolumia/meta.html": "1c4fc8c5",
  "games/picolumia/picolumia.p8.rom": "e90b20bc",
  "games/picowars/meta.html": "b41aa9da",
  "games/picowars/picowars.p8.rom": "f82ad846",
  "games/pieces-of-cake/meta.html": "6fc9910f",
  "games/pieces-of-cake/pieces-of-cake.p8.rom": "c51823c5",
  "games/pigments/meta.html": "a6a80a72",
  "games/pigments/pigments.p8.rom": "0f05dabf",
  "games/pirates-trial/meta.html": "5843b7e8",
  "games/pirates-trial/pirates-trial.p8.rom": "5f4f436c",
  "games/pizza-panda/meta.html": "979db73e",
  "games/pizza-panda/pizza-panda.p8.rom": "7e898fd2",
  "games/pole-station/meta.html": "f157e017",
  "games/pole-station/pole-station.p8.rom": "9856d055",
  "games/pony-9000/meta.html": "72fef92c",
  "games/pony-9000/pony-9000.p8.rom": "20f20865",
  "games/poom/meta.html": "cd6563e4",
  "games/poom/poom.p8.rom": "9d9e4e11",
  "games/poom/poom_0.p8.rom": "9d9e4e11",
  "games/poom/poom_1.p8.rom": "ba99fdf9",
  "games/poom/poom_e1.p8.rom": "b1f9b7bd",
  "games/province/meta.html": "bcc4182c",
  "games/province/province.p8.rom": "ce35464f",
  "games/pullfrog/meta.html": "f74e15be",
  "games/pullfrog/pullfrog.p8.rom": "97f7d379",
  "games/qbert/meta.html": "d83d977f",
  "games/qbert/qbert.p8.rom": "df78f3b2",
  "games/quest-for-the-book-of-truth/meta.html": "093d6d63",
  "games/quest-for-the-book-of-truth/quest-for-the-book-of-truth.p8.rom": "b53313f2",
  "games/return-of-the-slimepires/meta.html": "e4feeed8",
  "games/return-of-the-slimepires/return-of-the-slimepires.p8.rom": "3b83cd05",
  "games/rolly/meta.html": "71e05674",
  "games/rolly/rolly.p8.rom": "2c53d74c",
  "games/ruby-eyes/meta.html": "1cab2150",
  "games/ruby-eyes/ruby-eyes.p8.rom": "93468003",
  "games/samurise/meta.html": "47b59351",
  "games/samurise/samurise.p8.rom": "9f7811ef",
  "games/samurise/samurise_level.p8.rom": "68c3eaa9",
  "games/scrap-boy/meta.html": "604d891b",
  "games/scrap-boy/scrap-boy.p8.rom": "8387e230",
  "games/shadows-of-dunwich/meta.html": "db5c6a14",
  "games/shadows-of-dunwich/shadows-of-dunwich.p8.rom": "426a1a2f",
  "games/shooting-star/meta.html": "ef69c209",
  "games/shooting-star/shooting-star.p8.rom": "c2dfbd39",
  "games/snekburd/meta.html": "dc77b15d",
  "games/snekburd/snekburd.p8.rom": "83af8570",
  "games/snekburd/snekburd_2.p8.rom": "74b22b98",
  "games/snekburd/snekburd_3.p8.rom": "20fe6111",
  "games/snekburd/snekburd_4.p8.rom": "26f941d8",
  "games/snekburd/snekburd_5.p8.rom": "36033a12",
  "games/snekburd/snekburd_6.p8.rom": "f1b667ca",
  "games/snekburd/snekburd_7.p8.rom": "11030a7c",
  "games/snekburd/snekburd_c.p8.rom": "6757e14b",
  "games/snekburd/snekburd_extra.p8.rom": "e6c543de",
  "games/snow/meta.html": "10660b82",
  "games/snow/snow.p8.rom": "b9bbb7c6",
  "games/sokoblox/meta.html": "05f05c62",
  "games/sokoblox/sokoblox.p8.rom": "3eb78614",
  "games/solais/meta.html": "dc36168f",
  "games/solais/solais.p8.rom": "20cbbe90",
  "games/sphongos/meta.html": "c4278a2d",
  "games/sphongos/sphongos.p8.rom": "ceb3de9d",
  "games/star-anise-chronicles/meta.html": "1b3a86e0",
  "games/star-anise-chronicles/star-anise-chronicles.p8.rom": "73855f4d",
  "games/star-patrol/meta.html": "70d2720d",
  "games/star-patrol/star-patrol.p8.rom": "b514bab4",
  "games/steps/meta.html": "4df251b4",
  "games/steps/steps.p8.rom": "52b227d6",
  "games/subsurface/meta.html": "2317cf45",
  "games/subsurface/subsurface.p8.rom": "a96328e5",
  "games/suika/meta.html": "2880244e",
  "games/suika/suika.p8.rom": "77e6cfdc",
  "games/super-disc-box/meta.html": "a610e25d",
  "games/super-disc-box/super-disc-box.p8.rom": "dffbed1f",
  "games/super-world-of-goo/meta.html": "4222cb90",
  "games/super-world-of-goo/super-world-of-goo.p8.rom": "5a64ba47",
  "games/swordfish/meta.html": "446a96e2",
  "games/swordfish/swordfish.p8.rom": "de6ef42c",
  "games/tad/meta.html": "fb5c612e",
  "games/tad/tad.p8.rom": "55235203",
  "games/tera-mind-over-matter/meta.html": "649ee12d",
  "games/tera-mind-over-matter/tera-mind-over-matter.p8.rom": "2fb93bcb",
  "games/terra-nova-pinball/meta.html": "75d6862a",
  "games/terra-nova-pinball/terra-nova-pinball.p8.rom": "e3c0ef21",
  "games/the-lost-night/meta.html": "84c6e0ec",
  "games/the-lost-night/the-lost-night.p8.rom": "17c6c956",
  "games/the-story-of-zeldo/meta.html": "7c7f92b2",
  "games/the-story-of-zeldo/the-story-of-zeldo.p8.rom": "42dbb684",
  "games/thunder-bella/meta.html": "67cf70a0",
  "games/thunder-bella/thunder-bella.p8.rom": "67f973c9",
  "games/time-for-lunch/meta.html": "160117a9",
  "games/time-for-lunch/time-for-lunch.p8.rom": "aaa73d5e",
  "games/tiny-hawk/meta.html": "1e6f0384",
  "games/tiny-hawk/tiny-hawk.p8.rom": "957f013d",
  "games/to-a-starling/meta.html": "e275f4f6",
  "games/to-a-starling/to-a-starling.p8.rom": "1469196c",
  "games/trial-of-the-sorcerer/meta.html": "a8995cab",
  "games/trial-of-the-sorcerer/mot_sorcerergame.p8.rom": "ded87528",
  "games/trial-of-the-sorcerer/trial-of-the-sorcerer.p8.rom": "7f68a69c",
  "games/trichromat/meta.html": "922469f1",
  "games/trichromat/trichromat.p8.rom": "28063b4e",
  "games/tutankham/meta.html": "e465a1ed",
  "games/tutankham/tutankham.p8.rom": "3c8e7c58",
  "games/ufo-swamp-odyssey/meta.html": "dd23046f",
  "games/ufo-swamp-odyssey/ufo-swamp-odyssey.p8.rom": "6fa3b16b",
  "games/undune-2/meta.html": "0bae88ef",
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
  "games/up-and-away/meta.html": "40939075",
  "games/up-and-away/up-and-away.p8.rom": "71e5d959",
  "games/vacay-volley/meta.html": "144113c5",
  "games/vacay-volley/vacay-volley.p8.rom": "c2c120db",
  "games/valdi-shadows/meta.html": "1538e813",
  "games/valdi-shadows/valdi-shadows.p8.rom": "473f18d9",
  "games/villager/meta.html": "0e3eddd3",
  "games/villager/villager.p8.rom": "d9ebcb65",
  "games/walker/meta.html": "79f97fa1",
  "games/walker/walker.p8.rom": "272299d5",
  "games/whiplash-taxi/meta.html": "b67ea74c",
  "games/whiplash-taxi/whiplash-taxi.p8.rom": "2c9c3bda",
  "games/willo/meta.html": "d9f853b5",
  "games/willo/willo.p8.rom": "57375fe7",
  "games/willthemangetfrog/meta.html": "881aad48",
  "games/willthemangetfrog/willthemangetfrog.p8.rom": "c4fed432",
  "games/willthemangetfrog/willthemangetfrog_fr.p8.rom": "9d8378a2",
  "games/witch-loves-bullets/meta.html": "fc66415d",
  "games/witch-loves-bullets/witch-loves-bullets.p8.rom": "42a56cf4",
  "games/wizardish/meta.html": "976a67ef",
  "games/wizardish/wizardish.p8.rom": "53b7cef8",
  "games/wolfenstein-3d/meta.html": "bf22e81d",
  "games/wolfenstein-3d/wolfenstein-3d.p8.rom": "6a401516",
  "games/x-wing-vs-tie-fighter/meta.html": "3a09a12b",
  "games/x-wing-vs-tie-fighter/x-wing-vs-tie-fighter.p8.rom": "741215fe",
  "games/x-zero/meta.html": "89694263",
  "games/x-zero/x-zero.p8.rom": "e778f975",
  "games/zip-zapper/meta.html": "74b93a31",
  "games/zip-zapper/zip-zapper.p8.rom": "dfb1e851",
  "games/zoo-keeper/meta.html": "f7b46c27",
  "games/zoo-keeper/zoo-keeper.p8.rom": "ec0d7e6e",
  "index.html": "dfefb5ef",
  "js/fixi.js": "f513737c",
  "js/offline_pwa.js": "bcc77ede",
  "js/transitions.js": "ff113666",
  "manifest.webmanifest": "8aad173e",
  "pico8/pico8.js": "70cb21bf",
  "pico8/player.html": "8b36cd01",
  "play.html": "76e4245c",
  "technical_deets.html": "3340c6c7",
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

// fetch for a page that's open right now. while any are in flight the background download holds off on starting more
// files, so what's on screen gets the connection to itself
let busy = 0, waiting = []
async function fetchNow(request, options) {
  busy++
  try {
    return await fetch(request, options)
  } finally {
    if (!--busy) waiting.splice(0).forEach((resume) => resume())
  }
}
let untilIdle = () => busy ? new Promise((resume) => waiting.push(resume)) : null

// fetch a listed file into this version's cache, unless it's already there. at low priority, since nobody's waiting on it
async function store(cache, path) {
  if (await cache.match(keyFor(path))) return
  let response = await fetch(new URL(path, scope), { cache: "reload", priority: "low" })
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

// the installed app asks for everything. a few at a time, with the pages and the player before the carts, and pausing
// whenever an open page is loading something, so it isn't stuck behind hundreds of downloads sharing the connection
self.addEventListener("message", (e) => {
  if (e.data != "download-all") return
  let paths = Object.keys(files).sort((a, b) => a.startsWith("games/") - b.startsWith("games/"))
  e.waitUntil(caches.open(version).then((cache) => Promise.all(Array.from({ length: 4 }, async () => {
    while (paths.length) {
      await untilIdle()
      await store(cache, paths.shift()).catch(() => {})
    }
  }))))
})

// listed files come from the cache, or the network (and are kept) the first time. anything else of ours
// (e.g. a game added without rerunning the script) goes to the network first, and is kept for offline use.
// after a deploy, js/offline_pwa.js reloads the page once this version takes over
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
      // the file itself, so /play works even where the server doesn't add .html. revalidated, so a copy the HTTP cache
      // kept from before a deploy isn't stored under the new hash
      let response = await fetchNow(new URL(path, scope), { cache: "no-cache" })
      if (response.ok) cache.put(keyFor(path), response.clone())
      return response
    }
    try {
      let response = await fetchNow(e.request)
      if (response.ok) cache.put(e.request, response.clone())
      return response
    } catch (error) {
      return await cache.match(e.request, { ignoreSearch: e.request.mode == "navigate" }) || Promise.reject(error)
    }
  })())
})
