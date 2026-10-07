# Africa Education Empowerment Movement (AEEM) Platform

> Pioneering inclusive, equitable, and quality education across the African continent.

Canonical Site: https://www.aeemmovement.org
Live Application: https://aeem-w.vercel.app

## Architecture & Security

- Frontend: React 18, TypeScript, React Router 6, Vite, Tailwind CSS, Framer Motion
- Database & RLS: Supabase PostgreSQL (events, resources, impact_stories)
- Edge Security: submit-inquiry Edge Function with HMAC rate limiting & honeypot protection
- Local Commands: npm ci, npm run lint, npm run build, node scripts/test-edge-functions.mjs
