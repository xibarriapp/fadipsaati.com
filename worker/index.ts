/**
 * Cloudflare Worker in front of the static Astro build.
 * Runs ONLY for "/" (language redirect) and "/api/*" (contact form).
 * Everything else is served directly from static assets (see wrangler.jsonc).
 *
 * Secrets (never in code): RESEND_API_KEY. Plain vars: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 */

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const LOCALES = ['en', 'fr', 'es', 'ca', 'pt'] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'en';
/** Functional cookie set by the language switcher. No consent banner needed. */
const LANG_COOKIE = 'lang';

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get('Cookie') ?? '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return undefined;
}

function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Picks the best supported locale from Accept-Language, e.g. "ca-ES,ca;q=0.9,en;q=0.8". */
function negotiate(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(',')
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q.split('=')[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => isLocale(r.lang))?.lang as Locale | undefined ?? DEFAULT_LOCALE;
}

async function handleRoot(request: Request, env: Env): Promise<Response> {
  const chosen = readCookie(request, LANG_COOKIE);
  const locale = isLocale(chosen) ? chosen : negotiate(request.headers.get('Accept-Language'));
  if (locale !== DEFAULT_LOCALE) {
    const url = new URL(request.url);
    url.pathname = `/${locale}`;
    return new Response(null, {
      status: 302,
      headers: { Location: url.toString(), Vary: 'Accept-Language, Cookie' },
    });
  }
  const response = await env.ASSETS.fetch(request);
  const headers = new Headers(response.headers);
  headers.append('Vary', 'Accept-Language, Cookie');
  return new Response(response.body, { status: response.status, headers });
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const form = await request.formData();
  // Honeypot: real users never fill this hidden field.
  if (String(form.get('company') ?? '') !== '') return Response.json({ ok: true });

  const name = String(form.get('name') ?? '').trim().slice(0, 200);
  const email = String(form.get('email') ?? '').trim().slice(0, 320);
  const message = String(form.get('message') ?? '').trim().slice(0, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });
  if (!res.ok) return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  return Response.json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/') return handleRoot(request, env);
    if (pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
