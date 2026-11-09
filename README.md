# Jackdaw

Jackdaw is a CSS design system with a two-ink print palette, design tokens, and bar and legend components. It works with plain HTML or a framework that supports CSS imports. It does not require JavaScript or React.

## Install

Install from npm:

```sh
npm install jackdaw-css
```

Import the stylesheet before your own styles:

```js
import "jackdaw-css/index.css";
import "./styles.css";
```

For plain HTML, copy `jackdaw.css` from a release into your project and link it. It is the same stylesheet in one file, so the browser makes one request.

```html
<link rel="stylesheet" href="/css/jackdaw.css">
<link rel="stylesheet" href="/css/styles.css">
```

Use `index.css` with a bundler that resolves `@import`. Linking it directly from HTML loads its imports one after another.

Jackdaw names Funnel Display, Funnel Sans, and JetBrains Mono in its font tokens but does not load them. Install and load those fonts separately or override the font tokens.

## React

Jackdaw works with React using the same stylesheet and HTML classes. Import the CSS once, then use `className`, for example `<button className="jd-button jd-button--primary">Save</button>`. Jackdaw does not provide React components or manage state.

## Tokens and overrides

The tokens include colours (`--jd-ground`, `--jd-paper`, `--jd-ink-print`, `--jd-ink-accent`, `--jd-text`, `--jd-text-muted`), spacing (`--jd-s-1` through `--jd-s-6`), font stacks, widths, and bar colours. See [tokens.css](tokens.css) for the full list and defaults.

Jackdaw uses the `jackdaw.tokens`, `jackdaw.base`, and `jackdaw.components` cascade layers. Normal unlayered declarations in your stylesheet override normal declarations in those layers. For example:

```css
:root {
  --jd-ink-print: #203b8c;
  --jd-font-body: Georgia, serif;
}
```

The old unprefixed names (`--ultra`, `--ink`, `--s-2` and so on) still resolve through [legacy.css](legacy.css) until 1.0. Overrides must use the new `--jd-*` names, because an override of an old name does not change the new one.

Put `jd-scope` on an element where you override an ink token for a subtree, so the derived tokens (rules, ranks, hatches, edges, focus colour) recompute there. The old unprefixed aliases do not follow scopes.

Jackdaw is light-only by default and sets `color-scheme: light` on `:root`.

## Ink pairs and paper stocks

A theme is two inks and a paper stock. Set one pair class and one stock class on any element, such as `<html>` or a section. They also work with `jd-scope`.

- Pairs: `jd-inks-federal` (federal blue, fluorescent orange), `jd-inks-burgundy` (burgundy, yellow), `jd-inks-forest` (forest green, fluorescent pink). The default is ultramarine and lime.
- Stocks: `jd-stock-newsprint` and `jd-stock-cream`. The default is pale blue. There is no dark stock.

```html
<body class="jd-inks-burgundy jd-stock-cream">
```

For your own pair, set `--jd-ink-print`, `--jd-ink-print-deep` and `--jd-ink-accent` on a `jd-scope` element. Keep print ink at 4.5:1 or better on ground and paper, and `--jd-text` at 4.5:1 on the accent. `node tests/contrast.cjs` checks every shipped pair on every stock.

## Typography and tags

Use `jd-kicker` for a short section label. Use `jd-headline`, `jd-heading`, and `jd-title` for visual hierarchy on the appropriate heading element. `jd-prose` sets a reading measure and body type; `jd-code` applies the mono font. `jd-tag` styles a short label.

```html
<h1 class="jd-headline">A page title</h1>
<p class="jd-prose">A reading column with a <a class="jd-link" href="/about">link</a>.</p>
<span class="jd-tag">Research</span>
```

## Text roles

Use `jd-note` for a muted note and `jd-meta` for a metadata paragraph. For smaller text without paragraph spacing, use `jd-small` (0.85rem), `jd-secondary` (0.9rem), or `jd-muted` (0.95rem).

## Layout

`jd-container` provides a centred wide container; add `jd-container--reading` for the reading measure. `jd-stack`, `jd-cluster` and `jd-grid` arrange children with a token-based gap. Override `--jd-gap` on the container and `--jd-column` on a grid when needed. `jd-section` adds vertical section spacing, `jd-rule` provides a major divider and `jd-sr-only` visually hides text while keeping it available to assistive technology.

```html
<div class="jd-container"><div class="jd-grid"><article>One</article><article>Two</article></div></div>
```

## Ruled rows

Add `jd-ruled` to a container to draw a rule above each direct child. Add `jd-ruled--closed` for a bottom rule. Use `jd-ruled-row` for a single row. Set padding and layout in your own CSS.

```html
<ul class="jd-ruled jd-ruled--closed">
  <li>First row</li>
  <li>Second row</li>
</ul>
```

## Navigation

Use `jd-nav` on a navigation landmark and `aria-current="page"` on the current link. `jd-breadcrumbs` styles an ordered list inside a labelled navigation landmark. `jd-pagination` styles page links; label the landmark and individual links, and mark the current page. `jd-skip` styles a skip link pointing to the main content.

## Controls and forms

Use `jd-button--primary` for the single primary action on a screen. The default `jd-button` is secondary. Use native buttons for actions and links for navigation. Disabled buttons use the native `disabled` attribute.

```html
<button class="jd-button jd-button--primary" type="submit">Save</button>
<a class="jd-button" href="/">Cancel</a>
```

Use `jd-field` to group a label, hint, input and error. Connect hints and errors with `aria-describedby`; set `aria-invalid="true"` when a field has an error. The error must describe the problem in text. `jd-input` works on inputs, selects and textareas. For checkboxes and radios, use `jd-choice` and `jd-check`.

```html
<div class="jd-field">
  <label class="jd-label" for="email">Email</label>
  <input class="jd-input" id="email" type="email" aria-invalid="true" aria-describedby="email-error">
  <p class="jd-error" id="email-error">Enter a valid email address.</p>
</div>
<label class="jd-choice"><input class="jd-check" type="checkbox"> Send me updates</label>
```

These styles are opt-in. They do not reset browser styles or load fonts. Applications own validation, form behaviour and disabled links.

`jd-check` also styles `input[type="radio"]`. Group radios in a `fieldset` with a `legend`.

```html
<fieldset>
  <legend class="jd-label">Format</legend>
  <label class="jd-choice"><input class="jd-check" type="radio" name="format" checked> Email</label>
  <label class="jd-choice"><input class="jd-check" type="radio" name="format"> Post</label>
</fieldset>
```

`jd-switch` turns a native checkbox into a switch. On is a filled track with the knob at the inline end; off is a paper track with the knob at the inline start. It needs `role="switch"` and a visible label. The application owns the state.

```html
<label class="jd-choice"><input class="jd-switch" type="checkbox" role="switch"> Show footnotes</label>
```

`select.jd-input` draws a print-ink chevron in place of the browser arrow. The chevron mirrors under `dir="rtl"`. Forced colours restore the native arrow.

## Chips and actions

`jd-chip` is a small outlined label. On a link or button it fills with paper on hover and underlines. `jd-copy` is the small button style for a copy action. It has no script: the application copies the text and announces the result. Give the button a name that says what it copies, such as `aria-label="Copy install command"`.

`jd-action-strip` is an accent-ink band that holds the one primary action. Do not add a second primary button elsewhere on the screen.

```html
<a class="jd-chip" href="/tags/printing">Printing</a>
<button class="jd-copy" type="button" aria-label="Copy install command">Copy</button>
<div class="jd-action-strip">
  <p>Issue 02 goes out on Friday.</p>
  <a class="jd-button jd-button--primary" href="/subscribe">Get the next issue</a>
</div>
```

## Feedback

`jd-notice` is an in-flow message; add `jd-notice--success` or `jd-notice--error` and include a descriptive title. Use a live region only when an application needs to announce a dynamic update. `jd-status` and `jd-status--pending` display short text labels. `jd-empty` frames an empty state. The application owns announcements and dismissal behaviour.

`progress.jd-progress` and `meter.jd-meter` match `jd-bar`: a tinted track with a print-ink fill. Give each a label, through `<label for>` or `aria-label`, and write the value in text nearby. A meter shows a middling value with a fine hatch and a low value with a coarse hatch, not a different hue.

```html
<label for="proofs">Proofs checked: 14 of 20</label>
<progress class="jd-progress" id="proofs" max="20" value="14">70%</progress>
```

## Disclosures

Use `jd-disclosure` on a native `details` element. Add `jd-disclosure--marked` and `jd-disclosure__label` for a plus or minus indicator in place of the browser marker. The browser controls keyboard interaction and the open state.

```html
<details class="jd-disclosure jd-disclosure--marked">
  <summary><span class="jd-disclosure__label">Details</span></summary>
  <p>More information.</p>
</details>
```

## Overlays

`dialog.jd-dialog` is a paper panel with a print-ink edge and a dimmed backdrop. Use `jd-dialog__title` for the heading and `jd-dialog__actions` for the buttons. The dialog needs an accessible name, through `aria-labelledby` or `aria-label`. The application calls `showModal()`; a `form method="dialog"` closes it without script.

```html
<dialog class="jd-dialog" aria-labelledby="discard-title">
  <form method="dialog">
    <h2 class="jd-dialog__title" id="discard-title">Discard this draft?</h2>
    <p>You cannot undo this.</p>
    <div class="jd-dialog__actions">
      <button class="jd-button" value="keep">Keep editing</button>
      <button class="jd-button jd-button--primary" value="discard">Discard</button>
    </div>
  </form>
</dialog>
```

`[popover].jd-popover` is a small paper panel with a print-ink edge. Open it with `popovertarget` on a button. Jackdaw does not position it.

```html
<button class="jd-button" popovertarget="help">Help</button>
<div popover class="jd-popover" id="help">Short help text.</div>
```

Jackdaw has no tabs, menus, tooltips or toasts, because they need script to be accessible.

## Tables

Wrap a `jd-table` in `jd-table-wrap` for horizontal scrolling on narrow screens. Provide a caption and scoped headers. Use `jd-table__number` for end-aligned numeric cells and `jd-table--compact` for denser rows. Give the wrapper an accessible name and keyboard focus when it can scroll.

## Bars and legends

A filled bar uses percentage values in `--v`. Give it an accessible label, or provide equivalent text nearby.

```html
<div class="jd-bar" role="img" aria-label="40 of 100; target 75">
  <span class="jd-bar__fill" style="--v: 40%"></span>
  <span class="jd-bar__mark" style="--v: 75%"></span>
</div>
<ul class="jd-legend">
  <li><span class="jd-swatch"></span> Current: 40</li>
  <li><span class="jd-swatch jd-swatch--mark"></span> Target: 75</li>
</ul>
```

Add `jd-bar__fill--under` to an earlier fill to show a second value behind the main fill. Use `jd-swatch--under` for its legend entry.

For segments, set the bar's `--v` to its width as a percentage and each segment's `--v` to a number. Put the same `data-rank` on each segment and its swatch. Supported ranks are `0`, `1`, `2`, and `rest`; `jd-tone--oppose` and `jd-tone--support` select the colour ramp. The legend supplies the values for the bar hidden from assistive technology.

```html
<div class="jd-tone--oppose">
  <div class="jd-bar jd-bar--segmented" style="--v: 80%" aria-hidden="true">
    <span class="jd-bar__segment" data-rank="0" style="--v: 60"></span>
    <span class="jd-bar__segment" data-rank="1" style="--v: 40"></span>
  </div>
  <ul class="jd-legend">
    <li><span class="jd-swatch" data-rank="0"></span> First: 60</li>
    <li><span class="jd-swatch" data-rank="1"></span> Second: 40</li>
  </ul>
</div>
```

Open [specimen.html](specimen.html) from a checkout to see the components. It is not included in the npm package.

## Code

`pre.jd-codeblock` is a paper block with horizontal scroll. A block that can scroll must have `tabindex="0"` and an accessible name, so keyboard users can reach it. Wrap it in a `figure.jd-codeblock-figure` with a `figcaption.jd-codeblock__caption` first for a caption bar in print ink. `kbd.jd-kbd` styles a key.

```html
<figure class="jd-codeblock-figure">
  <figcaption class="jd-codeblock__caption">styles.css</figcaption>
  <pre class="jd-codeblock" tabindex="0" aria-label="styles.css"><code>@import "jackdaw-css/index.css";</code></pre>
</figure>
<p>Press <kbd class="jd-kbd">Ctrl</kbd> + <kbd class="jd-kbd">P</kbd>.</p>
```

## Editorial

`figure.jd-figure` puts a ruled caption in muted small text under an image. Give the image `alt` text. `blockquote.jd-quote` sets a print-ink rule on the inline-start edge; put the source in a `footer` or `cite`. `jd-pullquote` sets one line from the text in large display type. It repeats the body, so add `aria-hidden="true"` to it.

```html
<figure class="jd-figure">
  <img src="press.jpg" alt="A two-colour press in use">
  <figcaption>Fig. 1. The press mid-run.</figcaption>
</figure>
<blockquote class="jd-quote">
  <p>A good page decides what matters.</p>
  <footer><cite>Fieldnotes style guide</cite></footer>
</blockquote>
<p class="jd-pullquote" aria-hidden="true">Set what matters in the heavier ink.</p>
```

Footnotes use a link and a list. Put `jd-footnote-ref` on the link in the text and `jd-footnotes` on the `ol` at the end. The link needs an accessible name that says more than the number, such as `aria-label="Footnote 1"`, and each note links back. The target note takes a fill and an edge.

```html
<p>The run was short<a class="jd-footnote-ref" id="fnref-1" href="#fn-1" aria-label="Footnote 1">1</a>.</p>
<ol class="jd-footnotes">
  <li id="fn-1">Four hundred sheets. <a href="#fnref-1" aria-label="Back to footnote 1 in the text">Back</a></li>
</ol>
```

`jd-card` is a paper surface with a print-ink edge and padding. Use `jd-card__title` on the heading inside it. It combines with `jd-paper-sheet` for an offset shadow and with `jd-crop` for crop marks.

```html
<article class="jd-card jd-paper-sheet">
  <h3 class="jd-card__title">Setting type</h3>
  <p>Choose the heading level, then the visual class.</p>
</article>
```

## Print effects

All are opt-in. See the catalogue for each one.

- `jd-mark` on `<mark>`: accent highlight that multiplies over what is beneath it.
- `jd-overprint`: `mix-blend-mode: multiply`, so two overlapping inked shapes make a third colour.
- `jd-halftone`: dot surface. `jd-bar__fill--halftone` and `jd-swatch--halftone` give a bar a third series. Dot scale is `--jd-halftone-size`.
- `jd-inked`: the ink mask on any solid block. `jd-ink` still styles heading text.
- `jd-crop`: crop marks outside the four corners. Needs room around the block.
- `jd-perforation`: an `<hr>` drawn as a tear line.
- `jd-tag--stamp`: a rubber-stamp tag.
- `--jd-press`: the step timing on the primary button. It is off under `prefers-reduced-motion: reduce`.

```html
<p>Check the <mark class="jd-mark">new total</mark>.</p>
<hr class="jd-perforation">
<span class="jd-tag jd-tag--stamp">Approved</span>
```

## Paper and ink texture

Use `jd-paper-ground` on a page or section for a subtle paper grain, and `jd-paper-sheet` on a surface for a small offset shadow. Both are opt-in.

## Ink texture

Wrap heading text in an inline element with `jd-ink` to apply the ink mask and misregistered lime shadow.

```html
<h1><span class="jd-ink">A heading</span></h1>
```

## Printing

`print.css` (in `index.css` and `jackdaw.css`) prints on white with black text and no grain or offset shadows. Bars, segments, swatches, status dots and the primary button keep their fills. The skip link and pagination are hidden, external links in `jd-prose` show their URL, and notices, table rows, figures and bars avoid page breaks. Table headers repeat. Code blocks wrap instead of scrolling, copy buttons are hidden, and quotes, cards, footnotes and dialogs avoid page breaks.

## Accessibility

- State and rank never rely on hue alone. Fills, edges, hatches and text carry them.
- `forced-colors.css` (part of `index.css` and `jackdaw.css`) redraws bars, legends, status dots, rank segments, the current page, the primary button, the skip link, invalid inputs, paper sheets, switches, progress and meter fills, caption bars and the action strip in system colours under `forced-colors: active`.
- Components use logical properties and mirror under `dir="rtl"`. Deliberate print offsets (button shadow, paper shadow, ink shadow, hatch angle) do not mirror.
- `prefers-contrast: more` makes `--jd-rule` solid ink and `--jd-text-muted` equal to `--jd-text`.

## Visual catalogue

Open [catalogue.html](catalogue.html) to inspect all shared components and adjust the colour, spacing, radius, body size and preview width. You can copy the current preview settings. Changes are temporary and do not edit source files. The package includes the catalogue and preview fonts. Applications load their own fonts. After changing the package CSS, run `python3 scripts/build-catalogue.py` to regenerate the catalogue from the current styles and template.

## Example page

Open [Fieldnotes](examples/fieldnotes.html) from a checkout for a complete, responsive page using Jackdaw. Its content is fictional and its subscription form is disabled. The example is not included in the package.

Read [DESIGN.md](DESIGN.md) for the shared design principles and [the Corvus design document](docs/corvus-design.md) for the blog-specific application.

## Versioning

Jackdaw uses semantic version tags. Renaming or removing a token or class is a major change. Pin a tag and review changes before upgrading.

## Licence

[MIT](LICENSE).
