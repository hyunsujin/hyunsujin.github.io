"""Save the drawn page text into an HTML file (see tools/build.sh).

usage: python3 tools/prerender.py <page.html> <dumped-dom-file>

Each container is filled between <!--pre--> and <!--/pre--> markers, so the
step can be re-run any number of times.
"""
import html
import json
import re
import sys

page, dump = sys.argv[1], sys.argv[2]
m = re.search(r'<pre id="out">(.*?)</pre>', open(dump, encoding="utf-8").read(), re.S)
if not m or not m.group(1).strip():
    sys.exit(f"prerender: nothing captured for {page}")
parts = json.loads(html.unescape(m.group(1)))

src = open(page, encoding="utf-8").read()
for cid, inner in parts.items():
    if not inner:
        sys.exit(f"prerender: #{cid} is empty in {page}")
    block = f"<!--pre-->{inner}<!--/pre-->"
    marked = re.compile(r'(\bid="%s"[^>]*>)<!--pre-->.*?<!--/pre-->' % re.escape(cid), re.S)
    empty = re.compile(r'(\bid="%s"[^>]*>)(?=</)' % re.escape(cid))
    if marked.search(src):
        src = marked.sub(lambda mm: mm.group(1) + block, src, count=1)
    elif empty.search(src):
        src = empty.sub(lambda mm: mm.group(1) + block, src, count=1)
    else:
        sys.exit(f"prerender: container #{cid} not found in {page}")
open(page, "w", encoding="utf-8").write(src)
print(f"prerender: {page} — {len(parts)} containers saved")
