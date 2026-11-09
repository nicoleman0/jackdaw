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
