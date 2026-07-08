# Status

**Live:** https://prateek-portfolio-ashen.vercel.app (Vercel auto-deploys `main`).

## Shipped
Foundation (repo, CI/CD, git guardrails) · Design system (dark-aurora tokens, fonts, Aurora/Stars/Cursor/Loader) · Content-as-data model · Hero (CardSwap flagship deck + LightBeam CTAs) · Impact section (8 vetted metrics) · Repo flip-grid + GitHub-stars sync · Capabilities · Current (PSW) · AI Stack · Contact (Book a call + Send email + GitHub) · SEO/OG/robots/sitemap.

Scroll is **vertical** (a horizontal GSAP variant was tried and reverted).

## Not included by design
- No résumé link (CTAs are Book a call + Send email).
- LinkedIn omitted until the real vanity URL is confirmed (add to `lib/contact.ts`).
- Persona / multi-résumé variants: deferred post-launch (seam in `lib/content.ts`).

## How to run
`npm install && npm run dev` (port 3000). Gates: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Conventions
Content-as-data — add a project = one entry in `lib/projects.ts`. Copy rules + positioning live in `.claude/positioning.local.md` (git-ignored). Never push to `main` (protected; PR only). See `CLAUDE.md`.

## Notes
- Repo grid is **curated** (11 hand-authored hooks in `lib/projects.ts`). The GitHub API adds live stars only — new public repos do **not** auto-list (would need dynamic rendering + per-repo hook copy).

## Open
- Repo hook images (Codex + GPT-image, `codex-image-prompt.md` in the parent project) → `public/repo-thumbs/`.
- Confirm `SITE_URL` matches the production domain in `layout.tsx`/`robots.ts`/`sitemap.ts`.
