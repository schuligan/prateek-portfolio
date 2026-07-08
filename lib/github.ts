/**
 * Build-time GitHub sync. Fetches public repo metadata for `schuligan` so the
 * repo cards can show live stars + last-updated without hardcoding them.
 * Revalidates daily. Fails soft: on any error returns an empty map and the
 * cards fall back to their static content.
 */

const GITHUB_USER = "schuligan";
const REVALIDATE_SECONDS = 86_400; // daily

export interface RepoMeta {
  stars: number;
  pushedAt: string | null;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  pushed_at: string;
}

export async function fetchRepoMeta(): Promise<Record<string, RepoMeta>> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return {};

    const repos = (await res.json()) as GitHubRepo[];
    if (!Array.isArray(repos)) return {};

    return Object.fromEntries(
      repos.map((repo) => [
        repo.name,
        { stars: repo.stargazers_count ?? 0, pushedAt: repo.pushed_at ?? null },
      ]),
    );
  } catch {
    return {};
  }
}

/** Extracts the repo name from a `github.com/<user>/<name>` URL. */
export function repoNameFromUrl(url: string): string {
  return url.split("/").filter(Boolean).pop() ?? "";
}
