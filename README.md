# Jackdaw

Jackdaw is a CSS design system with a two-ink print palette, design tokens, and bar and legend components. It works with plain HTML or a framework that supports CSS imports. It does not require JavaScript or React.

## Install

Install a tagged release from GitHub:

```sh
npm install 'github:nicoleman0/jackdaw#v0.6.0'
```

Import the stylesheet before your own styles:

```js
import "jackdaw/index.css";
import "./styles.css";
```

For plain HTML, copy the CSS files from a release into your project and link `index.css`. Keep the files together because it imports the other stylesheets.

```html
<link rel="stylesheet" href="/css/jackdaw/index.css">
<link rel="stylesheet" href="/css/styles.css">
```

The package is private to prevent npm publication; the GitHub repository and tags are public. Jackdaw names Funnel Display, Funnel Sans, and JetBrains Mono in its font tokens but does not load them. Install and load those fonts separately or override the font tokens.

## Tokens and overrides

The tokens include colours (`--ground`, `--paper`, `--ultra`, `--lime`, `--ink`, `--muted`), spacing (`--s-1` through `--s-6`), font stacks, widths, and bar colours. See [tokens.css](tokens.css) for the full list and defaults.

Jackdaw uses the `jackdaw.tokens`, `jackdaw.base`, and `jackdaw.components` cascade layers. Normal unlayered declarations in your stylesheet override normal declarations in those layers. For example:

```css
:root {
  --ultra: #203b8c;
  --font-body: Georgia, serif;
}
```

Jackdaw is light-only by default and sets `color-scheme: light` on `:root`.

## Ink texture

Wrap heading text in an inline element with `jd-ink` to apply the ink mask and misregistered lime shadow.

```html
<h1><span class="jd-ink">A heading</span></h1>
```

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

## Ruled rows

Add `jd-ruled` to a container to draw a rule above each direct child. Add `jd-ruled--closed` for a bottom rule. Use `jd-ruled-row` for a single row. Set padding and layout in your own CSS.

```html
<ul class="jd-ruled jd-ruled--closed">
  <li>First row</li>
  <li>Second row</li>
</ul>
```

## Text roles

Use `jd-note` for a muted note and `jd-meta` for a metadata paragraph. For smaller text without paragraph spacing, use `jd-small` (0.85rem), `jd-secondary` (0.9rem), or `jd-muted` (0.95rem).

## Disclosures

Use `jd-disclosure` on a native `details` element. Add `jd-disclosure--marked` and `jd-disclosure__label` for a plus or minus indicator in place of the browser marker. The browser controls keyboard interaction and the open state.

```html
<details class="jd-disclosure jd-disclosure--marked">
  <summary><span class="jd-disclosure__label">Details</span></summary>
  <p>More information.</p>
</details>
```

Read [DESIGN.md](DESIGN.md) for the shared design principles and [the Corvus design document](docs/corvus-design.md) for the blog-specific application.

## Versioning

Jackdaw uses semantic version tags. Renaming or removing a token or class is a major change. Pin a tag and review changes before upgrading.

## Licence

[MIT](LICENSE).

## Typography and tags

Use `jd-headline`, `jd-heading`, and `jd-title` for visual hierarchy on the appropriate heading element. `jd-prose` sets a reading measure and body type; `jd-code` applies the mono font. `jd-tag` styles a short label.

```html
<h1 class="jd-headline">A page title</h1>
<p class="jd-prose">A reading column with a <a class="jd-link" href="/about">link</a>.</p>
<span class="jd-tag">Research</span>
```

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

## Layout

`jd-container` provides a centred wide container; add `jd-container--reading` for the reading measure. `jd-stack`, `jd-cluster` and `jd-grid` arrange children with a token-based gap. Override `--jd-gap` on the container and `--jd-column` on a grid when needed. `jd-section` adds vertical section spacing, `jd-rule` provides a major divider and `jd-sr-only` visually hides text while keeping it available to assistive technology.

```html
<div class="jd-container"><div class="jd-grid"><article>One</article><article>Two</article></div></div>
```

## Navigation

Use `jd-nav` on a navigation landmark and `aria-current="page"` on the current link. `jd-breadcrumbs` styles an ordered list inside a labelled navigation landmark. `jd-pagination` styles page links; label the landmark and individual links, and mark the current page. `jd-skip` styles a skip link pointing to the main content.

## Feedback

`jd-notice` is an in-flow message; add `jd-notice--success` or `jd-notice--error` and include a descriptive title. Use a live region only when an application needs to announce a dynamic update. `jd-status` and `jd-status--pending` display short text labels. `jd-empty` frames an empty state. The application owns announcements and dismissal behaviour.

## Tables

Wrap a `jd-table` in `jd-table-wrap` for horizontal scrolling on narrow screens. Provide a caption and scoped headers. Use `jd-table__number` for right-aligned numeric cells and `jd-table--compact` for denser rows. Give the wrapper an accessible name and keyboard focus when it can scroll.

## Visual catalogue

Open [catalogue.html](catalogue.html) to inspect all shared components and adjust the colour, spacing, radius, body size and preview width. The editor copies a description of changed values for you to paste into a chat; it does not edit source files. Changes are temporary and the chosen fonts must be installed locally to appear in the standalone catalogue. After changing the package CSS, run `python3 scripts/build-catalogue.py` to regenerate the self-contained catalogue from the current styles and template.
