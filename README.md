# OzGen AI Web

Landing site for OzGen AI, an AI-supported growth, automation and digital product studio for businesses.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl locale routing
- Resend contact email adapter
- GA4 and Microsoft Clarity behind consent
- Vitest and Playwright

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000/en`.

Locale routes:

- `/en`
- `/tr`
- `/de`
- `/fr`
- `/nl`
- `/it`
- `/es`

Plain `/`, `/about`, and `/contact` redirect through the locale proxy.

## Environment

Production contact delivery fails closed unless Resend and Turnstile are configured.

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL="OzGen AI <hello@ozgenai.com>"
CONTACT_TO_EMAIL=info@ozgenai.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RATE_LIMIT_SALT=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
```

In non-production, missing Resend credentials use a development no-op sender so the form can be tested locally without sending email.
For local Turnstile testing, Cloudflare provides test keys:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run e2e
```

If Playwright browsers are missing:

```bash
npx playwright install chromium
```

## Assets

Original generated service visuals live in `public/images`:

- `ozgen-ai-logo.png`
- `hero-systems-bg.webp`
- `trust-architecture-bg.webp`
- `service-ai-automation.webp`
- `service-websites.webp`
- `service-ai-content.webp`
- `service-apps-poster.webp`
- `service-consulting.webp`

The references section uses translated testimonials adapted from existing client feedback. Add richer client project cards only after screenshots/logos/outcomes are approved and verified.
