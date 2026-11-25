# Design system

> Status: **exploring.** Six Design directions are being reviewed; this file is completed once
> the Author approves one. Decisions already taken are below.

## Decided

- **Reference:** the Framer template *Eclipsis* (project "Eclipsis copy") is the inspiration:
  editorial, large light-weight sans headlines, near-black / near-white surfaces, generous
  spacing, image-led project grid, oversized wordmark in the footer.
- **Theme:** light **and** dark, with a visible toggle. Default follows the system
  (`prefers-color-scheme`); the Visitor's choice is saved in `localStorage` and applied before
  first paint (no flash).
- **Motion:** at the level of Eclipsis — scroll-reveal fades/slides, hover states on Project
  cards, smooth page transitions. Always respect `prefers-reduced-motion`.
- **Images** are the hero of every Project page; text never sits on top of the Author's images.
- **Accessibility:** WCAG AA contrast in both Themes, visible focus, keyboard-operable nav and toggles.

## Eclipsis reference tokens (starting point, not final)

| Token | Value |
|---|---|
| Font | Inter Display (400), tight tracking on headings (-0.02 to -0.03em) |
| H1 / H2 / H3 | 96 / 64 / 52 px desktop → 48 / 40 / 40 px phone |
| Body | 14–20 px, line-height 1.5 |
| Neutral scale | 0 #FFF · 50 #FAFAFA · 100 #F5F5F5 · 200 #E5E5E5 · 300 #D4D4D4 · 400 #A1A1A1 · 500 #737373 · 600 #525252 · 700 #404040 · 800 #262626 · 900 #171717 · 950 #0A0A0A |
| Breakpoints | 1440 / 810 / 390 |

## To decide with the Design directions

- Final type pairing and scale, accent color (if any).
- Work page layout (grid / list / filters by Tag).
- Project vs Case study layout.
- Navigation pattern and language switcher placement.
