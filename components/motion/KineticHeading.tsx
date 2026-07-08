"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * KineticHeading — renders an h1 whose words wipe up from a mask, staggered.
 * The full text is exposed to assistive tech via aria-label; the animated
 * word spans are aria-hidden. Reduced-motion renders the plain heading.
 */
export function KineticHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{text}</h1>;

  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: index * 0.05, ease: EASE }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
