import { Aurora } from "@/components/ambient/Aurora";
import { Hero } from "@/components/hero/Hero";
import { Stars } from "@/components/ambient/Stars";
import { Cursor } from "@/components/ui/Cursor";
import { Loader } from "@/components/ui/Loader";
import { siteContent } from "@/lib/content";
import type { Project, ProjectKind } from "@/lib/types";

const KIND_LABELS: Record<ProjectKind, string> = {
  flagship: "Flagship builds",
  repo: "Open-source repos",
  capability: "Capabilities",
  current: "Currently",
};

const KIND_ORDER: ProjectKind[] = [
  "flagship",
  "repo",
  "capability",
  "current",
];

function groupProjectsByKind(projects: Project[]): [ProjectKind, Project[]][] {
  return KIND_ORDER.map((kind): [ProjectKind, Project[]] => [
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

/**
 * Renders the site's typed content (see `lib/content.ts`). All
 * positioning-governed copy comes from `siteContent`; only presentational
 * labels (section headings, CTA text) are inline. Data-wiring pass (Epic 3);
 * rich cards and motion land in Epics 4/6.
 */
export default function Home() {
  const groupedProjects = groupProjectsByKind(siteContent.projects);

  return (
    <>
      <Loader />
      <Cursor />
      <Stars />
      <Aurora />

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 py-32">
        <Hero />

        <div className="mt-20 w-full max-w-4xl space-y-16">
          {groupedProjects.map(([kind, group]) => (
            <section key={kind} aria-labelledby={`${kind}-heading`}>
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
          ))}
        </div>
      </main>
    </>
  );
}
