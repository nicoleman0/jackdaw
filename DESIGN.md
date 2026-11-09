# Jackdaw design

Jackdaw is a light, two-ink design system. Ultramarine carries headings, links, rules, and illustrations. Lime marks the primary action and can appear as a misregistered print accent. Body text is near-black on pale paper. The values in [tokens.css](tokens.css) are authoritative.

Use Funnel Display for headings, Funnel Sans for body text, Avenir Next for short section labels, and JetBrains Mono for code. Applications load their own fonts and can override the font tokens. Avenir Next falls back to Helvetica Neue or Arial when unavailable.

Use spacing tokens for gaps and hairline rules to separate rows. Paper grain and a restrained offset shadow can give surfaces depth. Keep corners square or nearly square. The radius token softens small controls and bar segments.

Use a single primary lime action per screen. Keep links identifiable, provide visible keyboard focus, and retain native HTML semantics. Bars need a text equivalent; disclosures use native `details` and `summary`.

The ink mask creates uneven print texture. Apply `jd-ink` to an inline span inside a heading so descenders remain visible.

Use `jd-paper-ground` for a subtle grain and `jd-paper-sheet` for an offset paper surface. Both are opt-in.

See [specimen.html](specimen.html) for the current shared components. The original [Corvus design document](docs/corvus-design.md) describes the blog-specific application and its artwork, rather than a contract for all consumers.

## Shared controls

Buttons use native elements and retain visible focus. The primary button uses lime; the secondary button uses an ultramarine outline. Use an underlined text link for navigation within prose. Form controls use paper backgrounds, a visible label and text for errors. Do not rely on colour alone to communicate an error or selection. The package supplies styles, while applications own form validation and interaction.

Typography classes are opt-in and do not determine heading level. Choose the HTML heading level for the document outline, then choose the visual class. Tags are labels, not interactive controls unless placed on a link or button. Muted text has two sizes: `jd-note`, `jd-meta` and `jd-muted` for supporting text, `jd-small` and `jd-secondary` for fine print.

## Layout, navigation and feedback

Containers set the page measure; stacks, clusters and grids handle spacing and reflow. Navigation uses landmarks and current-page semantics. Tables retain captions and headers and scroll within their container on narrow screens. Feedback uses a title and text, with a rule to distinguish the message; status must always be written out. Dynamic announcements and interactive behaviour belong to the application.

The [visual catalogue](catalogue.html) shows the shared components and offers temporary token adjustments. Rebuild it from the template after changing the CSS.
