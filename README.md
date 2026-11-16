# A2Drew

Visit [a2drew.com](https://a2drew.com).

The landing page is an interactive, rotating text circle. Drag and throw it;
wall bounces cycle the background color. Touch supports dragging and pinch
resizing. Squeezing it deeply against an edge pops it; tap the background to
bring it back. Keyboard users can focus the circle and use arrow keys or Space.
Reduced motion disables automatic falling and rotation.

The upper-right **click me** button opens the portfolio at `/#site`.
Existing fragment links (`/#work`, `/#music`, etc.) open the portfolio directly.
Browser Back returns from `/#site` to the landing page.

The polished version lives in `src/App.js` and `src/App.css`. The November 11
layout is preserved byte-for-byte in `src/classic/` and remains available at
`/?version=classic#site`. The footer links to it. The source and production
build before the November 16 polish are also saved on the branches
`archive/before-polish-2026-11-16` and `archive/live-before-polish-2026-11-16`.

Run locally with `npm ci` then `npm start`. `npm run build` creates the static
production files. `npm run deploy` builds and publishes to the `gh-pages`
branch used by GitHub Pages, including the custom-domain `public/CNAME` file.
