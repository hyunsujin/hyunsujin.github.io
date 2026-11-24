# Portfolio site — working rules

Static site (GitHub Pages, no build step for visitors). All content lives in
`js/content.js` (English) and `js/content.ko.js` (Korean, same structure,
lists line up by position).

## After every content change — always

Run the build before committing:

    sh tools/build.sh

It regenerates the files made from `js/content.js`:
- `index.html`, `stress-prediction.html`: the drawn page text is saved between
  `<!--pre-->` markers so search engines, Claude and other non-JavaScript
  readers can read the site. Never edit inside those markers by hand.
- `assets/cv/cv.pdf`: printed from `tools/cv-print.html`.

When adding a new page or a new top-level container, add it to
`CONTAINERS` in `tools/prerender.html`.

## Publishing

Commit, then `GIT_TERMINAL_PROMPT=0 git push origin main`. Pages rebuilds in
about a minute; check with `curl` (add `?n=$RANDOM` to skip the cache).

## The owner

Sujin Hyun writes in Korean and is not a developer: reply in Korean with
click-by-click steps. Don't invent facts (titles, names, roles) — ask.
