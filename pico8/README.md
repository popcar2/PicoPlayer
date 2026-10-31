# The PICO 8 Player

**[PICO 8](https://www.lexaloffle.com/pico-8.php) is created and owned by Lexaloffle games. Please support the original project.**

I (well, Claude) made a few quality-of-life changes to the player, making it more convenient for quickly browsing games on the website.

* The startup animation has been removed to make switching games faster
* The player is made separate from each game so it's cached and re-used by the browser when switching games
* Choosing another game swaps the new ROM into the running player instead of reloading it, and some extra boot wait was removed to make swapping games almost instant
* Multi-cart games are downloaded ahead of time and hosted on PicoPlayer without connecting to external servers
* The audio is normalized (some games were way too quiet and some are way too loud), with a limiter to stop sudden loud sounds from clipping. The audio buffer is also increased slightly vs the original PICO 8 player to try and reduce sudden pops on Chromium browsers.
* Mobile controls appear white when pressed and have been adjusted to work properly with horizontal rotations
* The deprecated `unload` listener is replaced with `pagehide`
* This is currently using the WebAssembly build of version 0.2.7

## Boring Claude-Generated Technical Details

`pico8.js` and `pico8.wasm` come from exporting any cart with `export -w`, with these changes:

* `pico8.js`: everything before `var Module=` is removed (that's the exported cart, which `player.html` supplies instead), `wasmBinaryFile` is `"pico8.wasm?v=<n>"`, and `window.addEventListener("unload",SDL.receiveEvent)` is replaced with `window.addEventListener("pagehide",function(e){if(!e.persisted)SDL.receiveEvent({type:"unload"})})`
* `pico8.wasm`: the startup animation and boot wait are skipped by starting the boot timer at 76 instead of -15. In the boot function that's `i32.const 2972520; i32.const -15; i32.store` becoming `i32.const 76` (in 0.2.7; the address may move in other versions). 76 takes one more byte to encode than -15, so the function's and the code section's sizes go up by one
* Then both are shrunk: `wasm-opt -O3 --converge --mvp-features` on `pico8.wasm` (from [Binaryen](https://github.com/WebAssembly/binaryen); `--mvp-features` keeps the browser support the same as Lexaloffle's build) and `terser -c passes=2 -m` on `pico8.js`. Terser has to leave top-level names alone (no `--toplevel`): the engine `eval`s bits of JS that use `FS`, `IDBFS`, `Module`, `_malloc` and so on by name
* Bump `?v=` in `player.html` (the script and both preloads) and in `wasmBinaryFile` whenever either file changes
