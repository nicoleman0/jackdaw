# Jackdaw

Jackdaw is a CSS design system with a two-ink print palette, design tokens, and bar and legend components. It works with plain HTML or a framework that supports CSS imports. It does not require JavaScript or React.

## Install

Install a tagged release from GitHub:

```sh
npm install 'github:nicoleman0/jackdaw#v0.2.1'
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

## Versioning

Jackdaw uses semantic version tags. Renaming or removing a token or class is a major change. Pin a tag and review changes before upgrading.

## Licence

[MIT](LICENSE).
