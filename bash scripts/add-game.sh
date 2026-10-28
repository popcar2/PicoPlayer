#!/bin/sh
# Add a PICO-8 cart to the site as games/<slug>/ (the cart as a .p8.rom, its thumbnail art and its metadata).
# usage: "bash scripts/add-game.sh" cart.p8.png slug "Game Title" "Author" author-uid [extra.p8.png ...]
# Each cart is a .p8.png's url (it's downloaded) or a path to one. The thumbnail is the main cart's label.
# (author-uid is the number in the author's Lexaloffle profile link, lexaloffle.com/bbs/?uid=<number>)
# Extra carts are for multi-cart games: each becomes <its name>.p8.rom next to the main cart, which is where the
# player looks when the game load("#<name>")s it.
# The carts are then minified (minify-roms.sh).
# It also adds the game's cartridge button to play.html, keeping the shelf in alphabetical order (sort-shelf.sh).
# Then fill in the description in its meta.html,
# and run "bash scripts/build-thumbnails.sh" to add its thumbnail to the shelf's sprite sheet.
# Finally run "bash scripts/build-offline.sh" so the service worker downloads it for offline play.
# Needs ImageMagick, python3 and git (for shrinko8, see minify-roms.sh).
set -e
slug=$2; title=$3; author=$4; uid=$5
dir=$(dirname "$(realpath "$0")")/../games/$slug
mkdir -p "$dir"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# download (or copy) a .p8.png to $tmp/<name>.p8.png and print that path
fetch() {
  png=$tmp/$(basename "${1%%\?*}")
  case $1 in
    http://*|https://*) curl -fsSL -o "$png" "$1" ;;
    *) cp "$1" "$png" ;;
  esac
  echo "$png"
}

# a .p8.png hides one byte per pixel in the low 2 bits of A,R,G,B: the first 32k are the cart as a .p8.rom,
# which gzips smaller than the .p8.png's picture
rom() {
  magick "$1" -depth 8 RGBA:- | python3 -I -c '
import sys
px = sys.stdin.buffer.read()
sys.stdout.buffer.write(bytes((px[k*4+3]&3)<<6 | (px[k*4]&3)<<4 | (px[k*4+1]&3)<<2 | (px[k*4+2]&3) for k in range(32768)))
' > "$2"
}

# the label is the 128x128 art at (16, 24). snap each pixel to the nearest PICO-8 colour to drop the cart data in
# its low bits, which gives exactly what PICO-8's own label export does
label() {
  magick "$1" -crop 128x128+16+24 +repage -depth 8 RGBA:- | python3 -I -c '
import sys
pal = [bytes.fromhex(c) for c in "000000 1d2b53 7e2553 008751 ab5236 5f574f c2c3c7 fff1e8 ff004d ffa300 ffec27 00e436 29adff 83769c ff77a8 ffccaa 291814 111d35 422136 125359 742f29 49333b a28879 f3ef7d be1250 ff6c24 a8e72e 00b543 065ab5 754665 ff6e59 ff9d81".split()]
px, out, near = sys.stdin.buffer.read(), bytearray(), {}
for k in range(0, len(px), 4):
    c = px[k:k+3]
    if c not in near: near[c] = min(pal, key=lambda p: sum((a-b)**2 for a, b in zip(p, c)))
    out += near[c]
sys.stdout.buffer.write(out)
' | magick -size 128x128 -depth 8 RGB:- "$2"
}

cart=$(fetch "$1")
rom "$cart" "$dir/$slug.p8.rom"
label "$cart" "$dir/thumbnail.png"
shift 5
for extra in "$@"; do
  png=$(fetch "$extra")
  rom "$png" "$dir/$(basename "$png" .png).rom"
done
sh "$(dirname "$(realpath "$0")")/minify-roms.sh" "$dir"/*.p8.rom

cd "$dir"
cat > meta.html <<EOF
<span data-cart="games/$slug/$slug.p8.rom" data-title="$title"><b>$title</b> by <a href="https://www.lexaloffle.com/bbs/?uid=$uid" target="_blank" rel="noopener">$author</a></span>
<div class="info">
  <p>TODO: description</p>
</div>
EOF

# add its cartridge to the shelf (unless it's already there), then put the shelf back in alphabetical order
cd ../..
if ! grep -q "fx-action=\"games/$slug/meta.html\"" play.html; then
  button="    <button class=\"cart\" fx-action=\"games/$slug/meta.html\" fx-target=\"#meta\" fx-swap=\"innerHTML\"><i class=\"thumbnail\"></i><span>$title</span></button>" \
    awk '/^  <\/div><\/footer>/ { print ENVIRON["button"] } 1' play.html > play.html.tmp
  mv play.html.tmp play.html
fi
sh "bash scripts/sort-shelf.sh"
