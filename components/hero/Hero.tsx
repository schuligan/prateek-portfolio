import { CardSwap } from "@/components/hero/CardSwap";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { siteContent } from "@/lib/content";
import type { FlagshipProject } from "@/lib/types";

const CAL_URL = "https://cal.com/prateek-jha";
const EMAIL = "mailto:masters.prateek@gmail.com";

const flagshipProjects = siteContent.projects.filter(
  (project): project is FlagshipProject => project.kind === "flagship",
);

/**
 * Hero — identity block + auto-cycling flagship deck + primary CTAs.
 * All copy comes from `siteContent`; layout is two-column on desktop,
 * stacked on mobile.
 */
export function Hero() {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
      <div className="flex-1 text-center lg:text-left">
        <KineticHeading
          text={siteContent.headline}
          className="text-4xl font-semibold leading-[1.18] tracking-tight text-ink sm:text-5xl lg:text-6xl"
        />
        <p className="mt-5 text-lg text-muted sm:text-xl">{siteContent.role}</p>
        <p className="mt-3 inline-flex items-center rounded-full border border-surface-border bg-surface px-4 py-1.5 text-sm text-muted">
          {siteContent.subhead}
        </p>
        <p className="mt-5 text-sm text-muted">{siteContent.humanLine}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <LightBeamButton href={CAL_URL} external>
            Book a call
          </LightBeamButton>
          <LightBeamButton href={EMAIL}>Send email</LightBeamButton>
        </div>
      </div>

      <div className="flex flex-1 justify-center">
        <CardSwap projects={flagshipProjects} />
      </div>
    </section>
  );
}
