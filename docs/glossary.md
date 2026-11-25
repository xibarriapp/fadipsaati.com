# Glossary — ubiquitous language

Use exactly these terms everywhere: code identifiers, file names, URLs, UI copy, commits, docs
and conversation. If you need a new term, add it here first.

| Term | Definition | In code | Don't say |
|---|---|---|---|
| **Portfolio** | The whole website fadipsaati.com. | — | site (ok informally), web |
| **Author** | Fadi Pierre Saati, owner of the Portfolio and of every image in it. | `author` | user, owner |
| **Visitor** | Anyone browsing the Portfolio. | `visitor` | user, client |
| **Project** | Any single piece of work shown in the Portfolio (a poster, a brand, an app…). Has a slug, title, Tags, cover and a body of Blocks. | `Project`, collection `projects` | work item, post, piece |
| **Case study** | A Project that documents a full UX process (context, role, process, outcome). A Case study **is** a Project with `kind: 'case-study'`. Currently: Xibarri, OQtima. | `kind: 'case-study'` | UX project, deep dive |
| **Work** | The page that lists all Projects (`/work`). Also the nav label. | `pages/work` | projects page, portfolio page |
| **Tag** | A discipline label on a Project (e.g. "Branding", "UI/UX Design"). A Project has 1..n Tags. Free list, but reuse existing ones. | `tags: string[]` | category, discipline, label |
| **Cover** | The image that represents a Project in the Work grid and social previews. | `cover` | thumbnail, hero image |
| **Block** | One piece of a Project body, in order: a text Block, an image Block, an image grid Block, or an embed Block. Mirrors the old Adobe Portfolio "modules". | `Block`, `blocks[]` | module, section |
| **Summary** | The short structured intro of a Project: Role, Context, Status, Success measure (when present). | `summary` | description, meta |
| **Original** | The full-quality image file supplied by the Author. Committed unresized. | `originals` | source, raw |
| **Locale** | One of the 5 languages: `en` (default), `fr`, `es`, `ca`, `pt`. | `Locale` | language code, lang (ok as cookie name) |
| **Theme** | Light or dark appearance, chosen by the Visitor (toggle) or the system. | `theme` | mode, skin |
| **Contact** | The page with the contact form, email, phone and LinkedIn. | `pages/contact` | get in touch, hire me |
| **Preview** | A Cloudflare preview deployment of a PR, used for the manual check. | — | staging, test site |
| **Production** | The live site at fadipsaati.com, deployed from `master`. | — | live, prod (ok informally) |
| **Design direction** | One of the candidate visual options explored before approval. | — | theme, template |
