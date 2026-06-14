# Architectural Memory

## Tech Stack
- **Framework:** Next.js 15 (App Router / hybrid)
- **Styling:** Tailwind CSS
- **Backend Services:** Appwrite (databases, bucket, users)
- **Automations:** n8n webhooks (booking, newsletter, contact, blog publishing)

## Key Patterns

### GDPR/CCPA Consent & Google AdSense Gating
- AdSense crawler verification is placed unconditionally in the `<head>` using `<meta name="google-adsense-account" content="..." />` and the AdSense script tag to enable verification.
- Ad units (`<AdBanner />`) are strictly gated by user consent (marketing cookies set to `true`). They listen to `konjit:consentUpdate` CustomEvents emitted by `CookieConsent.tsx`.
- Default publisher ID is set to `ca-pub-6775298130218510` as a fallback when `process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID` is not configured.
- Default slot ID for the blog ads is `4783671292`.
