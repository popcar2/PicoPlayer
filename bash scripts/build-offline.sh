#!/bin/sh
# List every file the site needs (pages, assets, the player and each game's meta.html and carts) with a hash of its
# contents in sw.js, which downloads them all once the site is installed as an app. Run it again whenever any of
# those files change: the new hashes make browsers pick up the new service worker and refetch just what changed.
set -e
cd "$(dirname "$(realpath "$0")")/.."

# stamp each page's stylesheets and scripts with ?v=<hash of the file> too. without it, a browser that fetches a new page
# can still use its cached copy of an old style.css (GitHub Pages lets them keep it for 10 minutes), leaving new markup
# unstyled. done first, since it changes the pages' own hashes
for ref in $(grep -ohE '(href|src)="(assets/[^"?]*\.css|js/[^"?]*\.js)' *.html | cut -d'"' -f2 | sort -u); do
  v=$(md5sum "$ref" | cut -c1-8)
  sed -i -E "s#((href|src)=\"$ref)(\?v=[0-9a-f]*)?\"#\1?v=$v\"#g" *.html
done

list=$(
  {
    ls *.html js/*.js manifest.webmanifest assets/* pico8/*.html pico8/*.js
    ls games/*/meta.html games/*/*.p8.rom
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
