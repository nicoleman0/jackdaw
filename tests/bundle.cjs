const assert = require('node:assert/strict');
const fs = require('node:fs');

const order = '@layer jackdaw.tokens, jackdaw.base, jackdaw.components;';
const index = fs.readFileSync('index.css', 'utf8');
const files = [...index.matchAll(/@import "\.\/([^" ]+)";/g)].map(match => match[1]);
assert.ok(files.length > 0, 'index.css lists no imports');
const expected = order + '\n' + files.map(name => fs.readFileSync(name, 'utf8')).join('\n');

assert.ok(fs.existsSync('jackdaw.css'), 'jackdaw.css is missing; run scripts/build-catalogue.py');
const bundle = fs.readFileSync('jackdaw.css', 'utf8');
const css = bundle.replace(/^\/\*[^\n]*\*\/\n/, '');
assert.doesNotMatch(bundle, /@import/);
assert.ok(css.startsWith(order + '\n'), 'bundle must start with the layer order');
assert.equal(css, expected, 'jackdaw.css is stale; run scripts/build-catalogue.py');
console.log('Bundle is current and import-free');
