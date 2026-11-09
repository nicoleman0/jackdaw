# Changelog

All notable changes to Jackdaw are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions follow [Semantic Versioning](https://semver.org/).

## 0.9.1 - 2026-11-09

### Changed

- Publish the package as `jackdaw-css` on npm.

## 0.9.0 - 2026-11-09

### Added

- `inks.css` with ink pairs `jd-inks-federal`, `jd-inks-burgundy` and `jd-inks-forest`, and paper stocks `jd-stock-newsprint` and `jd-stock-cream`.
- `jd-scope` for recomputing derived tokens under an overridden ink or stock.
- `press.css` with `jd-mark`, `jd-overprint`, `jd-halftone`, `jd-bar__fill--halftone`, `jd-swatch--halftone`, `jd-inked`, `jd-crop`, `jd-perforation` and `jd-tag--stamp`.
- `--jd-halftone`, `--jd-halftone-size` and `--jd-press` tokens. The primary button steps into its shadow, except under `prefers-reduced-motion: reduce`.
- `print.css`, a print stylesheet: white paper, black text, exact colour on data, URLs after prose links, no page breaks inside notices, rows, figures and bars.
- Forced-colors rules for halftone fills and swatches, and for blend modes.
- `tests/contrast.cjs`, run in CI, checks WCAG contrast for every ink pair on every stock.
- Catalogue controls for ink pair and paper stock, and a print effects section.
- `code.css` with `pre.jd-codeblock`, `jd-codeblock-figure`, `jd-codeblock__caption` and `jd-kbd`.
- `editorial.css` with `jd-figure`, `jd-quote`, `jd-pullquote`, `jd-footnote-ref`, `jd-footnotes`, `jd-card` and `jd-card__title`. A card combines with `jd-paper-sheet` and `jd-crop`.
- `overlay.css` with `dialog.jd-dialog`, `jd-dialog__title`, `jd-dialog__actions` and `[popover].jd-popover`. Style only; the application opens them.
- In `controls.css`: `jd-chip`, `jd-copy`, `jd-action-strip`, `input[role="switch"].jd-switch` and a print-ink chevron on `select.jd-input`. `jd-check` is documented for radios.
- In `feedback.css`: `progress.jd-progress` and `meter.jd-meter`, with hatches for middling and low meter values.
- Forced-colors and print rules for the new components.
- `tests/contrast.cjs` also asserts paper text on print ink and body text on paper for every pair and stock.
- Catalogue sections for editorial, code and overlays, and new samples under actions, forms and feedback. The Fieldnotes example uses the code block, copy button, keys, quote, footnotes and card.

### Changed

- Tokens now use the `--jd-` prefix. Legacy aliases can still be read, but overrides must use the new names.
- README sections are ordered as intro, install, tokens, inks, components by kind, print, accessibility, catalogue, versioning, licence.
- Derived tokens (`--jd-rule`, `--jd-rank-*`, `--jd-hatch-*`, `--jd-edge-*`, `--jd-focus-color`) are declared on `:root`, `.jd-scope` and the pair and stock classes, so they follow an ink overridden on a subtree. The old unprefixed aliases still resolve on `:root` only.
- The catalogue preview carries `jd-scope`, so its colour pickers now update rules, ranks and hatches.

## 0.8.0 - 2026-11-09

### Added

- `jackdaw.css`, a single-file build of `index.css` for plain HTML.

### Changed

- Buttons and bar fills use the `--radius` token instead of square corners.
- `jd-note`, `jd-meta` and `jd-muted` share one muted size. `jd-small` and `jd-secondary` share a smaller one.
- `jd-ruled` lists drop list markers and indent, so rules span the full row.

### Fixed

- Chart ranks and the under fill use hatches and 1px outlines, so adjacent ranks meet WCAG 1.4.11. Oppose rank 1 is lighter.
- Invalid inputs thicken their edge with an inset shadow. Content no longer shifts.

## 0.7.0 - 2026-11-09

### Added

- Form, typography, layout, navigation, feedback and table classes, such as `jd-button`, `jd-field`, `jd-headline`, `jd-container`, `jd-nav`, `jd-notice` and `jd-table`.
- `jd-paper-ground` and `jd-paper-sheet` for opt-in paper surfaces.
- `--font-label` token for short section labels.
- Visual catalogue (`catalogue.html`) and preview fonts in the package.

### Changed

- `jd-ink` adds padding and a negative inline margin.
- Disclosure summaries show a visible focus outline.

## 0.6.0 - 2026-11-09

### Added

- `jd-ink` class. Wrap heading text in an inline span to apply the ink mask and lime offset shadow.
- `DESIGN.md` describing the shared design principles.

## 0.5.0 - 2026-11-09

### Added

- `jd-disclosure` for native `details` elements. `jd-disclosure--marked` and `jd-disclosure__label` replace the browser marker with a plus or minus sign.
- `disclosure.css` is an export of the package.

## 0.4.0 - 2026-11-09

### Added

- `jd-note` and `jd-meta` for muted supporting text.
- `jd-small`, `jd-secondary` and `jd-muted` for smaller muted text.
- `text.css` is an export of the package.

## 0.3.0 - 2026-11-09

### Added

- `jd-ruled` draws a rule above each direct child. `jd-ruled--closed` adds a bottom rule.
- `jd-ruled-row` draws a rule above a single row.

## 0.2.1 - 2026-11-09

### Added

- MIT licence in `LICENSE`, declared in `package.json`.

### Changed

- README documents reuse from a tagged release. The stylesheets are unchanged.

## 0.2.0 - 2026-11-09

### Added

- `jd-bar`, `jd-bar__fill`, `jd-bar__mark` and segmented bars with `jd-bar__segment`.
- `jd-legend` and `jd-swatch`, with rank colours from the `--rank-oppose-*` and `--rank-support-*` tokens.
- `bar.css` and `legend.css` are exports of the package.

## 0.1.0 - 2026-11-09

### Added

- Shared design tokens in `tokens.css`: colours, spacing (`--s-1` to `--s-6`), font stacks, measure, width, radius and the `--ink-mask` texture.
- `index.css` with the `jackdaw.tokens`, `jackdaw.base` and `jackdaw.components` cascade layers.
