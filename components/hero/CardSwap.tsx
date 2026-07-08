"use client";

import { useEffect, useState } from "react";
import type { FlagshipProject } from "@/lib/types";

const ADVANCE_MS = 3500;

/** Stack styling per depth (0 = front). Compositor-friendly transforms only. */
const DEPTH_STYLES = [
  { y: 0, scale: 1, opacity: 1, z: 40, blur: 0 },
  { y: -18, scale: 0.94, opacity: 0.85, z: 30, blur: 0 },
  { y: -36, scale: 0.88, opacity: 0.55, z: 20, blur: 1 },
  { y: -54, scale: 0.82, opacity: 0.3, z: 10, blur: 2 },
];

interface CardSwapProps {
  projects: FlagshipProject[];
}

/**
 * CardSwap — a 3D-ish auto-cycling deck of flagship builds. The front card
 * advances every ADVANCE_MS; hovering pauses it. Under reduced-motion the
 * deck is static (no interval). Each card is a link to its live site.
 */
export function CardSwap({ projects }: CardSwapProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = projects.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const id = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [count, paused]);

  return (
    <div
      className="relative h-80 w-full max-w-sm [perspective:1200px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Flagship builds"
    >
      {projects.map((project, index) => {
        const depth = (index - active + count) % count;
        const style = DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length - 1)];
        const isFront = depth === 0;

        return (
          <a
            key={project.id}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden={!isFront}
            tabIndex={isFront ? 0 : -1}
            className="absolute inset-0 flex flex-col justify-end rounded-3xl border border-surface-border bg-surface p-6 backdrop-blur-xl transition-all duration-500 ease-out"
            style={{
              transform: `translateY(${style.y}px) scale(${style.scale})`,
              opacity: style.opacity,
              zIndex: style.z,
              filter: style.blur ? `blur(${style.blur}px)` : undefined,
              pointerEvents: isFront ? "auto" : "none",
              background:
                "linear-gradient(160deg, color-mix(in oklch, var(--color-accent) 10%, var(--color-surface)), var(--color-surface))",
            }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              Live build
            </p>
            <p className="mt-2 text-xl font-semibold text-ink">
              {project.title}
            </p>
            <p className="mt-1 text-sm text-muted">{project.blurb}</p>
          </a>
        );
      })}
    </div>
  );
}
