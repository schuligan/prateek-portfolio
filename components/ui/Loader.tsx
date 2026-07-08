"use client";

import { useEffect, useState } from "react";

const STREAK_COUNT = 8;
const MIN_VISIBLE_MS = 500;

/**
 * Loader — hyper-speed page-load overlay in the ink+aqua palette. A ring of
 * thin aqua streaks fires outward on a staggered CSS animation loop; the
 * whole thing fades out once the page has settled. Under reduced-motion the
 * global rule in app/globals.css collapses the streak animation to a static
 * frame, so this only ever adds a fade transition, never motion.
 */
export function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFading(true), MIN_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      onTransitionEnd={() => {
        if (fading) setVisible(false);
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ground transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="relative h-24 w-24">
        {Array.from({ length: STREAK_COUNT }, (_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-px w-12 origin-left rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent), transparent)",
              transform: `rotate(${(360 / STREAK_COUNT) * index}deg)`,
              animation: "loader-streak 1.1s ease-out infinite",
              animationDelay: `${(index / STREAK_COUNT) * 1.1}s`,
            }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
    </div>
  );
}
