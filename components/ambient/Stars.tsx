"use client";

import { useMemo } from "react";

/**
 * Stars — pure-CSS parallax starfield over a radial-gradient space ground.
 * Three box-shadow "dot field" layers (small/medium/big) scroll vertically
 * at different speeds (50s/100s/150s) for a depth illusion. Each layer's
 * field is rendered twice, stacked back-to-back, then the whole pair is
 * translated by exactly one field-height so the loop is seamless.
 *
 * Positions are generated with a small seeded PRNG (not Math.random) so the
 * server-rendered markup and the client hydration pass produce identical
 * output — avoids hydration mismatches for this client component.
 */

const FIELD_SIZE = 1000;

type StarLayerConfig = {
  seed: number;
  count: number;
  size: number;
  opacity: number;
  duration: number;
};

const LAYERS: StarLayerConfig[] = [
  { seed: 1, count: 220, size: 1, opacity: 0.8, duration: 150 },
  { seed: 2, count: 90, size: 2, opacity: 0.85, duration: 100 },
  { seed: 3, count: 40, size: 3, opacity: 0.9, duration: 50 },
];

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function buildBoxShadow(config: StarLayerConfig): string {
  const random = createSeededRandom(config.seed);
  const shadows: string[] = [];
  for (let i = 0; i < config.count; i += 1) {
    const x = Math.floor(random() * FIELD_SIZE);
    const y = Math.floor(random() * FIELD_SIZE);
    shadows.push(`${x}px ${y}px var(--color-ink)`);
  }
  return shadows.join(", ");
}

function StarLayer({ config }: { config: StarLayerConfig }) {
  const boxShadow = useMemo(() => buildBoxShadow(config), [config]);

  const dotStyle = {
    position: "absolute" as const,
    width: config.size,
    height: config.size,
    borderRadius: "9999px",
    background: "transparent",
    boxShadow,
    opacity: config.opacity,
  };

  return (
    <div
      className="absolute inset-x-0 top-0"
      style={{
        height: FIELD_SIZE * 2,
        animation: `star-scroll ${config.duration}s linear infinite`,
        willChange: "transform",
      }}
    >
      <div style={{ ...dotStyle, top: 0, left: 0 }} />
      <div style={{ ...dotStyle, top: FIELD_SIZE, left: 0 }} />
    </div>
  );
}

export function Stars() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #10151f 0%, var(--color-ground) 70%)",
      }}
    >
      {LAYERS.map((config) => (
        <StarLayer key={config.seed} config={config} />
      ))}
    </div>
  );
}
