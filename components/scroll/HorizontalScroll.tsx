"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface HorizontalScrollProps {
  panels: ReactNode[];
}

/**
 * HorizontalScroll — progressive enhancement. By default (SSR, mobile, coarse
 * pointer, reduced-motion, no-JS) the panels render as a normal vertical
 * stack, so content is always reachable. On a fine-pointer desktop with
 * motion allowed, GSAP ScrollTrigger (lazy-imported) pins the section and
 * scrubs the panel track horizontally as the user scrolls vertically — the
 * signature interaction, with no wheel-hijacking.
 */
export function HorizontalScroll({ panels }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop.matches || reduce) return;

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      setHorizontal(true);

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            pin: true,
            scrub: 1,
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }, section);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={trackRef}
        className={horizontal ? "flex flex-row flex-nowrap" : "flex flex-col gap-28"}
      >
        {panels.map((panel, index) => (
          <div
            key={index}
            className={
              horizontal
                ? "flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-y-auto px-10 py-16"
                : "w-full"
            }
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
