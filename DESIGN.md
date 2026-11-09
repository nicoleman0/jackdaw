# Jackdaw design

Jackdaw is a light, two-ink design system. Ultramarine carries headings, links, rules, and illustrations. Lime marks the primary action and can appear as a misregistered print accent. Body text is near-black on pale paper. The values in [tokens.css](tokens.css) are authoritative.

Use Funnel Display for headings and labels, Funnel Sans for body text, and JetBrains Mono for code. Applications load their own fonts and can override the font tokens.

Use spacing tokens for gaps and hairline rules to separate rows. Avoid shadows and rounded cards. The radius token softens small controls and bar segments.

Use a single primary lime action per screen. Keep links identifiable, provide visible keyboard focus, and retain native HTML semantics. Bars need a text equivalent; disclosures use native `details` and `summary`.

The ink mask creates uneven print texture. Gracchi applies it to an inline span; the blog applies it to padded headings to avoid clipping descenders. Keep both approaches until the headings can be compared visually across browsers.

See [specimen.html](specimen.html) for the current shared components. The original [Corvus design document](docs/corvus-design.md) describes the blog-specific application and its artwork, rather than a contract for all consumers.
