// Writes review PNGs to screenshots/. Not compared against anything: macOS and Linux render fonts differently.
const fs = require('node:fs');
const path = require('node:path');
const { root, pages, inks, stocks, launch, setTheme, ready } = require('./browser-lib.cjs');

const out = path.join(root, 'screenshots');
const MAX = 1600;
const files = [];

// Splits a tall region into slices so no image passes MAX.
async function shoot(page, name, box) {
  const parts = Math.max(1, Math.ceil(box.height / MAX));
  for (let i = 0; i < parts; i++) {
    const y = box.y + i * MAX, height = Math.min(MAX, box.y + box.height - y);
    const file = `${name}${parts > 1 ? `-${i + 1}` : ''}.png`;
    await page.screenshot({ path: path.join(out, file), fullPage: true, clip: { x: box.x, y, width: box.width, height } });
    files.push(file);
  }
}

const absBox = el => el.evaluate(e => { const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; });

async function catalogueVariant(browser, variant, { theme = {}, media } = {}) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  if (media) await page.emulateMedia(media);
  await page.goto(pages.catalogue);
  await ready(page);
  await setTheme(page, theme);
  for (const el of await page.locator('#preview > header, #preview .catalogue-section').all()) {
    const id = await el.evaluate(e => e.id || 'header');
    await shoot(page, `${variant}--${id}`, await absBox(el));
  }
  return page;
}

(async () => {
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  const browser = await launch();

  const variants = [
    ['default', {}],
    ...inks.map(i => [`inks-${i}`, { theme: { ink: i } }]),
    ...stocks.map(s => [`stock-${s}`, { theme: { stock: s } }]),
    ['forced-colors', { media: { forcedColors: 'active' } }],
    ['contrast-more', { media: { contrast: 'more' } }],
    ['print', { media: { media: 'print' } }],
  ];
  for (const [name, opts] of variants) await (await catalogueVariant(browser, name, opts)).close();

  const page = await catalogueVariant(browser, 'default', {});
  const viewport = { x: 0, y: 0 };
  // Overlays are shot at viewport size; the page keeps its scroll position.
  await page.locator('#demo-dialog').evaluate(d => d.showModal());
  await page.screenshot({ path: path.join(out, 'default--dialog.png') });
  files.push('default--dialog.png');
  await page.locator('#demo-dialog').evaluate(d => d.close());
  await page.locator('[popovertarget="demo-popover"]').scrollIntoViewIfNeeded();
  await page.locator('#demo-popover').evaluate(p => p.showPopover());
  await page.screenshot({ path: path.join(out, 'default--popover.png') });
  files.push('default--popover.png');
  await page.close();

  for (const name of Object.keys(pages)) {
    const mobile = await browser.newPage({ viewport: { width: 360, height: 800 } });
    await mobile.goto(pages[name]);
    await ready(mobile);
    const size = await mobile.evaluate(() => ({ width: document.documentElement.clientWidth, height: document.documentElement.scrollHeight }));
    await shoot(mobile, `mobile-360--${name}`, { ...viewport, ...size });
    await mobile.close();
  }

  await browser.close();
  console.log(files.join('\n'));
  console.log(`\n${files.length} files in ${out}`);
})();
