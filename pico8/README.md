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
