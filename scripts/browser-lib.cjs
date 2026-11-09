// Shared by tests/browser.cjs and scripts/screenshots.cjs; not shipped.
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const url = file => 'file://' + path.join(root, file);
const pages = { catalogue: url('catalogue.html'), fieldnotes: url('examples/fieldnotes.html') };
const inks = ['federal', 'burgundy', 'forest'];
const stocks = ['newsprint', 'cream'];

async function launch() { return chromium.launch(); }

// Drives the catalogue's own selects so the page script runs as a visitor would run it.
async function setTheme(page, { ink = '', stock = '' } = {}) {
  await page.selectOption('#inks', ink);
  await page.selectOption('#stock', stock);
}

async function ready(page) { await page.evaluate(() => document.fonts.ready); }

module.exports = { root, pages, inks, stocks, launch, setTheme, ready };
