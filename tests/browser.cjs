// Real-browser checks. Run `npx playwright install chromium` once first.
const fs = require('node:fs');
const path = require('node:path');
const { pages, inks, stocks, launch, setTheme, ready } = require('../scripts/browser-lib.cjs');

const axeSource = fs.readFileSync(path.join(path.dirname(require.resolve('axe-core')), 'axe.min.js'), 'utf8');
const results = [];
const group = (name, fn) => ({ name, fn });

async function open(browser, name, { width = 1280, height = 900, media } = {}) {
  const page = await browser.newPage({ viewport: { width, height } });
  const problems = [];
  page.on('console', m => { if (m.type() === 'error') problems.push(`console error: ${m.text()}`); });
  page.on('pageerror', e => problems.push(`page error: ${e.message}`));
  page.on('requestfailed', r => problems.push(`request failed: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response', r => { if (r.status() >= 400) problems.push(`HTTP ${r.status()}: ${r.url()}`); });
  if (media) await page.emulateMedia(media);
  await page.goto(pages[name]);
  await ready(page);
  page.problems = problems;
  return page;
}

const groups = [
  group('1. No console errors or failed requests on load', async (browser, fail) => {
    for (const name of Object.keys(pages)) {
      const page = await open(browser, name);
      page.problems.forEach(p => fail(`${name}: ${p}`));
      await page.close();
    }
  }),

  group('2. axe-core WCAG 2.1 A and AA, no violations', async (browser, fail) => {
    const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
    async function scan(page, label) {
      await page.addScriptTag({ content: axeSource });
      const { violations } = await page.evaluate(tags => axe.run(document, { runOnly: { type: 'tag', values: tags } }), tags);
      for (const v of violations) for (const n of v.nodes) fail(`${label}: ${v.id} at ${n.target.join(' ')}: ${(n.failureSummary || v.help).replace(/\s+/g, ' ')}`);
    }
    const cat = await open(browser, 'catalogue');
    await scan(cat, 'catalogue default');
    for (const ink of inks) { await setTheme(cat, { ink }); await scan(cat, `catalogue jd-inks-${ink}`); }
    await setTheme(cat);
    for (const stock of stocks) { await setTheme(cat, { stock }); await scan(cat, `catalogue jd-stock-${stock}`); }
    await cat.close();
    const field = await open(browser, 'fieldnotes');
    await scan(field, 'fieldnotes default');
    await field.close();
  }),

  group('3. Forced colours render each state distinctly', async (browser, fail) => {
    const page = await open(browser, 'catalogue', { media: { forcedColors: 'active' } });
    const sel = {
      'bar fill': '#data .jd-bar:not(.jd-bar--segmented) > .jd-bar__fill:not(.jd-bar__fill--under):not(.jd-bar__fill--halftone)',
      'under fill': '#data .jd-bar__fill--under',
      'halftone fill': '#effects .jd-bar__fill--halftone',
      'rank 0': '.jd-tone--support .jd-bar__segment[data-rank="0"]',
      'rank 1': '.jd-tone--support .jd-bar__segment[data-rank="1"]',
      'rank 2': '.jd-tone--support .jd-bar__segment[data-rank="2"]',
      'rank rest': '.jd-tone--support .jd-bar__segment[data-rank="rest"]',
      'status filled': '.jd-status:not(.jd-status--pending)::before',
      'status pending': '.jd-status--pending::before',
      'primary button': '#actions .jd-button--primary',
      'secondary button': '#actions .jd-button:not(.jd-button--primary):not([disabled])',
      'switch on': '.jd-switch:checked',
      'switch off': '.jd-switch:not(:checked):not(:disabled)',
      'switch on thumb': '.jd-switch:checked::before',
      'switch off thumb': '.jd-switch:not(:checked):not(:disabled)::before',
      'pagination current': '.jd-pagination a[aria-current="page"]',
      'pagination other': '.jd-pagination a:not([aria-current])',
    };
    const sig = await page.evaluate(sel => {
      const out = {};
      for (const [k, s] of Object.entries(sel)) {
        const pseudo = s.match(/::before$/) ? '::before' : null;
        const el = document.querySelector(pseudo ? s.replace(/::before$/, '') : s);
        if (!el) { out[k] = null; continue; }
        const c = getComputedStyle(el, pseudo);
        out[k] = { bg: c.backgroundColor, bgImage: c.backgroundImage, color: c.color, outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, outlineWidth: c.outlineWidth, outlineStyle: c.outlineStyle, border: `${c.borderTopStyle} ${c.borderTopWidth} ${c.borderTopColor}` };
      }
      return out;
    }, sel);
    const clear = v => /^rgba\(.*, 0\)$|^transparent$/.test(v);
    const key = s => s && JSON.stringify([s.bg, s.bgImage, s.color, s.outline, s.border]);
    const visible = s => !clear(s.bg) || (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.bgImage !== 'none';
    for (const [k, s] of Object.entries(sig)) {
      if (!s) { fail(`${k}: element not found (${sel[k]})`); continue; }
      if (!['secondary button', 'switch on thumb', 'switch off thumb', 'pagination other'].includes(k) && !visible(s)) fail(`${k}: invisible (bg ${s.bg}, outline ${s.outline})`);
    }
    const distinct = (label, names) => {
      const present = names.filter(n => sig[n]);
      const seen = new Map();
      for (const n of present) { const k = key(sig[n]); if (seen.has(k)) fail(`${label}: "${n}" renders the same as "${seen.get(k)}" (${k})`); else seen.set(k, n); }
    };
    distinct('bar family', ['bar fill', 'under fill', 'halftone fill']);
    distinct('ranks', ['rank 0', 'rank 1', 'rank 2', 'rank rest']);
    distinct('status dots', ['status filled', 'status pending']);
    distinct('primary vs secondary button', ['primary button', 'secondary button']);
    distinct('switch on vs off', ['switch on', 'switch off']);
    distinct('switch thumb on vs off', ['switch on thumb', 'switch off thumb']);
    distinct('pagination current vs other', ['pagination current', 'pagination other']);
    await page.close();
  }),

  group('4. RTL: bar starts at the right, numbers align left', async (browser, fail) => {
    const page = await open(browser, 'catalogue');
    const m = await page.evaluate(() => {
      const rect = e => { const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width }; };
      const bar = document.querySelector('#rtl .jd-bar'), fill = bar.querySelector('.jd-bar__fill');
      const cs = getComputedStyle(bar);
      const td = document.querySelector('#rtl td.jd-table__number'), tcs = getComputedStyle(td);
      const range = document.createRange(); range.selectNodeContents(td);
      return { track: rect(bar), fill: rect(fill), trackBorder: [parseFloat(cs.borderLeftWidth), parseFloat(cs.borderRightWidth)], cell: rect(td), text: rect(range), padLeft: parseFloat(tcs.paddingLeft) + parseFloat(tcs.borderLeftWidth), padRight: parseFloat(tcs.paddingRight) + parseFloat(tcs.borderRightWidth) };
    });
    const eps = 1.5;
    const gapRight = m.track.right - m.trackBorder[1] - m.fill.right, gapLeft = m.fill.left - (m.track.left + m.trackBorder[0]);
    if (Math.abs(gapRight) > eps || gapLeft < eps) fail(`bar fill: expected flush with the track's right edge; gap right ${gapRight.toFixed(1)}px, gap left ${gapLeft.toFixed(1)}px (fill ${m.fill.left.toFixed(1)}-${m.fill.right.toFixed(1)}, track ${m.track.left.toFixed(1)}-${m.track.right.toFixed(1)})`);
    const textLeft = m.text.left - (m.cell.left + m.padLeft), textRight = (m.cell.right - m.padRight) - m.text.right;
    if (Math.abs(textLeft) > eps || textRight < eps) fail(`numeric cell: expected text at the left edge; offset from left ${textLeft.toFixed(1)}px, from right ${textRight.toFixed(1)}px`);
    await page.close();
  }),

  group('5. Scoped tokens follow an ink pair on a subtree', async (browser, fail) => {
    const page = await open(browser, 'catalogue');
    // Probes sit outside the preview; they must keep the root inks.
    await page.evaluate(() => {
      const probe = document.createElement('div'); probe.id = 'outside';
      probe.innerHTML = '<a class="jd-link" href="#">x</a><hr class="jd-rule"><div class="jd-tone--support"><span class="jd-bar__segment" data-rank="0">1</span></div>';
      document.body.append(probe);
    });
    const targets = {
      'jd-link': '.jd-link', 'jd-rule': '.jd-rule', 'rank segment': '.jd-tone--support [data-rank="0"]',
    };
    const read = () => page.evaluate(targets => {
      const props = ['color', 'borderTopColor', 'borderBottomColor', 'backgroundColor', 'backgroundImage', 'outlineColor', 'textDecorationColor'];
      const get = el => Object.fromEntries(props.map(p => [p, getComputedStyle(el)[p]]));
      const out = {};
      for (const [k, s] of Object.entries(targets)) { out['in ' + k] = get(document.querySelector('#preview ' + s)); out['out ' + k] = get(document.querySelector('#outside ' + s)); }
      return out;
    }, targets);
    const before = await read();
    await setTheme(page, { ink: 'forest' });
    const after = await read();
    for (const k of Object.keys(before)) {
      const changed = Object.keys(before[k]).filter(p => before[k][p] !== after[k][p]);
      if (k.startsWith('in ') && !changed.length) fail(`${k.slice(3)} inside preview: no colour property changed under jd-inks-forest (${JSON.stringify(after[k])})`);
      if (k.startsWith('out ') && changed.length) fail(`${k.slice(4)} outside preview: changed ${changed.join(', ')} under jd-inks-forest on the preview`);
    }
    await page.close();
  }),

  group('6. No horizontal scroll at 360px', async (browser, fail) => {
    for (const name of Object.keys(pages)) {
      const page = await open(browser, name, { width: 360, height: 800 });
      const r = await page.evaluate(() => {
        const de = document.documentElement, w = de.clientWidth;
        const wide = [...document.body.querySelectorAll('*')].filter(e => {
          const b = e.getBoundingClientRect();
          return b.width > 0 && b.right > w + 1 && !e.closest('.jd-table-wrap, pre') && !e.closest('[popover]:not(:popover-open), dialog:not([open])');
        }).slice(0, 8).map(e => `${e.tagName.toLowerCase()}${e.className ? '.' + String(e.className).trim().split(/\s+/).join('.') : ''} right=${Math.round(e.getBoundingClientRect().right)}`);
        return { scrollWidth: de.scrollWidth, clientWidth: w, wide };
      });
      if (r.scrollWidth > r.clientWidth) fail(`${name}: scrollWidth ${r.scrollWidth} > clientWidth ${r.clientWidth}; overflowing: ${r.wide.join('; ') || 'none found'}`);
      await page.close();
    }
  }),
];

(async () => {
  const browser = await launch();
  let failed = 0;
  for (const g of groups) {
    const msgs = [];
    try { await g.fn(browser, m => msgs.push(m)); } catch (e) { msgs.push(`threw: ${e.stack || e}`); }
    results.push(g.name);
    console.log(`${msgs.length ? 'FAIL' : 'PASS'}  ${g.name}`);
    msgs.forEach(m => console.log(`      - ${m}`));
    failed += msgs.length;
  }
  await browser.close();
  console.log(failed ? `\n${failed} problem(s)` : '\nbrowser checks passed');
  process.exit(failed ? 1 : 0);
})();
