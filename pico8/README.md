# The PICO 8 Player

[PICO 8](https://www.lexaloffle.com/pico-8.php) is created and owned by Lexaloffle games. Please support the original project.

I (well, Claude) made a few changes to make it more convenient for quickly browsing on the website.

* The startup animation has been removed to make switching games faster
* The player is made separate from each game so it's cached and re-used by the browser when switching games
* Switching games swaps the new cart into the running player (rebooting the machine like Lexaloffle player does) instead of reloading it, and some extra boot wait was removed to make swapping games almost instant
* Multi-cart games are downloaded ahead of time and swapped without connecting to external servers
* The audio is normalized (some games were way too quiet and some are way too loud), with a limiter to stop sudden loud sounds from clipping
* Mobile controls appear white when pressed and have been adjusted to work properly with horizontal rotations
* The deprecated `unload` listener is replaced with `pagehide`, so the page can go into the back/forward cache
* It's the .wasm build (PICO-8 0.2.7's `export -w`) rather than the default .js one, which loads and boots a lot faster

## Updating the player

`pico8.js` and `pico8.wasm` come from exporting any cart with `export -w`, with these changes:

* `pico8.js`: everything before `var Module=` is removed (that's the exported cart, which `player.html` supplies instead), `wasmBinaryFile` is `"pico8.wasm?v=<n>"`, and `window.addEventListener("unload",SDL.receiveEvent)` is replaced with `window.addEventListener("pagehide",function(e){if(!e.persisted)SDL.receiveEvent({type:"unload"})})`
* `pico8.wasm`: the startup animation and boot wait are skipped by starting the boot timer at 76 instead of -15. In the boot function that's `i32.const 2972520; i32.const -15; i32.store` becoming `i32.const 76` (in 0.2.7; the address may move in other versions). 76 takes one more byte to encode than -15, so the function's and the code section's sizes go up by one
* Bump `?v=` in `player.html` (the script and both preloads) and in `wasmBinaryFile` whenever either file changes
