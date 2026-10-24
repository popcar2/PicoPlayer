#!/bin/sh
# Add a PICO-8 cart to the site as games/<slug>/ (the cart, its label art and its metadata).
# usage: ./add-game.sh path/to/cart.p8.png slug "Game Title" "Author"
# Then add a cartridge button for it in browse.html, and fill in the description and controls in its meta.html
# (games without an .info block show the standard PICO-8 controls instead).
set -e
PICO8=${PICO8:-pico8}
cart=$(realpath "$1"); slug=$2; title=$3; author=$4
dir=$(dirname "$(realpath "$0")")/games/$slug
mkdir -p "$dir"
cd "$dir"
cp "$cart" "$slug.p8.png"
"$PICO8" "$cart" -export "-l label.png"
cat > meta.html <<EOF
<span data-cart="games/$slug/$slug.p8.png" data-title="$title"><b>$title</b> by $author</span>
<div class="info">
  <p>TODO: description</p>
  <h2>Controls</h2>
  <dl>
    <dt>Arrows</dt><dd>Move</dd>
  </dl>
</div>
EOF
