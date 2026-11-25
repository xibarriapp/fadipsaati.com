# CLAUDE.md — fadipsaati.com

Personal portfolio of **Fadi Pierre Saati** (designer). This repo is a migration of the
old Adobe Portfolio site (fadipsaati.com) to a static Astro site on Cloudflare Workers.
Content is the same as the old site; design and languages are new.

## Read these first (source of truth)

| File | What it holds |
|---|---|
| [`docs/glossary.md`](docs/glossary.md) | **Ubiquitous language.** Use exactly these words in code, URLs, UI and conversation. |
| [`docs/domain.md`](docs/domain.md) | Domain decisions: Projects vs Case studies, Tags, URLs, languages, content rules. |
| [`docs/design_system.md`](docs/design_system.md) | Design decisions: tokens, type, theme, motion, layout patterns. |
| [`docs/architecture.md`](docs/architecture.md) | Technical decisions: stack, hosting, CI/CD, DNS, images, secrets. |
| [`migration/scan.json`](migration/scan.json) | Full scan of the old site: texts, Tags, image order per page. |

If a decision changes, **update the matching doc in the same PR**. Docs and code must not disagree.

## Workflow rules (mandatory)

1. **One branch per feature.** Never commit directly to `master`.
   Branch names: `feature/<short-name>`, `fix/<short-name>`, `chore/<short-name>`, `content/<short-name>`.
2. Open a **pull request into `master`**. CI runs (gitleaks, lint, `astro check`, build,
   link check) and posts a **Cloudflare preview URL** on the PR.
3. **Manual check before every merge/push to `master`.** Open the preview URL (or run
   `pnpm preview` locally) and verify by hand that the site works. Minimum checklist:
   - Home, Work, every Project page touched, About, Contact load without errors (check the console).
   - Language switcher works in all 5 languages and the choice is remembered.
   - Light/dark toggle works and persists.
   - Phone width (≈390px) and desktop (≈1440px) both look right.
   - Contact form sends (or shows a clear error if not configured).
   - No broken images or links.
   Do not merge until the person (Fadi) confirms the manual check passed.
4. Merge with **squash merge**. A push to `master` deploys to production automatically.

## Secrets — VERY IMPORTANT

- **Never put a secret in any commit**: API keys, tokens, passwords, account IDs paired with tokens, private URLs.
- Secrets live only in: local `.env` / `.dev.vars` (both git-ignored), **GitHub Actions secrets**,
  and **Cloudflare Worker secrets** (`pnpm wrangler secret put NAME`).
- Use `dotenv`-style files + environment variables for anything secret. Commit only the
  `*.example` files with empty values.
- `.gitignore` already blocks `.env*`, `.dev.vars*`, keys and credentials. Do not weaken it.
- CI runs **gitleaks** on every PR and before every deploy. If it flags something, rotate the
  secret first, then remove it from history.
- Before committing, run `git diff --staged` and check there is nothing secret in it.

## Commands

```bash
pnpm install        # install deps
pnpm dev            # local dev server (Astro)
pnpm preview        # build + run the real Worker locally (wrangler dev) — use for the manual check
pnpm check && pnpm lint && pnpm build && pnpm links   # what CI runs
```

## Conventions

- Code, comments, commits and docs in **English**. Site content in 5 languages (EN, FR, ES, CA, PT).
- **Never translate text inside images.** Only HTML text is translated.
- Keep the old slugs; new URLs are `/work/<slug>` (+ locale prefix for non-English).
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `content:`, `docs:`).
