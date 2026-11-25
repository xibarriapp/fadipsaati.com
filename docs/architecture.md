# Architecture

## Stack

| Piece | Choice | Why |
|---|---|---|
| Site generator | **Astro 5**, `output: 'static'` | Pure static HTML/CSS/JS, components + content collections for 14 Projects × 5 Locales. |
| Package manager | **pnpm** | Fast, strict. Lockfile committed. |
| Runtime | Node 22 (`.nvmrc`) | |
| Hosting | **Cloudflare Workers + static assets** | Free with a private repo, preview URL per PR, real 301s (`_redirects`), headers (`_headers`), global CDN. |
| Edge logic | `worker/index.ts` | Only for `/` (language redirect) and `/api/contact` (form → email). Everything else is served as static assets. |
| Email | Resend API (called from the Worker) | Contact form delivery. Key is a Worker secret. |
| Analytics | Cloudflare Web Analytics | Cookieless. |

Rejected: **GitHub Pages** — needs a paid GitHub plan for private repos, no previews per PR,
no real redirects or headers.

## Repository layout

```
src/
  pages/            Astro routes (en at root, other locales under [locale]/)
  layouts/          Base layout(s)
  components/       UI components
  content/projects/ Project entries (one folder per slug, with its images)
  i18n/             UI strings per Locale
  styles/           Design tokens + global CSS
worker/index.ts     Cloudflare Worker (language redirect, contact API)
public/             _redirects, _headers, favicons
migration/          scan.json of the old site (reference only)
docs/               Decisions (this file, domain, design system, glossary)
```

## Hosting & deploys

- Worker name: `fadipsaati` (`wrangler.jsonc`). Static assets from `dist/`.
- **Pull request → `master`**: `.github/workflows/ci.yml` runs gitleaks → lint → `astro check`
  → build → link check, then `wrangler versions upload --preview-alias pr-<n>` and comments the
  **Preview** URL on the PR. Use it for the manual check.
- **Push to `master`**: `.github/workflows/deploy.yml` runs gitleaks → build → `wrangler deploy` to **Production**.
- Branching: one branch per feature, PR, manual check, squash merge (see CLAUDE.md).

## Secrets

| Secret | Where it lives | Used by |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | GitHub Actions secret; local `.env` | CI deploys (token scope: *Edit Cloudflare Workers*) |
| `CLOUDFLARE_ACCOUNT_ID` | GitHub Actions secret; local `.env` | CI deploys |
| `RESEND_API_KEY` | Cloudflare Worker secret (`wrangler secret put`); local `.dev.vars` | Contact form |

Plain (non-secret) Worker vars: `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
Nothing secret is ever committed; `.gitignore` blocks env files and gitleaks checks every PR and deploy.

## DNS cutover

The domain is registered at **Namecheap**. Until the new site is approved, Adobe Portfolio
stays live and development happens on `*.workers.dev` + PR previews.

At cutover:
1. Add `fadipsaati.com` as a zone in Cloudflare (Free plan). Cloudflare imports existing records.
2. At Namecheap → Domain → Nameservers → *Custom DNS* → the two Cloudflare nameservers.
   (No email on the domain, so there are no MX records to preserve.)
3. When the zone is active, add Worker custom domains `fadipsaati.com` and `www.fadipsaati.com`
   (uncomment `routes` in `wrangler.jsonc`) and a redirect rule `www` → apex (301).
4. Enable Cloudflare Web Analytics for the zone.
5. Check the old URLs redirect to `/work/<slug>`.

## Images

- The Author's **Originals** (JPG/PNG/GIF) are committed **unresized**, next to each Project's
  content (`src/content/projects/<slug>/`). Astro generates responsive AVIF/WebP at build time.
- Watch out: GitHub rejects files > 100 MB and warns above 50 MB. If the repo grows past
  ~2–3 GB, move Originals to Cloudflare R2.
- Animated GIFs are kept as GIF (or converted to MP4/WebM in a later PR).
