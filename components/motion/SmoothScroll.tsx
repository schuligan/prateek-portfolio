"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * SmoothScroll — wraps the app in Lenis for a premium, inertial scroll feel.
 * Lenis smooths native scrolling (it does not hijack it), so keyboard and
 * anchor navigation still work. Disabled entirely under reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
