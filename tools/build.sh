#!/bin/sh
# Rebuild everything generated from js/content.js. Run after every content change:
#
#   sh tools/build.sh
#
# 1. index.html, stress-prediction.html — the drawn page text is saved into the
#    HTML, so search engines, Claude and other tools that don't run JavaScript
#    can read the site. (Visitors still get the live, script-drawn page.)
# 2. assets/cv/cv.pdf — printed from tools/cv-print.html.
set -e
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8765
TMP=$(mktemp -d)

python3 -m http.server $PORT >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null; rm -rf "$TMP"' EXIT
sleep 1

# perl alarm = timeout (macOS has no `timeout` command)
run_chrome() { name=$1; shift; perl -e 'alarm 90; exec @ARGV' "$CHROME" --headless=new --disable-gpu --user-data-dir="$TMP/chrome-$name" "$@" 2>/dev/null; }

for page in index.html stress-prediction.html; do
  run_chrome "$page" --virtual-time-budget=6000 --dump-dom "http://localhost:$PORT/tools/prerender.html?page=$page" > "$TMP/$page.dom"
  python3 tools/prerender.py "$page" "$TMP/$page.dom"
done

run_chrome cv --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=assets/cv/cv.pdf "http://localhost:$PORT/tools/cv-print.html" >/dev/null
echo "cv: assets/cv/cv.pdf rebuilt"
