#!/bin/sh
# Add a PICO-8 cart to the site as games/<slug>/ (the cart, its thumbnail art and its metadata).
# usage: "bash scripts/add-game.sh" path/to/cart.p8.png slug "Game Title" "Author" author-uid
# (author-uid is the number in the author's Lexaloffle profile link, lexaloffle.com/bbs/?uid=<number>)
# It also adds the game's cartridge button to play.html, keeping the shelf in alphabetical order (sort-shelf.sh).
# Then fill in the description in its meta.html,
# and run "bash scripts/build-thumbnails.sh" to add its thumbnail to the shelf's sprite sheet.
# Finally run "bash scripts/build-offline.sh" so the service worker downloads it for offline play.
set -e
PICO8=${PICO8:-pico8}
cart=$(realpath "$1"); slug=$2; title=$3; author=$4; uid=$5
dir=$(dirname "$(realpath "$0")")/../games/$slug
mkdir -p "$dir"
cd "$dir"
cp "$cart" "$slug.p8.png"
# lossless, so the cart data hidden in the pixels' low bits survives (saves about a quarter of the file)
command -v oxipng >/dev/null && oxipng -q -o max --strip safe "$slug.p8.png"
"$PICO8" "$cart" -export "-l thumbnail.png"
cat > meta.html <<EOF
<span data-cart="games/$slug/$slug.p8.png" data-title="$title"><b>$title</b> by <a href="https://www.lexaloffle.com/bbs/?uid=$uid" target="_blank" rel="noopener">$author</a></span>
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
