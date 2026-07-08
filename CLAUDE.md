@AGENTS.md
@.claude/positioning.local.md

# Portfolio — Engineering Governance

Living portfolio site for Prateek Jha. Copy/positioning strategy lives in the git-ignored `.claude/positioning.local.md` (local only).

## Design system — "Dark Aurora, Disciplined"
- Ground `#0A0E14` · text `#EDE6DA` / muted `#9BA3AE` · accent aqua `#3DE1C4` · spark magenta `#E879F9` (rare hover/active only).
- Fonts: Space Grotesk (display) + Inter (body), `font-display: swap`.
- Near-monochrome UI + one accent. Colorful project thumbnails supply the color.

## Architecture
- Next.js (App Router) + Tailwind + GSAP + framer-motion → Vercel.
- **Content-as-data:** projects registry + persona registry (`/lib/personas.ts`). Adding a project/persona = a data entry, not a redesign.
- **Persona layer:** route `/r/<persona>` (base = default). Overrides headline/subhead/résumé/order/accent only.
- GitHub API build-time sync of public `schuligan` repos for the project grid.

## Security & git (HARD)
- `.claude/hooks/block-dangerous-git.sh` blocks force-push, reset --hard, clean -f, branch -D, checkout ., rm -rf, and direct-to-main push.
- **Always work on a feature branch → PR → merge.** Never push directly to `main`.
- Secrets live in Vercel env, never in the repo. Every PR runs secret-scan + `npm audit`.

## Build loop & models
- Per-story: branch → build → DevSecOps scans → CI gates → verify → merge → deploy.
- Models: Opus = plan/architecture/review/verify. Sonnet = feature coding. Haiku = trivial mechanical.

## Code standards
- Immutable patterns (new objects, no mutation). Small focused files (<400 lines typical, 800 max).
- Compositor-friendly animation only (transform/opacity/clip-path). Respect `prefers-reduced-motion`.
- Perf budget: <80kb JS first paint, LCP<2.5s, CLS<0.1. AVIF/WebP images w/ explicit dimensions.
- WCAG 2.2 AA, keyboard nav, semantic HTML, focus states.
