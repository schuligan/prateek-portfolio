"use client";

import Image from "next/image";

interface RepoFlipCardProps {
  hook: string;
  useCase: string;
  githubUrl: string;
  thumbSrc?: string;
  stars?: number;
}

/**
 * RepoFlipCard — the whole card is a single link to the repo (semantic +
 * keyboard-clean, no non-interactive click handler). Front = generated hook
 * image + title over a scrim; it flips to reveal the use case on hover and on
 * keyboard focus (group-focus-within). Tapping/activating anywhere opens the
 * repo. Motion freezes under the global reduced-motion rule.
 */
export function RepoFlipCard({
  hook,
  useCase,
  githubUrl,
  thumbSrc,
  stars,
}: RepoFlipCardProps) {
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${hook}: ${useCase} — opens the GitHub repo`}
      className="group block h-44 rounded-2xl [perspective:1000px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-surface-border [backface-visibility:hidden]">
          {thumbSrc ? (
            <Image
              src={thumbSrc}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, color-mix(in oklch, var(--color-accent) 22%, var(--color-ground)), var(--color-ground))",
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-lg font-semibold text-ink">{hook}</p>
            {typeof stars === "number" && stars > 0 && (
              <p className="mt-1 text-xs text-muted">★ {stars}</p>
            )}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-surface-border bg-surface p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm text-muted">{useCase}</p>
          <span className="text-sm font-medium text-accent">View repo →</span>
        </div>
      </div>
    </a>
  );
}
