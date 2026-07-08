"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

const PULL = 0.35;

interface LightBeamButtonProps {
  children: ReactNode;
  /** When set, renders an anchor; otherwise a button. */
  href?: string;
  /** Anchor-only: opens in a new tab with safe rel. */
  external?: boolean;
  className?: string;
}

/**
 * LightBeamButton — glassmorphism pill (see globals.css) with a slow accent
 * sheen and a magnetic pull toward the cursor. Renders an <a> when `href` is
 * given, else a <button>. Magnetism + sheen are disabled under reduced-motion.
 */
export function LightBeamButton({
  children,
  href,
  external,
  className = "",
}: LightBeamButtonProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16 });
  const y = useSpring(my, { stiffness: 220, damping: 16 });

  function handleMove(event: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * PULL);
    my.set((event.clientY - (rect.top + rect.height / 2)) * PULL);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const classes = `light-beam ${className}`.trim();
  const inner = <span className="light-beam-inner">{children}</span>;
  const motionProps = {
    style: { x, y },
    onPointerMove: handleMove,
    onPointerLeave: reset,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={classes} {...motionProps}>
      {inner}
    </motion.button>
  );
}
