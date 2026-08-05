import type { Project } from "./types";

/**
 * The project registry. Adding a project is a data entry here, not a
 * component change — see `lib/types.ts` for the shapes each kind expects.
 */
export const projects: Project[] = [
  // --- Flagship: marquee builds with a live URL ---
  {
    id: "port-call-jebel-ali",
    kind: "flagship",
    title: "Port Call: Jebel Ali",
    blurb: "3D low-poly ship-handling sim, 110 tests.",
    liveUrl: "https://port-call-jebel-ali.vercel.app",
  },
  {
    id: "captain-chaos",
    kind: "flagship",
    title: "Captain Chaos",
    blurb: "Arcade water-spectacle harbor game.",
    liveUrl: "https://captain-chaos.vercel.app",
  },
  {
    id: "prodgeek-lab",
    kind: "flagship",
    title: "Prodgeek Lab",
    blurb: "AI venture studio, built and run by agents.",
    liveUrl: "https://prodgeek-lab.vercel.app",
  },
  {
    id: "byebyeboss",
    kind: "flagship",
    title: "ByeByeBoss",
    blurb: "Free custom arcade GIF generator.",
    liveUrl: "https://byebyeboss.vercel.app",
  },

  // --- Repo: public repos framed by the problem they solve ---
  {
    id: "operations-knowledge-copilot",
    kind: "repo",
    title: "operations-knowledge-copilot",
    hook: "Team Brain",
    useCase:
      "Ask your company's docs a question, get a cited answer — with a human approving what gets written back.",
    githubUrl: "https://github.com/schuligan/operations-knowledge-copilot",
  },
  {
    id: "model-router",
    kind: "repo",
    title: "model-router",
    hook: "LLM Traffic Cop",
    useCase:
      "Auto-picks the right AI model per task by matching job needs against a model registry.",
    githubUrl: "https://github.com/schuligan/model-router",
  },
  {
    id: "prompt-library",
    kind: "repo",
    title: "prompt-library",
    hook: "Prompts, Versioned",
    useCase:
      "Version-controlled system prompts with a tiny eval harness that A/B-scores which variant wins.",
    githubUrl: "https://github.com/schuligan/prompt-library",
  },
  {
    id: "agentic-test-runner",
    kind: "repo",
    title: "agentic-test-runner",
    hook: "Tests That Write Themselves",
    useCase:
      "Spec → generated test cases → tracker tickets → agents pick up, run, and report.",
    githubUrl: "https://github.com/schuligan/agentic-test-runner",
  },
  {
    id: "nightshift",
    kind: "repo",
    title: "nightshift",
    hook: "Agents on a Leash",
    useCase:
      "Run an AI agent unsupervised inside hard guardrails — autonomy without runaway risk.",
    githubUrl: "https://github.com/schuligan/nightshift",
  },
  {
    id: "agentic-pipeline-starter",
    kind: "repo",
    title: "agentic-pipeline-starter",
    hook: "Multi-Agent, Clone-and-Go",
    useCase:
      "A scaffold for multi-agent systems: orchestrator + specialist sub-agents with tool wiring.",
    githubUrl: "https://github.com/schuligan/agentic-pipeline-starter",
  },
  {
    id: "support-ticket-router",
    kind: "repo",
    title: "support-ticket-router",
    hook: "Inbox → Resolved",
    useCase:
      "Inbound email/Slack gets triaged, ticketed, and auto-resolved from the KB when confidence is high.",
    githubUrl: "https://github.com/schuligan/support-ticket-router",
  },
  {
    id: "second-brain-os",
    kind: "repo",
    title: "second-brain-os",
    hook: "Thoughts, Filed",
    useCase:
      "A Markdown/Obsidian second brain that classifies a thought, suggests tags + links, and files it.",
    githubUrl: "https://github.com/schuligan/second-brain-os",
  },
  {
    id: "doc-triage-hitl",
    kind: "repo",
    title: "doc-triage-hitl",
    hook: "Sorting at Scale, Safely",
    useCase:
      "LLM sorts docs + inbox into a taxonomy, with a human-in-the-loop queue for the calls that matter.",
    githubUrl: "https://github.com/schuligan/doc-triage-hitl",
  },
  {
    id: "personal-jarvis",
    kind: "repo",
    title: "personal-jarvis",
    hook: "A CLI Jarvis",
    useCase:
      "Command-line AI assistant with an explicit plan → act → observe loop, guardrails, and a tool layer.",
    githubUrl: "https://github.com/schuligan/personal-jarvis",
  },
  {
    id: "claude-skills-collection",
    kind: "repo",
    title: "claude-skills-collection",
    hook: "My Claude Toolkit",
    useCase:
      "Reusable Claude Code skills for planning, QA, process diagrams, status reports.",
    githubUrl: "https://github.com/schuligan/claude-skills-collection",
  },

  // --- Capability: scrubbed patterns proven on client work, no client names ---
  {
    id: "inbox-to-resolution-engine",
    kind: "capability",
    title: "Inbox-to-Resolution Engine",
    blurb:
      "Auto-scans an inbox → extracts structured data → analyzes → drafts and bulk-sends replies on the exact mail thread.",
  },
  {
    id: "local-first-data-pipeline",
    kind: "capability",
    title: "Local-First Data Pipeline",
    blurb:
      "On-device LLM cleans and classifies sensitive data, ships SQL, end-to-end analysis. Nothing leaves the machine.",
  },
  {
    id: "orchestrator-led-agent-team",
    kind: "capability",
    title: "Orchestrator-Led Agent Team",
    blurb:
      "One conversation with an orchestrator; a specialist agent team carries the work end to end. Built for tokenization and periodic KYC refresh in a regulated environment — humans stay on the decisions, agents take the throughput.",
  },

  // --- Current: work in flight right now ---
  {
    id: "psw-healthtech-platform",
    kind: "current",
    title: "PSW Healthtech Platform",
    blurb:
      "Leading product for a healthtech platform serving Personal Support Workers in Canada — from problem to roadmap.",
  },
  {
    id: "stablecoin-platform",
    kind: "current",
    title: "Stablecoin Payments Platform",
    blurb:
      "Product Owner for a stablecoin payments platform — driving spec to ship in a regulated fintech environment.",
  },
  {
    id: "vessel",
    kind: "current",
    title: "Vessel",
    blurb:
      "An embodiment layer for AI agents: give any agent a name, an animated face, a voice and a personality. Live, interruptible conversation instead of a chat box — it wraps your agent rather than replacing its brain.",
  },
  {
    id: "singularity",
    kind: "current",
    title: "Singularity",
    blurb:
      "A user-owned data-to-value network — coordination across sovereign human and machine intelligence, built contract-first from a written product constitution through to running agent services.",
  },
  {
    id: "work-triage-system",
    kind: "current",
    title: "Work Triage System",
    blurb:
      "Capture a request from anywhere — a phone screenshot, an upload, a typed line — triage it through a priority matrix into Do / Schedule / Delegate / Drop, and get a daily digest so nothing is silently forgotten.",
  },
];
