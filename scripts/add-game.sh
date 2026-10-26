#!/bin/sh
# Add a PICO-8 cart to the site as games/<slug>/ (the cart, its thumbnail art and its metadata).
# usage: scripts/add-game.sh path/to/cart.p8.png slug "Game Title" "Author" author-uid
# (author-uid is the number in the author's Lexaloffle profile link, lexaloffle.com/bbs/?uid=<number>)
# Then add a cartridge button for it in browse.html, fill in the description in its meta.html,
# and run scripts/build-thumbnails.sh to add its thumbnail to the shelf's sprite sheet.
set -e
PICO8=${PICO8:-pico8}
cart=$(realpath "$1"); slug=$2; title=$3; author=$4; uid=$5
dir=$(dirname "$(realpath "$0")")/../games/$slug
mkdir -p "$dir"
cd "$dir"
cp "$cart" "$slug.p8.png"
"$PICO8" "$cart" -export "-l thumbnail.png"
cat > meta.html <<EOF
<span data-cart="games/$slug/$slug.p8.png" data-title="$title"><b>$title</b> by <a href="https://www.lexaloffle.com/bbs/?uid=$uid" target="_blank" rel="noopener">$author</a></span>
<div class="info">
  <p>TODO: description</p>
</div>
EOF
