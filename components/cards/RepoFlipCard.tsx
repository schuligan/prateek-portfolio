"use client";

import { useState } from "react";

interface RepoFlipCardProps {
  hook: string;
  useCase: string;
  githubUrl: string;
  stars?: number;
}

/**
 * RepoFlipCard — YouTube-thumbnail-style flip card. Front = a hook title over
 * an abstract aqua gradient (real generated hook images land in Epic 9). It
 * flips to reveal the plain-English use case + repo link. Flips on hover
 * (mouse), focus-within (keyboard), and tap (touch, via state). The repo link
 * stops propagation so a tap on it navigates instead of flipping back.
 */
export function RepoFlipCard({
  hook,
  useCase,
  githubUrl,
  stars,
}: RepoFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group h-44 [perspective:1000px]"
      onClick={() => setFlipped((value) => !value)}
    >
      <div
        data-flipped={flipped}
        className="relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] data-[flipped=true]:[transform:rotateY(180deg)]"
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col justify-end rounded-2xl border border-surface-border p-5 [backface-visibility:hidden]"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklch, var(--color-accent) 22%, var(--color-ground)), var(--color-ground))",
          }}
        >
          <p className="text-lg font-semibold text-ink">{hook}</p>
          {typeof stars === "number" && stars > 0 && (
            <p className="mt-1 text-xs text-muted">★ {stars}</p>
          )}
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-surface-border bg-surface p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm text-muted">{useCase}</p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="text-sm font-medium text-accent hover:underline"
          >
            View repo →
          </a>
        </div>
      </div>
    </div>
  );
}
