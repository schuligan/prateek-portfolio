"use client";

import Image from "next/image";
import { useState } from "react";

interface RepoFlipCardProps {
  hook: string;
  useCase: string;
  githubUrl: string;
  thumbSrc?: string;
  stars?: number;
}

/**
 * RepoFlipCard — YouTube-thumbnail-style flip card. Front = a generated hook
 * image (falls back to an aqua gradient) with the hook title over a scrim. It
 * flips to reveal the plain-English use case + repo link. Flips on hover
 * (mouse), focus-within (keyboard), and tap (touch, via state). The repo link
 * stops propagation so a tap on it navigates instead of flipping back.
 */
export function RepoFlipCard({
  hook,
  useCase,
  githubUrl,
  thumbSrc,
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
