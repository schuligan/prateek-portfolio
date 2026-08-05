# Graph Report - prateek-portfolio  (2026-08-05)

## Corpus Check
- 46 files · ~39,626 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 239 nodes · 304 edges · 22 communities (16 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 1% INFERRED · 1% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.72)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d40702f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- page.tsx
- devDependencies
- types.ts
- CLAUDE.md — Portfolio Engineering Governance
- compilerOptions
- Shipped feature set (foundation, design system, content-as-data, sections, SEO)
- dependencies
- Contact.tsx
- package.json
- include
- layout.tsx
- Stars.tsx
- MockIntersectionObserver
- opengraph-image.tsx
- block-dangerous-git.sh
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Shipped feature set (foundation, design system, content-as-data, sections, SEO)` - 10 edges
3. `FlagshipProject` - 7 edges
4. `include` - 7 edges
5. `CLAUDE.md — Portfolio Engineering Governance` - 7 edges
6. `docs/STATUS.md — project status ledger` - 7 edges
7. `scripts` - 6 edges
8. `ProjectBase` - 5 edges
9. `MockIntersectionObserver` - 5 edges
10. `Security & Git HARD rules (block-dangerous-git.sh, PR-only, secrets in Vercel env)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `AGENTS.md — 'Not the Next.js you know' breaking-changes warning` --conceptually_related_to--> `Architecture: Next.js App Router + Tailwind + GSAP + framer-motion → Vercel`  [AMBIGUOUS]
  AGENTS.md → CLAUDE.md
- `README.md — generic create-next-app boilerplate content` --conceptually_related_to--> `Live deployment: prateek-portfolio-ashen.vercel.app (auto-deploy on main)`  [AMBIGUOUS]
  README.md → docs/STATUS.md
- `CardSwapProps` --references--> `FlagshipProject`  [EXTRACTED]
  components/hero/CardSwap.tsx → lib/types.ts
- `CLAUDE.md — Portfolio Engineering Governance` --references--> `AGENTS.md — 'Not the Next.js you know' breaking-changes warning`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `Design System: Dark Aurora, Disciplined` --conceptually_related_to--> `Core palette: aqua #4FCBC0 core, magenta #E879F9 interaction spark`  [INFERRED]
  CLAUDE.md → docs/JARVIS-CORE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **** — claude_build_loop_models, github_workflows_ci_workflow, claude_git_security_hard [INFERRED 0.75]

## Communities (22 total, 6 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.09
Nodes (21): Home(), KIND_LABELS, PANEL_KINDS, panelGroups(), RepoGrid(), Aurora(), RepoFlipCard(), RepoFlipCardProps (+13 more)

### Community 1 - "devDependencies"
Cohesion: 0.06
Nodes (31): eslint, eslint-config-next, jsdom, devDependencies, eslint, eslint-config-next, jsdom, tailwindcss (+23 more)

### Community 2 - "types.ts"
Cohesion: 0.14
Nodes (20): CardSwap(), CardSwapProps, DEPTH_STYLES, flagshipProjects, EASE, ImpactSection(), ImpactSectionProps, EASE (+12 more)

### Community 3 - "CLAUDE.md — Portfolio Engineering Governance"
Cohesion: 0.11
Nodes (24): AGENTS.md — 'Not the Next.js you know' breaking-changes warning, Architecture: Next.js App Router + Tailwind + GSAP + framer-motion → Vercel, Build loop & model routing (Opus plan/review, Sonnet code, Haiku mechanical), Code standards (immutability, file size caps, compositor-friendly animation, WCAG 2.2 AA), Content-as-data model (projects + persona registries), Design System: Dark Aurora, Disciplined, Security & Git HARD rules (block-dangerous-git.sh, PR-only, secrets in Vercel env), Persona layer: /r/<persona> route overrides (+16 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 5 - "Shipped feature set (foundation, design system, content-as-data, sections, SEO)"
Cohesion: 0.12
Nodes (17): GitHub API build-time enrichment on curated repo grid (lib/projects.ts), Repo grid is curated (11 hand-authored hooks in lib/projects.ts); GitHub API adds live stars only, docs/STATUS.md — project status ledger, Not included by design: no résumé link, LinkedIn omitted, persona variants deferred, Live deployment: prateek-portfolio-ashen.vercel.app (auto-deploy on main), Open items: repo hook thumbnail images pending, confirm SITE_URL matches production domain, Rationale: vertical scroll kept; horizontal GSAP variant tried and reverted, Shipped feature set (foundation, design system, content-as-data, sections, SEO) (+9 more)

### Community 6 - "dependencies"
Cohesion: 0.12
Nodes (17): framer-motion, lenis, next, dependencies, framer-motion, lenis, next, react (+9 more)

### Community 7 - "Contact.tsx"
Cohesion: 0.27
Nodes (6): AiStack(), Contact(), LightBeamButton(), LightBeamButtonProps, aiStack, contact

### Community 8 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, start, test (+1 more)

### Community 9 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 10 - "layout.tsx"
Cohesion: 0.33
Nodes (4): fraunces, inter, metadata, SmoothScroll()

### Community 11 - "Stars.tsx"
Cohesion: 0.38
Nodes (6): buildBoxShadow(), createSeededRandom(), LAYERS, StarLayer(), StarLayerConfig, Stars()

## Ambiguous Edges - Review These
- `Architecture: Next.js App Router + Tailwind + GSAP + framer-motion → Vercel` → `AGENTS.md — 'Not the Next.js you know' breaking-changes warning`  [AMBIGUOUS]
  AGENTS.md · relation: conceptually_related_to
- `README.md — generic create-next-app boilerplate content` → `Live deployment: prateek-portfolio-ashen.vercel.app (auto-deploy on main)`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to
- `docs/JARVIS-CORE.md — The Core (Jarvis Sphere) spec` → `Shipped feature set (foundation, design system, content-as-data, sections, SEO)`  [AMBIGUOUS]
  docs/JARVIS-CORE.md · relation: conceptually_related_to

## Knowledge Gaps
- **88 isolated node(s):** `block-dangerous-git.sh script`, `fraunces`, `inter`, `metadata`, `size` (+83 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Architecture: Next.js App Router + Tailwind + GSAP + framer-motion → Vercel` and `AGENTS.md — 'Not the Next.js you know' breaking-changes warning`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `README.md — generic create-next-app boilerplate content` and `Live deployment: prateek-portfolio-ashen.vercel.app (auto-deploy on main)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `docs/JARVIS-CORE.md — The Core (Jarvis Sphere) spec` and `Shipped feature set (foundation, design system, content-as-data, sections, SEO)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `docs/STATUS.md — project status ledger` connect `Shipped feature set (foundation, design system, content-as-data, sections, SEO)` to `CLAUDE.md — Portfolio Engineering Governance`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `block-dangerous-git.sh script`, `fraunces`, `inter` to the rest of the system?**
  _88 weakly-connected nodes found - possible documentation gaps or missing edges._