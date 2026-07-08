import { Aurora } from "@/components/ambient/Aurora";
import { Hero } from "@/components/hero/Hero";
import { Stars } from "@/components/ambient/Stars";
import { Cursor } from "@/components/ui/Cursor";
import { Loader } from "@/components/ui/Loader";
import { HorizontalScroll } from "@/components/scroll/HorizontalScroll";
import { siteContent } from "@/lib/content";
import type { Project, ProjectKind } from "@/lib/types";

const KIND_LABELS: Record<ProjectKind, string> = {
  flagship: "Flagship builds",
  repo: "Open-source repos",
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

function ProjectCard({ project }: { project: Project }) {
  const title = project.kind === "repo" ? project.hook : project.title;
  const description =
    project.kind === "repo" ? project.useCase : project.blurb;

  return (
    <li className="rounded-2xl border border-surface-border bg-surface p-6 text-left">
      <p className="text-lg font-medium text-ink">{title}</p>
      <p className="mt-2 text-sm text-muted">{description}</p>
      {project.kind === "flagship" && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
        >
          View live
        </a>
      )}
      {project.kind === "repo" && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
        >
          View repo
        </a>
      )}
    </li>
  );
}

function ProjectPanel({ kind, group }: { kind: ProjectKind; group: Project[] }) {
  return (
    <section aria-labelledby={`${kind}-heading`} className="w-full max-w-4xl">
      <h2
        id={`${kind}-heading`}
        className="mb-6 text-sm uppercase tracking-[0.3em] text-muted"
      >
        {KIND_LABELS[kind]}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {group.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </section>
  );
}

/**
 * Home — the shell (fixed ambient + cursor + loader) plus the horizontal-
 * scroll panel track: Hero, then one panel per project group. The scroll is
 * progressive enhancement (see HorizontalScroll) — vertical everywhere by
 * default, horizontal on fine-pointer desktop with motion allowed.
 */
export default function Home() {
  const groups = panelGroups(siteContent.projects);
  const panels = [
    <Hero key="hero" />,
    ...groups.map(([kind, group]) => (
      <ProjectPanel key={kind} kind={kind} group={group} />
    )),
  ];

  return (
    <>
      <Loader />
      <Cursor />
      <Stars />
      <Aurora />

      <main className="relative z-10">
        <HorizontalScroll panels={panels} />
      </main>
    </>
  );
}
