---
name: corvus
description: Nicholas Coleman's portfolio and blog, printed as a two-ink riso run.
colors:
  ground: "#eef0f9"
  ground-deep: "#e2e5f4"
  paper: "#ffffff"
  ultra: "#2f17f0"
  ultra-deep: "#2410c4"
  lime: "#c4f01c"
  ink: "#17161f"
  muted: "#4a4a63"
  rule: "color-mix(in srgb, #2f17f0 28%, transparent)"
typography:
  display:
    fontFamily: "Funnel Display Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 8.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Funnel Display Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  section:
    fontFamily: "Funnel Display Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Funnel Display Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  item-title:
    fontFamily: "Funnel Display Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.2
  label:
    fontFamily: "Funnel Display Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
  body:
    fontFamily: "Funnel Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: "Funnel Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "Funnel Sans Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    fontFeature: "tnum"
  code:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  sm: "2px"
spacing:
  s-1: "0.5rem"
  s-2: "1rem"
  s-3: "1.5rem"
  s-4: "2.5rem"
  s-5: "4rem"
  s-6: "6.5rem"
  gutter: "clamp(1.25rem, 5vw, 4rem)"
components:
  action-strip:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    padding: "1rem 1.5rem"
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.65rem 1.2rem"
  button-link:
    textColor: "{colors.ultra}"
    typography: "{typography.label}"
  chip:
    textColor: "{colors.ultra}"
    rounded: "{rounded.sm}"
    padding: "0.1rem 0.6rem"
  chip-hover:
    backgroundColor: "{colors.paper}"
  copy-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ultra}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.5rem"
  copy-button-hover:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.ultra}"
  code-block:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.15rem"
  code-caption:
    backgroundColor: "{colors.ultra}"
    textColor: "{colors.paper}"
    padding: "0.35rem 0.75rem"
---

# Design System: corvus

All tokens live in the `:root` block of `src/styles/global.css`; that file is the source and this document describes it. Light only: no dark palette exists. Copy rules (no AI-writing tells) live in `AGENTS.md` and are not repeated here.

## Overview

**Creative North Star: "The Two-Ink Riso Run"**

The site is printed, not rendered. Ultramarine is ink one and prints everything: display type, the grain prints, rules, links. Lime is ink two, overprinted with multiply only where the visitor acts. Body text is near-black; the ground is pale blue-white paper with a coarse ultramarine-tinted grain and sparse ink dust.

Effects come from the print process alone: overprint (`mix-blend-mode: multiply` on the name, the lime strip and the grain prints), slight misregistration (the lime strip sits at -1deg; display headings carry a lime pass offset about 0.03em), uneven ink (an alpha noise mask, `--ink-mask`, on `h1` and `.section-title`) and grain screening (the footer landscape and the About picture). Depth, shadow and rounded cards are absent. Structure comes from ultramarine rules: 2px for major breaks, a 28% ultramarine hairline between list rows.

Pinned by the user: the palette logic from thedesignsociety.fr (pale blue ground, ultramarine, lime, near-black); Funnel Display with Funnel Sans, chosen from a specimen; the corvid mark; lime used once per screen for the action. The direction refuses the dark dev portfolio with mono labels and the split hero with a card row.

**Key Characteristics:**
- Two inks on paper: ultramarine for everything printed, lime for the one action.
- Overprint, misregistration, uneven ink and grain screening are the only effects.
- Flat: no shadows, no radius beyond 2px.
- Heavy, tight Funnel Display headings against an open Funnel Sans reading column.
- Pictures print as two-ink riso grain, never as photos.

## Colors

Two inks and a near-black on pale blue paper.

### Primary
- **Ultramarine Ink** (`ultra`): headings, links, grain prints, rules, focus ring, list markers, tag outlines, the reading-progress bar. Hover deepens to **Pressed Ultramarine** (`ultra-deep`).

### Secondary
- **Overprint Lime** (`lime`): the action. On the home page it is the hero strip carrying the email; on project pages it is the primary button. Also the text-selection colour, the skip link, and the copy button's hover. Always carries `ink` text, never ultramarine.

### Neutral
- **Riso Paper** (`ground`): page ground under the grain; also `theme-color`.
- **Deep Paper** (`ground-deep`): secondary fill in Mermaid diagrams only.
- **Sheet White** (`paper`): code blocks, inline code, diagrams, hovered tags; the one surface lifted off the ground, by tone rather than shadow.
- **Near-Black Ink** (`ink`): body text and nav links.
- **Muted Ink** (`muted`): dates, meta lines, descriptions, footer, blockquotes.
- **Ultramarine Hairline** (`rule`): row dividers, table cells, TOC rail.

### Named Rules
**The One Lime Rule.** Lime marks the single action on a screen: one strip or one primary button. Selection, skip link and copy-button hover are state, not layout, and do not count. Neither does lime as press texture: the misregistered heading ghost and the grain streak in the footer landscape. Texture lime is never a flat area or a control.

**The Same-Ink Rule.** Anything drawn (type, grain prints, rules, icons in the footer) prints in ultramarine. A new colour needs a reason the two inks cannot carry.

## Typography

**Display Font:** Funnel Display Variable (with Helvetica Neue, Arial)
**Body Font:** Funnel Sans Variable (with Helvetica Neue, Arial)
**Mono Font:** JetBrains Mono Variable (with ui-monospace, SF Mono, Menlo)

**Character:** Same family, two cuts. Funnel Display at 700 to 800 with negative tracking carries the name and headings; Funnel Sans keeps long posts comfortable. All three self-hosted through Fontsource.

### Hierarchy
- **Display** (800, clamp 3.5 to 8.5rem, 0.86, -0.035em): the home-page name only, multiply-blended.
- **Headline** (800, clamp 2.5 to 4.5rem, 0.95, -0.03em): page `h1`. Project landing pages set it larger (clamp 3.5 to 6rem).
- **Section** (800, clamp 2 to 2.75rem, -0.025em): home section titles.
- **Title** (700, 1.75rem, 1.1, -0.015em): `h2`; 1.85rem in prose. `h3` is 1.3rem.
- **Item title** (700, 1.35rem, 1.2): post-list and work-list entries; project names run 1.6rem at 800.
- **Label** (Display 600 to 700, about 1.05rem): nav, "more" links, project buttons, TOC heading.
- **Body** (400, 1.0625rem, 1.6): UI text. **Prose** is 1.125rem in a 42rem column; side text caps at 68ch.
- **Meta** (0.95rem, tabular numerals, `muted`): dates, reading time.
- **Code** (JetBrains Mono, 0.875rem blocks, 0.82em inline): code, commands, filenames, Mermaid labels.

### Named Rules
**The Mono-Is-Code Rule.** JetBrains Mono appears only on literal code: blocks, inline code, install commands, filename captions, diagrams. Labels, buttons, dates and nav stay in Funnel.

**The Display-In-Ink Rule.** Headings print in ultramarine. The lime strip's role line is the exception: on lime, type is near-black.

## Layout

One centered column (`.page-wrap`, `width: 100%`) at a 42rem measure plus gutter. Posts widen to 64rem for a 14rem sticky TOC sidebar from 64rem viewport; the home page and header use the 76rem wide container. The gutter is fluid (clamp 1.25 to 4rem).

Spacing follows a six-step scale (`s-1` to `s-6`): tight inside a group, generous between groups. Sections open with `s-5`; pages end with `s-6`.

Home hero: one column, the name and lime strip, then the project names along a 2px ultramarine rule. Under 760px the strip stacks. Under 700px work and post rows drop their two-column grid.

**The Bleed Rule.** Only the footer landscape reaches the viewport edge, and never past it (iOS zooms out on overflow). Everything else stays inside the gutter.

## Elevation & Depth

Flat. No `box-shadow` anywhere. Depth comes from print: multiply overprint where lime or ultramarine lies over the ground, and tonal lift where `paper` sits on `ground` for code and diagrams.

**The Flat Sheet Rule.** Nothing casts a shadow. To separate, use a rule, a tone step to `paper`, or space.

## Shapes

Square. The one radius (`sm`, 2px) softens tag outlines, inline code, code blocks and the copy button; filename-captioned code blocks go fully square. Lines carry structure: 2px ultramarine for header, hero, post-header and footer breaks; the hairline `rule` between rows; a 1px ultramarine left rule on blockquotes. The lime strip's -1deg tilt is the only off-axis shape.

## Components

### Buttons
- **Shape:** square (0 radius).
- **Primary:** lime block with near-black Funnel Display 700, multiply-blended; hover adds a 2px underline. One per screen.
- **Secondary:** ultramarine underlined text links in the same label type.
- **Copy button:** sheet-white with a 1px ultramarine border, 2px radius; appears on code-block hover or focus, turns lime on hover.

### Chips
- **Style:** tags and project meta are 1px ultramarine outlines, 2px radius, ultramarine 0.9rem text, no fill.
- **State:** hover fills with `paper`.

### Lists
- Post and work lists are hairline-ruled rows. The title is ultramarine display type; a 2px underline on row hover. Post rows are fully clickable.

### Navigation
- Header: corvid mark plus "corvus" in ultramarine Funnel Display 700, left; nav links right in near-black Funnel Display 600. Hover and current page turn ultramarine and underline (2px when current). The mark rocks briefly on hover (`feather-write`, 0.6s).
- Footer: below a 2px ultramarine rule; near-black links with ultramarine Simple Icons and Phosphor glyphs, inline SVG with `currentColor`. Under the links, the footer landscape (see Signatures).

### Code
- Blocks on `paper`, 2px radius, Shiki `github-light` tokens over a site-forced background. Filename captions are an ultramarine bar with white mono text. Inline code on `paper`.
- Mermaid diagrams render on `paper` with ultramarine lines and borders and near-black text; the theme repeats the token hexes literally in the post page script.

### Action Strip (signature)
The lime block under the home-page name: "AI Engineer", the MSc line, and the email pushed right. One line on desktop, stacked on phones. Multiply-blended, rotated -1deg. It slaps down once on load (`slap-down`, 0.45s, cubic-bezier(0.16, 1, 0.3, 1), 0.15s delay) and wobbles on hover (0.6s, hover-capable devices only). Reduced motion shows it placed and still.

### Grain Prints (signature)
Pictures print in the two inks through `RisoPrint.astro`. `scripts/riso-art.sh` turns each colour source in `art/` into two greyscale tone maps in `public/riso/` (black = full ink): ultramarine from the whole image, lime from its darkest tones only. Two SVG filters screen them at runtime: each reads darkness as ink density, thresholds it against noise and floods it with `--lime` or `--ultra`. Lime prints about 4 units off register; ultramarine multiplies over it, so the darkest areas go near-black with lime fringes. Size the viewBox to render near 0.7 CSS px per unit so the grain matches across prints. To change a picture, replace its source and rerun the script.

- **Footer landscape:** a misty forest (`art/footer-forest.jpg`), under the footer links, bleeding off the bottom and both sides. The top fades to paper so the links sit on it; `slice` crops it on narrow screens.
- **About picture:** `art/roger.jpg`, at most 300px wide.

## Do's and Don'ts

### Do:
- **Do** take every colour, font and space from the `:root` tokens in `global.css`.
- **Do** keep lime to the one action per screen, with near-black text on it.
- **Do** print headings, links, rules and drawn marks in ultramarine.
- **Do** separate with ultramarine rules (2px for major breaks, hairline between rows) and tone steps to `paper`.
- **Do** use multiply overprint, misregistration, the ink mask and grain screening as the only effects.
- **Do** keep new motion inside the global `prefers-reduced-motion` reset.

### Don't:
- **Don't** add a dark palette, or dark surfaces behind content.
- **Don't** use shadows, or radius above 2px.
- **Don't** set labels, buttons or dates in mono.
- **Don't** put a second lime element on a screen that already has its action.
- **Don't** replace the corvid mark, or show a picture as a plain photo.
