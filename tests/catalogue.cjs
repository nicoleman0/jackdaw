const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('catalogue.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
function element(key, type = 'range') {
  return { dataset: key ? { key } : {}, type, style: { setProperty(name, value) { this[name] = value; } }, addEventListener(name, handler) { this[name] = handler; } };
}
const controls = ['ground', 'paper', 'ultra', 'lime', 'ink', 'muted', 'spacing', 'radius', 'body', 'width'].map(key => element(key, ['ground', 'paper', 'ultra', 'lime', 'ink', 'muted'].includes(key) ? 'color' : 'range'));
const outputs = ['spacing', 'radius', 'body', 'width'].map(key => ({ dataset: { output: key } }));
const ids = Object.fromEntries(['preview', 'frame', 'prompt', 'preset', 'reset', 'copy', 'copy-status'].map(id => [id, element()]));
const document = { querySelector(selector) { return ids[selector.slice(1)]; }, querySelectorAll(selector) { return selector === '[data-key]' ? controls : outputs; } };
vm.runInNewContext(script, { document, navigator: { clipboard: { writeText: async () => {} } } });
assert.match(ids.prompt.value, /Body size: 17px/);
const spacing = controls.find(control => control.dataset.key === 'spacing');
spacing.value = '1.25'; spacing.input();
assert.equal(ids.preview.style['--s-2'], '1.25rem');
assert.match(ids.prompt.value, /Spacing: 1.25×/);
const width = controls.find(control => control.dataset.key === 'width');
width.value = '800'; width.input();
assert.match(ids.prompt.value, /Preview width: 800px/);
ids.preset.change({ target: { value: 'warm' } });
assert.equal(ids.preview.style['--ground'], '#f4f0e7');
assert.match(ids.prompt.value, /Ground: #f4f0e7/);
ids.reset.click();
assert.equal(ids.preview.style['--ground'], '#eef0f9');
assert.match(ids.prompt.value, /Ground: #eef0f9/);
console.log('Catalogue controls and reset passed');
