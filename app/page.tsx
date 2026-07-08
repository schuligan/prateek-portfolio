import { Aurora } from "@/components/ambient/Aurora";
import { Hero } from "@/components/hero/Hero";
import { Stars } from "@/components/ambient/Stars";
import { Cursor } from "@/components/ui/Cursor";
import { Loader } from "@/components/ui/Loader";
import { RepoFlipCard } from "@/components/cards/RepoFlipCard";
import { ImpactSection } from "@/components/impact/ImpactSection";
import { AiStack } from "@/components/sections/AiStack";
import { Contact } from "@/components/sections/Contact";
import { siteContent } from "@/lib/content";
import { fetchRepoMeta, repoNameFromUrl, type RepoMeta } from "@/lib/github";
import type { Project, ProjectKind, RepoProject } from "@/lib/types";

const KIND_LABELS: Record<ProjectKind, string> = {
  flagship: "Flagship builds",
  repo: "Built by directing AI — not by coding",
  capability: "Capabilities",
  current: "Currently",
};

// Flagship is showcased in the Hero deck, so it is not repeated as a panel.
const PANEL_KINDS: ProjectKind[] = ["repo", "capability", "current"];

function panelGroups(projects: Project[]): [ProjectKind, Project[]][] {
  return PANEL_KINDS.map((kind): [ProjectKind, Project[]] => [
    kind,
    projects.filter((project) => project.kind === kind),
  ]).filter(([, group]) => group.length > 0);
}

function SimpleCard({ title, blurb }: { title: string; blurb: string }) {
  return (
    <li className="rounded-2xl border border-surface-border bg-surface p-6 text-left">
      <p className="text-lg font-medium text-ink">{title}</p>
      <p className="mt-2 text-sm text-muted">{blurb}</p>
    </li>
  );
}

function RepoGrid({
  repos,
  meta,
}: {
  repos: RepoProject[];
  meta: Record<string, RepoMeta>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <RepoFlipCard
          key={repo.id}
          hook={repo.hook}
          useCase={repo.useCase}
          githubUrl={repo.githubUrl}
          stars={meta[repoNameFromUrl(repo.githubUrl)]?.stars}
        />
      ))}
    </div>
  );
}

function Panel({
  kind,
  group,
  meta,
}: {
  kind: ProjectKind;
  group: Project[];
  meta: Record<string, RepoMeta>;
}) {
  return (
    <section aria-labelledby={`${kind}-heading`} className="w-full max-w-5xl">
      <h2
        id={`${kind}-heading`}
        className="mb-6 text-sm uppercase tracking-[0.3em] text-muted"
      >
        {KIND_LABELS[kind]}
      </h2>
      {kind === "repo" ? (
        <RepoGrid repos={group as RepoProject[]} meta={meta} />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {group.map((project) => (
            <SimpleCard
              key={project.id}
              title={project.title}
              blurb={"blurb" in project ? project.blurb : ""}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Home — the fixed shell plus the horizontal-scroll panel track: Hero, then a
 * panel per project group. Repo cards are enriched at build time with live
 * GitHub stars (fails soft). Horizontal scroll is progressive enhancement.
 */
export default async function Home() {
  const meta = await fetchRepoMeta();
  const groups = panelGroups(siteContent.projects);
  const panels = [
    <Hero key="hero" />,
    <ImpactSection key="impact" cards={siteContent.impactCards} />,
    ...groups.map(([kind, group]) => (
      <Panel key={kind} kind={kind} group={group} meta={meta} />
    )),
    <AiStack key="stack" />,
    <Contact key="contact" />,
  ];

  return (
    <>
      <Loader />
      <Cursor />
      <Stars />
      <Aurora />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-28 px-6 py-24">
        {panels}
      </main>
    </>
  );
}
