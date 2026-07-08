/**
 * Content-as-data types for the portfolio.
 *
 * Everything the site renders — projects, impact metrics — is a typed data
 * entry here. Adding a project means adding a data entry in `projects.ts`,
 * never touching a component.
 *
 * Persona variants deferred post-launch — this base content is the single
 * source; a persona override layer can wrap it later.
 */

/** The four flavors of project card the site knows how to render. */
export type ProjectKind = "flagship" | "repo" | "capability" | "current";

interface ProjectBase {
  /** Stable slug used for React keys and future persona ordering. */
  id: string;
  title: string;
}

/** A marquee build with a live URL — the top-of-page showcase pieces. */
export interface FlagshipProject extends ProjectBase {
  kind: "flagship";
  blurb: string;
  liveUrl: string;
}

/** A public repo, framed by the problem it solves rather than its stack. */
export interface RepoProject extends ProjectBase {
  kind: "repo";
  /** Short, punchy title shown above the use case (e.g. "Team Brain"). */
  hook: string;
  useCase: string;
  githubUrl: string;
}

/** A scrubbed capability proven on client work — no client names. */
export interface CapabilityProject extends ProjectBase {
  kind: "capability";
  blurb: string;
}

/** Work in flight right now. */
export interface CurrentProject extends ProjectBase {
  kind: "current";
  blurb: string;
}

export type Project =
  | FlagshipProject
  | RepoProject
  | CapabilityProject
  | CurrentProject;

/**
 * A single before→after metric. Left as an empty array until Epic 7 — real
 * numbers need Prateek's explicit vet before they ship (see positioning
 * rules in .claude/positioning.local.md).
 */
export interface ImpactCard {
  id: string;
  headline: string;
  context: string;
}

/** The full set of typed content the site renders. */
export interface SiteContent {
  headline: string;
  role: string;
  subhead: string;
  humanLine: string;
  projects: Project[];
  impactCards: ImpactCard[];
}
