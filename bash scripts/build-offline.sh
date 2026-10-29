#!/bin/sh
# List every file the site needs (pages, assets, the player and each game's meta.html, carts and data banks) with a hash of its
# contents in sw.js, which downloads them all once the site is installed as an app. Run it again whenever any of
# those files change: the new hashes make browsers pick up the new service worker and refetch just what changed.
set -e
cd "$(dirname "$(realpath "$0")")/.."

# copy each stylesheet into the pages' <style data-src="assets/<name>.css"> blocks, so the first render doesn't wait on a
# separate request for it. its url()s are relative to assets/, so they get that prefix. edit the .css files, not the
# copies: this replaces them. done first, since it changes the pages' own hashes
python3 -I - *.html <<'EOF'
import os, re, sys
def inline(m):
    css = open(m[1]).read()
    css = re.sub(r"""url\((["']?)(?![a-z]+:|[/#%])""", lambda u: "url(" + u[1] + os.path.dirname(m[1]) + "/", css)
    return f'<style data-src="{m[1]}">\n{css.rstrip()}\n{m[2]}</style>'
for page in sys.argv[1:]:
    html = open(page).read()
    new = re.sub(r'<style data-src="([^"]+)">.*?\n([ \t]*)</style>', inline, html, flags=re.S)
    if new != html: open(page, "w").write(new)
EOF

# stamp each page's scripts with ?v=<hash of the file> too. without it, a browser that fetches a new page can still use
# its cached copy of an old script (GitHub Pages lets them keep it for 10 minutes), which may not match the new markup
for ref in $(grep -ohE 'src="js/[^"?]*\.js' *.html | cut -d'"' -f2 | sort -u); do
  v=$(md5sum "$ref" | cut -c1-8)
  sed -i -E "s#((href|src)=\"$ref)(\?v=[0-9a-f]*)?\"#\1?v=$v\"#g" *.html
done

list=$(
  {
    ls *.html js/*.js manifest.webmanifest assets/* pico8/*.html pico8/*.js | grep -v '\.css$'  # the stylesheets are inlined into the pages
    ls games/*/meta.html games/*/*.p8.rom games/*/*.bin
  } | sort | xargs md5sum | awk '{ printf "  \"%s\": \"%s\",\n", $2, substr($1, 1, 8) }'
)
version=$(echo "$list" | md5sum | cut -c1-8)
tmp=$(mktemp)
awk -v list="$list" -v version="$version" '
  /^\/\/ precache:start/ { print; print "let version = \"picoplayer-" version "\""; print "let files = {"; print list; print "}"; skip = 1; next }
  /^\/\/ precache:end/ { skip = 0 }
  !skip
' sw.js > "$tmp"
mv "$tmp" sw.js
echo "sw.js lists $(echo "$list" | wc -l) files (version $version)"
