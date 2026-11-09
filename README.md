# jackdaw

Shared CSS for corvus-dev.com and Gracchi. Plain CSS in cascade layers, so each site's own styles override it without specificity fights.

## Use

```json
"jackdaw": "github:nicoleman0/jackdaw#v0.1.0"
```

```js
import "jackdaw/index.css";
```

Sites load the Funnel and JetBrains Mono fonts themselves; the tokens only name them.

## Versioning

Semver tags. Renaming or removing a token or class is a major bump.

## Bars and legends

Use `jd-bar` with `jd-bar__fill`, optional `jd-bar__fill--under` and `jd-bar__mark`. Set each child's `--v` to a percentage. Give the bar an accessible label or provide equivalent text.

For segments, add `jd-bar--segmented` and set its `--v` to the overall percentage. Use `jd-bar__segment` children with numeric `--v` values. Add `jd-tone--oppose` or `jd-tone--support` to a parent, and set `data-rank` to `0`, `1`, `2`, or `rest` on each segment and its matching `jd-swatch`. Use `jd-legend` on the list. The default, `jd-swatch--under`, and `jd-swatch--mark` swatches describe a filled bar.
