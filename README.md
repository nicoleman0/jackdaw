# Jackdaw

[![npm version](https://img.shields.io/npm/v/jackdaw-css?color=2f17f0)](https://www.npmjs.com/package/jackdaw-css)
[![CSS checks](https://github.com/nicoleman0/jackdaw/actions/workflows/check.yml/badge.svg?branch=main)](https://github.com/nicoleman0/jackdaw/actions/workflows/check.yml)
[![MIT licence](https://img.shields.io/badge/licence-MIT-c4f01c)](https://github.com/nicoleman0/jackdaw/blob/main/LICENSE)

A CSS design system inspired by two-ink printing. Build editorial pages, forms and data views with print textures, colour presets and native HTML. No JavaScript or framework required.

**[Explore the catalogue](https://corvus-dev.com/jackdaw/catalogue)** · [Component reference](https://github.com/nicoleman0/jackdaw/blob/main/docs/reference.md) · [Design principles](https://github.com/nicoleman0/jackdaw/blob/main/DESIGN.md)

## Get started

```sh
npm install jackdaw-css
```

Import Jackdaw before your own styles:

```js
import "jackdaw-css/index.css";
import "./styles.css";
```

Then use its classes with your HTML:

```html
<main class="jd-container jd-container--reading">
  <h1 class="jd-headline"><span class="jd-ink">Fieldnotes</span></h1>
  <p class="jd-prose">Notes from the print room.</p>
  <a class="jd-button jd-button--primary" href="/notes">Read the notes</a>
</main>
```

For plain HTML, copy `jackdaw.css` from the package into your project and link it with `<link rel="stylesheet" href="/css/jackdaw.css">`. The single-file build needs no bundler. Use `index.css` with a bundler that resolves CSS imports.

Jackdaw names Funnel Display, Funnel Sans and JetBrains Mono in its font tokens but does not load them. Install the fonts separately or override the tokens. Component classes are opt-in. Importing the full stylesheet also defines root tokens, legacy unprefixed aliases and `color-scheme: light`. Applications own behaviour such as validation and opening dialogs.

## Make it yours

Jackdaw defaults to ultramarine and lime on pale blue paper. Choose another ink pair and stock on any element:

```html
<body class="jd-inks-burgundy jd-stock-cream">
```

Try the presets and adjust tokens in the [catalogue](https://corvus-dev.com/jackdaw/catalogue). For custom colours, scoped overrides, components and print effects, see the [reference](https://github.com/nicoleman0/jackdaw/blob/main/docs/reference.md).

## Accessibility and support

States use fills, edges, hatches and text as well as colour. Jackdaw includes forced-colour styles, logical properties for right-to-left layouts and print styles. The [reference](https://github.com/nicoleman0/jackdaw/blob/main/docs/reference.md#accessibility) explains these features and the markup each component needs.

CI checks contrast for the supplied ink and stock combinations and runs browser and axe checks in Chromium. Those checks do not establish accessibility for every use. Applications are responsible for semantics, interaction and testing their own pages.

## More

- [Component reference](https://github.com/nicoleman0/jackdaw/blob/main/docs/reference.md): tokens, themes, components and print styles.
- [Fieldnotes example](https://github.com/nicoleman0/jackdaw/blob/main/examples/fieldnotes.html): a complete fictional page using Jackdaw.
- [Contributing](https://github.com/nicoleman0/jackdaw/blob/main/CONTRIBUTING.md) and [changelog](https://github.com/nicoleman0/jackdaw/blob/main/CHANGELOG.md).

Jackdaw uses semantic version tags. Renaming or removing a token or class is a major change. Pin a version and review changes before upgrading. Licensed under [MIT](https://github.com/nicoleman0/jackdaw/blob/main/LICENSE).
