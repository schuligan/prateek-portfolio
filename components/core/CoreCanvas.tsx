"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { StaticCore } from "./StaticCore";

// The 3D Core is client-only and lazy — it must never block first paint.
const Core = dynamic(() => import("./Core").then((m) => m.Core), {
  ssr: false,
  loading: () => <StaticCore />,
});

/**
 * CoreCanvas — mounts the living Jarvis Core only on a capable desktop with
 * motion allowed; otherwise a static orb. `mode` starts "pending" (→ StaticCore)
 * and only flips to "full" after a media check, so three.js is never even
 * downloaded on mobile / coarse-pointer / reduced-motion. Decorative + aria-hidden.
 */
export function CoreCanvas() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"pending" | "full" | "lite">("pending");

  useEffect(() => {
    const lite = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)",
    ).matches;
    // Media check runs once on mount; `pending` keeps SSR + first paint stable.
    // eslint-disable-next-line
    setMode(lite ? "lite" : "full");
  }, []);

  if (reduce || mode !== "full") return <StaticCore />;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Core />
    </div>
  );
}
