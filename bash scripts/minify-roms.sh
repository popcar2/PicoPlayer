#!/bin/sh
# Shrink .p8.rom carts with shrinko8's safe minification (the code works exactly as before, just smaller), then drop
# the zeros at the end of the rom, which the player pads back. Graphics, map and sound are left untouched.
# usage: "bash scripts/minify-roms.sh" [cart.p8.rom ...]   (no carts: every games/*/*.p8.rom)
# A rom is only replaced if it came out smaller, so it's fine to run again on carts that are already minified.
# add-game.sh runs this on the carts it adds. Afterwards run "bash scripts/build-offline.sh".
# Needs python3 and git. Uses shrinko8 from $SHRINKO8 (a path to shrinko8.py) if set, else clones it once into
# ~/.cache/shrinko8.
set -e
cd "$(dirname "$(realpath "$0")")/.."
shrinko8=${SHRINKO8:-${XDG_CACHE_HOME:-$HOME/.cache}/shrinko8/shrinko8.py}
if [ ! -f "$shrinko8" ]; then
  git clone -q --depth 1 https://github.com/thisismypassport/shrinko8.git "$(dirname "$shrinko8")"
fi
[ $# -gt 0 ] || set -- games/*/*.p8.rom
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

for rom in "$@"; do
  # shrinko8 wants the full 32k rom, so pad a trimmed one back out first
  python3 -I -c 'import sys; open(sys.argv[2], "wb").write(open(sys.argv[1], "rb").read().ljust(32768, b"\0"))' \
    "$rom" "$tmp/in.p8.rom"
  python3 "$shrinko8" "$tmp/in.p8.rom" "$tmp/out.p8.rom" --minify-safe-only || { echo "$rom: skipped, shrinko8 failed" >&2; continue; }
  # shrinko8 can turn "if c then (x).f() end" into the shorthand "if(c)(x).f()", which PICO-8 reads as calling the
  # condition and then fails to parse (this broke Into Ruins). so decode what it made and skip the rom if any shorthand
  # if or while has a statement starting with "("
  python3 "$shrinko8" "$tmp/out.p8.rom" "$tmp/out.p8" || { echo "$rom: skipped, shrinko8 can't read its own output" >&2; continue; }
  python3 -I -c '
import re, sys
lua = open(sys.argv[2], encoding="utf-8", errors="replace").read().split("__lua__\n", 1)[-1].split("\n__", 1)[0]
for line in lua.split("\n"):
    for m in re.finditer(r"\b(if|while)\s*\(", line):
        i, depth, quote = m.end(), 1, None  # find the paren closing the condition, skipping over strings
        while i < len(line) and depth:
            c = line[i]
            if quote:
                if c == "\\": i += 1
                elif c == quote: quote = None
            elif c in "\"\x27": quote = c
            elif c == "(": depth += 1
            elif c == ")": depth -= 1
            i += 1
        if not depth and re.match(r"\s*\(", line[i:]): sys.exit(sys.argv[1] + ": skipped, shrinko8 made a shorthand PICO-8 misreads: " + line[m.start():i + 30])
' "$rom" "$tmp/out.p8" || continue
  # keep the new rom only if everything before the code (0x4300 on: graphics, map, sound) is the same and, for
  # compressed code, nothing was stored after it (some carts reload() data from there, which re-encoding would lose)
  python3 -I -c '
import sys
rom, old, new = sys.argv[1], open(sys.argv[2], "rb").read(), open(sys.argv[3], "rb").read()
code = old[0x4300:]
if old[:0x4300] != new[:0x4300]: sys.exit(rom + ": skipped, shrinko8 changed more than the code")
if code[:4] == b"\0pxa" and any(code[int.from_bytes(code[6:8], "big"):]): sys.exit(rom + ": skipped, data after its code")
was = len(open(rom, "rb").read())
new = new.rstrip(b"\0")
if len(new) < was:
    open(rom, "wb").write(new)
    print("%s: %d -> %d bytes" % (rom, was, len(new)))
' "$rom" "$tmp/in.p8.rom" "$tmp/out.p8.rom" || true
done
