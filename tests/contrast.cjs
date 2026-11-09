const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = name => fs.readFileSync(name, 'utf8');
const hex = '(#[0-9a-f]{6})\\b';
const token = (css, name) => css.match(new RegExp('--' + name + ':\\s*' + hex, 'i'))?.[1];
function luminance(value) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(value.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const tokens = read('tokens.css'), inks = read('inks.css');
const need = (css, names, where) => Object.fromEntries(names.map(name => {
  const value = token(css, name);
  assert.ok(value, `${where} lacks a 6-digit hex for --${name}`);
  return [name, value.toLowerCase()];
}));
const rules = (prefix) => [...inks.matchAll(new RegExp('\\.jd-' + prefix + '-([a-z]+)\\s*\\{([^}]*)\\}', 'g'))].map(m => [m[1], m[2]]);

const text = need(tokens, ['jd-text', 'jd-text-muted'], 'tokens.css');
const pairs = [['ultramarine (default)', need(tokens, ['jd-ink-print', 'jd-ink-print-deep', 'jd-ink-accent'], 'tokens.css')]]
  .concat(rules('inks').map(([name, body]) => [name, need(body, ['jd-ink-print', 'jd-ink-print-deep', 'jd-ink-accent'], 'inks.css ' + name)]));
const stocks = [['default', need(tokens, ['jd-ground', 'jd-paper'], 'tokens.css')]]
  .concat(rules('stock').map(([name, body]) => [name, need(body, ['jd-ground', 'jd-ground-deep', 'jd-paper'], 'inks.css ' + name)]));
assert.ok(pairs.length >= 4 && stocks.length >= 3, 'expected the default plus three ink pairs and two stocks');

const checks = [
  ['print/ground', p => p.print, s => s.ground, 4.5],
  ['print/paper', p => p.print, s => s.paper, 4.5],
  ['deep/ground', p => p.deep, s => s.ground, 4.5],
  ['text/accent', () => text['jd-text'], (s, p) => p.accent, 4.5],
  ['muted/ground', () => text['jd-text-muted'], s => s.ground, 4.5],
  ['paper/print', (p, s) => s.paper, (s, p) => p.print, 4.5],
  ['text/paper', () => text['jd-text'], s => s.paper, 4.5],
  ['muted/paper', () => text['jd-text-muted'], s => s.paper, 4.5],
];
const rows = [];
for (const [pairName, p] of pairs) for (const [stockName, s] of stocks) {
  const pair = { print: p['jd-ink-print'], deep: p['jd-ink-print-deep'], accent: p['jd-ink-accent'] };
  const stock = { ground: s['jd-ground'], paper: s['jd-paper'] };
  const row = { pair: pairName, stock: stockName };
  for (const [label, fg, bg, min] of checks) {
    const value = ratio(fg(pair, stock), bg(stock, pair));
    row[label] = value.toFixed(2);
    assert.ok(value >= min, `${pairName} on ${stockName}: ${label} is ${value.toFixed(2)}, needs ${min}`);
  }
  assert.ok(ratio(pair.print, stock.ground) >= 3, `${pairName} on ${stockName}: print ink under 3:1 on ground`);
  rows.push(row);
}
console.table(rows);
console.log(`Contrast passed for ${rows.length} pair and stock combinations`);
