// @ts-check
import { defineConfig } from 'astro/config';

// Static site. Locales: see docs/domain.md#languages.
// English lives at the root (/work/...), the rest under a prefix (/fr/work/...).
export default defineConfig({
  site: 'https://fadipsaati.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    locales: ['en', 'fr', 'es', 'ca', 'pt'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  image: {
    // Originals are committed unresized; Astro generates AVIF/WebP variants at build.
    responsiveStyles: true,
  },
});
