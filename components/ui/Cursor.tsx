"use client";

import { useEffect, useRef } from "react";

const LERP_FACTOR = 0.15;
const HOVER_SCALE = 2.2;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, select, textarea, label';

/**
 * Cursor — 32px difference-blend dot that trails the pointer with a smooth
 * lerp and scales up over interactive elements. Desktop-only: hidden via CSS
 * for touch / coarse pointers, and the follow loop skips entirely under
 * prefers-reduced-motion (position snaps instead of easing).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      dot.style.opacity = "1";
      targetX = event.clientX;
      targetY = event.clientY;
      const hoveredInteractive = (event.target as Element | null)?.closest(
        INTERACTIVE_SELECTOR,
      );
      targetScale = hoveredInteractive ? HOVER_SCALE : 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const tick = () => {
      if (reducedMotion) {
        currentX = targetX;
        currentY = targetY;
        scale = targetScale;
      } else {
        currentX += (targetX - currentX) * LERP_FACTOR;
        currentY += (targetY - currentY) * LERP_FACTOR;
        scale += (targetScale - scale) * LERP_FACTOR;
      }
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full bg-white opacity-0 [mix-blend-mode:difference]"
    />
  );
}
