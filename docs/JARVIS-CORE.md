# The Core — Jarvis Sphere (design + engineering spec)

A central, always-present WebGL sphere that reads as a living AI presence — it
breathes like an arc-reactor and anchors the site. Sections surface around it on
scroll; hover a card to expand-and-read; keep scrolling as the Core drifts,
rotates, and pulses. Full spec in the Notion PRD ("The Core" section).

## Components
- `components/core/Core.tsx` — R3F `<Canvas>` (fixed, `pointer-events:none`, DPR
  capped 1–1.5, `alpha`). `CoreMesh`: distorted emissive sphere (breathe +
  emissive pulse ~2.6/s), soft back-side glow shell, `Sparkles` particle field;
  rotates toward the cursor, drifts with `window.scrollY`.
- `components/core/CoreCanvas.tsx` — lazy `dynamic(ssr:false)` mount; renders
  `StaticCore` under reduced-motion.
- `components/core/StaticCore.tsx` — soft static aqua orb fallback.

## Guardrails
- Reduced-motion → `StaticCore`, no loop.
- Decorative + `aria-hidden`; content is fully readable/navigable with WebGL off.
- Lazy-imported so three.js is out of the first-paint bundle (LCP-safe).
- Palette: aqua `#4FCBC0` core, magenta `#E879F9` spark on interaction only.

## Known follow-ups (review backlog)
- Pause the frameloop when the tab is hidden / canvas off-screen.
- Mobile: consider a lighter Core (or static) on small/coarse-pointer devices.
- Section "spark flare" toward the active section (state: section-active).
- Hover-expand to a focused readable state with sibling dim (beyond current lift).
