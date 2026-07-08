"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImpactCard } from "@/lib/types";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ImpactSectionProps {
  cards: ImpactCard[];
}

/**
 * ImpactSection — the proof wall. Cards pop in with a staggered 3D tilt as the
 * section scrolls into view, and lift + scale on hover so a metric feels
 * tangible rather than static. Reduced-motion renders them flat and still.
 */
export function ImpactSection({ cards }: ImpactSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="impact-heading" className="w-full max-w-5xl">
      <h2
        id="impact-heading"
        className="mb-6 text-sm uppercase tracking-[0.3em] text-muted"
      >
        Impact
      </h2>
      <ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: 1000 }}
      >
        {cards.map((card, index) => (
          <motion.li
            key={card.id}
            initial={reduce ? false : { opacity: 0, y: 34, rotateX: -14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
            whileHover={
              reduce ? undefined : { scale: 1.06, y: -8, transition: { duration: 0.25 } }
            }
            className="rounded-2xl border border-surface-border bg-surface p-6 text-left transition-colors [transform-style:preserve-3d] hover:border-accent hover:shadow-[0_0_44px_-14px_#4fcbc0]"
          >
            <p className="text-xl font-semibold leading-tight text-accent">
              {card.headline}
            </p>
            <p className="mt-3 text-sm text-muted">{card.context}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
