#!/bin/sh
# Sort the cartridge buttons on the browse shelf (browse.html) alphabetically by their label, ignoring case.
# add-game.sh runs this after adding a game's button; run it by hand after renaming one.
set -e
cd "$(dirname "$(realpath "$0")")/.."
cart='^    <button class="cart"'  # each cartridge button is one line of the carousel
{
  sed -n '1,/<div class="carousel">/p' browse.html
  # key each button by its lowercased label with the HTML entities decoded (so "Don&#x27;t" sorts as "Don't")
  grep "$cart" browse.html | awk '{
    key = $0; sub(/.*<span>/, "", key); sub(/<\/span>.*/, "", key)
    gsub(/&#x27;/, "\047", key); gsub(/&quot;/, "\"", key); gsub(/&lt;/, "<", key); gsub(/&gt;/, ">", key); gsub(/&amp;/, "\\&", key)
    print tolower(key) "\t" $0
  }' | LC_ALL=C sort -t "$(printf '\t')" -k1,1 | cut -f2-
  sed "1,/<div class=\"carousel\">/d; /$cart/d" browse.html
} > browse.html.tmp
mv browse.html.tmp browse.html
