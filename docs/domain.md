# Domain decisions

Decisions about *what* the Portfolio contains and how it is organised. Terms: see
[glossary.md](glossary.md).

## Scope

- **Migration, not redesign of content.** Texts, Projects, order and images are exactly
  those of the old Adobe Portfolio site (scanned into [`migration/scan.json`](../migration/scan.json)).
  What changes: design, languages, URLs, hosting.
- Pages: **Home**, **Work** (all Projects), **Project** (one per Project), **About**, **Contact**, 404.
- 14 Projects, in the old site's order (see `homeOrder` in `scan.json`).

## Projects and Case studies

- Every piece is a **Project**. A **Case study** is a Project with `kind: 'case-study'`.
- Current Case studies: `xibarri-uxui-case-study`, `oqtima-portal-uxui-design`. All others are `kind: 'project'`.
- Whether Case studies get a different layout is decided with the design (see design_system.md).
- A Project has: `slug`, `title`, `tags[]`, `cover`, optional `summary` (Role / Context / Status /
  Success measure), `blocks[]` (text, image, image grid, embed), `order`.
- Embeds kept from the old site: Vimeo (TopSpin), Figma prototype (OQtima).

## Tags

Free list, reused across Projects. Current set (from the old site): UI/UX Design, UX/UI Design,
Illustration, Graphic Design, Branding, Web Design, E-commerce Web Design, Art Direction,
Packaging, Advertising. Open question: merge "UI/UX Design" and "UX/UI Design" into one Tag.

## URLs

- Project pages: `/work/<slug>`. **Slugs are kept from the old site.**
- Old root-level URLs (`/makfero`, …) redirect with **301** to `/work/<slug>` (`public/_redirects`).
- Canonical host: `fadipsaati.com` (no `www`; `www` → 301 to apex).

## Languages

- Locales: **EN (default), FR, ES, CA, PT**.
- English at the root (`/work/makfero`); others prefixed (`/fr/work/makfero`). Slugs are NOT translated.
- On `/`, the Worker redirects to the Visitor's browser language (`Accept-Language`) if supported.
  A choice made with the language switcher is stored in a functional cookie `lang` and wins over the browser.
- Translations are written by Claude and reviewed by the Author before publishing.
- **Text inside images is never translated.**

## Contact

- Same as the old site: a **contact form** (Name, Email, Message) plus email, phone and LinkedIn.
- The form posts to the Worker (`/api/contact`), which sends an email via Resend to the Author.

## Analytics & privacy

- Cloudflare Web Analytics (cookieless). No cookie banner needed.
- Only cookie: `lang` (functional, language preference). Theme preference in `localStorage`.
