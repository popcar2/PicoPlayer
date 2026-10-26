#!/bin/sh
# List every file the site needs (pages, assets, the player and each game's meta.html and carts) with a hash of its
# contents in sw.js, which downloads them all once the site is installed as an app. Run it again whenever any of
# those files change: the new hashes make browsers pick up the new service worker and refetch just what changed.
set -e
cd "$(dirname "$(realpath "$0")")/.."
list=$(
  {
    ls *.html js/*.js manifest.webmanifest assets/* pico8/*.html pico8/*.js
    ls games/*/meta.html games/*/*.p8.png
  } | sort | xargs md5sum | awk '{ printf "  \"%s\": \"%s\",\n", $2, substr($1, 1, 8) }'
)
version=$(echo "$list" | md5sum | cut -c1-8)
tmp=$(mktemp)
awk -v list="$list" -v version="$version" '
  /^\/\/ precache:start/ { print; print "let version = \"tinyfun-" version "\""; print "let files = {"; print list; print "}"; skip = 1; next }
  /^\/\/ precache:end/ { skip = 0 }
  !skip
' sw.js > "$tmp"
mv "$tmp" sw.js
echo "sw.js lists $(echo "$list" | wc -l) files (version $version)"
