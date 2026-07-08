import type { SiteContent } from "./types";
import { projects } from "./projects";
import { impactCards } from "./impact";

// Persona variants deferred post-launch — this base content is the single
// source of truth; a persona override layer can wrap it later.
export const siteContent: SiteContent = {
  headline: "I scale products, teams, and the systems they run on.",
  role: "AI Product & Program Leader",
  subhead: "MBA, Schulich · Computer Science background",
  humanLine:
    "On weekends I ship small games, just to keep my hands in the work.",
  projects,
  impactCards,
};
