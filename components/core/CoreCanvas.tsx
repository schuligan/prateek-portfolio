"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { StaticCore } from "./StaticCore";

// The 3D Core is client-only and lazy — it must never block first paint.
const Core = dynamic(() => import("./Core").then((m) => m.Core), {
  ssr: false,
  loading: () => <StaticCore />,
});

/**
 * CoreCanvas — mounts the living Jarvis Core, or a static orb under
 * reduced-motion. Decorative (aria-hidden); the page is fully usable without it.
 */
export function CoreCanvas() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticCore />;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Core />
    </div>
  );
}
