# Contributing

Jackdaw is CSS only. The package has no JavaScript.

## Preview

Open `specimen.html` and `catalogue.html` from a checkout in a browser. The catalogue adjusts tokens for preview only and does not edit files.

## Rebuild

After changing any package CSS or `catalogue.template.html`, run:

```sh
python3 scripts/build-catalogue.py
```

This regenerates `jackdaw.css` and `catalogue.html`. Do not edit those two files by hand.

## Test

```sh
npm ci
npx playwright install chromium
npm test
npm run test:browser
npm run screenshots
```

- `npm test` runs the bundle, catalogue and contrast tests. They need no browser.
- `npm run test:browser` loads the catalogue and the Fieldnotes example in Chromium and checks console errors, axe-core, forced colours, RTL, scoped inks and 360px layout.
- `npm run screenshots` writes review images to `screenshots/`, which is git-ignored. Local and CI fonts differ, so nothing compares them.
- `npm run build` is the rebuild command above.

CI runs `npm test` and `npm run test:browser`, plus a rebuild check that fails when `jackdaw.css` or `catalogue.html` is out of date. Screenshots are for local review.

## Accessibility review

Automated checks do not cover every interaction or colour combination. Before a release, use the keyboard to exercise controls and focus states, check zoom and forced colours, and test representative pages with a screen reader. Record the browsers, assistive technology and results with the release. Review axe contrast checks marked incomplete by hand.

The automated browser checks currently run in Chromium. Safari and Firefox support has not been verified by CI.

## Rules for a change

- Use the selected print and accent inks for colour accents.
- Do not use colour alone to show state, errors or selection.
- Use native HTML elements and keep their semantics. Use `details` and `summary` for disclosures.
- Keep JavaScript out of the package.
- Prefix every class with `jd-`.
- Renaming or removing a class or token is a major version change.

## Changelog

A user-visible change needs an entry under `## Unreleased` in `CHANGELOG.md`.
