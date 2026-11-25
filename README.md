# fadipsaati.com

Portfolio of Fadi Pierre Saati. Astro (static) on Cloudflare Workers.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm preview    # build + run the production Worker locally
```

Start with [CLAUDE.md](CLAUDE.md) and the [`docs/`](docs) folder.

## One-time setup

1. **Cloudflare:** create an API token with the *Edit Cloudflare Workers* template.
2. **GitHub → Settings → Secrets and variables → Actions:** add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
3. **GitHub → Settings → Environments:** create `production`.
4. **Contact form:** create a Resend account, verify the `fadipsaati.com` domain, then
   `pnpm wrangler secret put RESEND_API_KEY`.
5. **Branch protection on `master`:** require a PR and the CI checks to pass.
