"use client";

import { useState } from "react";

const STREAK_COUNT = 8;

/**
 * Loader — hyper-speed page-load overlay in the ink+aqua palette. A ring of
 * thin aqua streaks fires outward on a staggered CSS loop; the overlay then
 * dismisses itself via the CSS `loader-dismiss` animation, so content is
 * reachable even with JS disabled or hydration failed. `onAnimationEnd`
 * unmounts it once dismissed (progressive enhancement). Under reduced-motion
 * the global rule collapses the animations, so it clears near-instantly.
 */
export function Loader() {
  const [done, setDone] = useState(false);
  if (done) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      onAnimationEnd={(event) => {
        if (event.animationName.includes("loader-dismiss")) setDone(true);
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ground"
      style={{ animation: "loader-dismiss 0.3s ease-out 0.35s forwards" }}
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
