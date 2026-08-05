/**
 * Generates abstract card art for cards with no screenshot (capabilities and
 * in-flight work), in the house style: ink ground, aqua line-work, one motif
 * per concept. Deterministic — rerun to regenerate.
 *
 *   node scripts/gen-card-art.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = "public/card-art";
const W = 1280;
const H = 800;
const AQUA = "#4fcbc0";

const bg = `
  <defs>
    <radialGradient id="glow" cx="62%" cy="38%" r="62%">
      <stop offset="0%" stop-color="${AQUA}" stop-opacity="0.30"/>
      <stop offset="55%" stop-color="${AQUA}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#080b10" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080b10" stop-opacity="0"/>
      <stop offset="100%" stop-color="#080b10" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#080b10"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>`;

const stroke = (o = 0.55, w = 2) =>
  `fill="none" stroke="${AQUA}" stroke-opacity="${o}" stroke-width="${w}"`;

/** Funnel of streams converging into a single resolved node. */
const inbox = () => {
  let s = "";
  for (let i = 0; i < 9; i++) {
    const y = 150 + i * 62;
    s += `<path d="M120 ${y} C 480 ${y}, 620 400, 900 400" ${stroke(0.14 + i * 0.045, 2)}/>`;
    s += `<circle cx="120" cy="${y}" r="5" fill="${AQUA}" fill-opacity="${0.2 + i * 0.06}"/>`;
  }
  s += `<circle cx="900" cy="400" r="46" ${stroke(0.85, 3)}/>`;
  s += `<circle cx="900" cy="400" r="16" fill="${AQUA}" fill-opacity="0.9"/>`;
  s += `<path d="M1000 400 H1180" ${stroke(0.5, 2)}/>`;
  return s;
};

/** A sealed perimeter with data processed entirely inside it. */
const localFirst = () => {
  let s = `<rect x="250" y="140" width="780" height="520" rx="28" ${stroke(0.5, 3)}/>`;
  s += `<rect x="300" y="190" width="680" height="420" rx="20" ${stroke(0.18, 2)} stroke-dasharray="10 12"/>`;
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 8; c++)
      s += `<rect x="${360 + c * 72}" y="${250 + r * 62}" width="44" height="30" rx="6" fill="${AQUA}" fill-opacity="${0.10 + ((r + c) % 4) * 0.11}"/>`;
  s += `<circle cx="640" cy="140" r="26" fill="#080b10" ${stroke(0.8, 3)}/>`;
  s += `<path d="M628 140 v-16 a12 12 0 0 1 24 0 v16" ${stroke(0.8, 3)}/>`;
  return s;
};

/** One orchestrator delegating to a ring of specialist agents. */
const orchestrator = () => {
  let s = "";
  const cx = 640,
    cy = 400,
    R = 235;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(a) * R;
    const y = cy + Math.sin(a) * R;
    s += `<path d="M${cx} ${cy} L${x} ${y}" ${stroke(0.3, 2)}/>`;
    s += `<circle cx="${x}" cy="${y}" r="30" fill="#080b10" ${stroke(0.6, 2)}/>`;
    s += `<circle cx="${x}" cy="${y}" r="9" fill="${AQUA}" fill-opacity="0.7"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="72" fill="#080b10" ${stroke(0.9, 3)}/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="26" fill="${AQUA}" fill-opacity="0.9"/>`;
  return s;
};

/** Care delivered along a route between people and a pulse of vitals. */
const psw = () => {
  let s = `<path d="M100 620 C 360 620, 380 300, 640 300 S 940 500, 1180 380" ${stroke(0.35, 3)} stroke-dasharray="14 14"/>`;
  const pts = [
    [190, 596],
    [470, 350],
    [760, 330],
    [1050, 430],
  ];
  pts.forEach(([x, y], i) => {
    s += `<circle cx="${x}" cy="${y}" r="${26 - i * 2}" fill="#080b10" ${stroke(0.7, 2)}/>`;
    s += `<circle cx="${x}" cy="${y}" r="8" fill="${AQUA}" fill-opacity="0.85"/>`;
  });
  s += `<path d="M300 190 h120 l30 -55 l38 110 l30 -55 h150" ${stroke(0.75, 3)}/>`;
  return s;
};

/** Value moving between ledgers, settled in a stable unit. */
const stablecoin = () => {
  let s = "";
  for (let i = 0; i < 3; i++)
    s += `<circle cx="${400 + i * 8}" cy="400" r="${118 - i * 4}" ${stroke(0.25 + i * 0.2, 3)}/>`;
  s += `<path d="M400 330 v140 M368 362 h64 M368 438 h64" ${stroke(0.85, 4)}/>`;
  for (let i = 0; i < 4; i++) {
    const y = 250 + i * 100;
    s += `<path d="M560 ${y} H1120" ${stroke(0.18 + i * 0.1, 2)}/>`;
    s += `<rect x="1120" y="${y - 16}" width="60" height="32" rx="8" fill="${AQUA}" fill-opacity="${0.15 + i * 0.12}"/>`;
  }
  return s;
};

/** A voice given a face — waveform resolving into a presence. */
const vessel = () => {
  let s = `<circle cx="640" cy="380" r="150" fill="#080b10" ${stroke(0.75, 3)}/>`;
  s += `<circle cx="588" cy="350" r="13" fill="${AQUA}" fill-opacity="0.9"/>`;
  s += `<circle cx="692" cy="350" r="13" fill="${AQUA}" fill-opacity="0.9"/>`;
  s += `<path d="M580 432 q60 46 120 0" ${stroke(0.8, 4)}/>`;
  for (let i = 0; i < 22; i++) {
    const x = 120 + i * 22;
    const h = 30 + Math.abs(Math.sin(i * 0.9)) * 90;
    s += `<path d="M${x} ${700 - h / 2} v${h}" ${stroke(0.2 + (i % 5) * 0.12, 3)} stroke-linecap="round"/>`;
  }
  for (let i = 0; i < 22; i++) {
    const x = 780 + i * 22;
    const h = 30 + Math.abs(Math.cos(i * 0.8)) * 90;
    s += `<path d="M${x} ${700 - h / 2} v${h}" ${stroke(0.2 + (i % 5) * 0.12, 3)} stroke-linecap="round"/>`;
  }
  return s;
};

/** Many sovereign nodes converging on a shared point of coordination. */
const singularity = () => {
  let s = "";
  for (let ring = 1; ring <= 4; ring++) {
    const R = ring * 78;
    s += `<circle cx="640" cy="400" r="${R}" ${stroke(0.3 - ring * 0.045, 2)}/>`;
    const n = ring * 5;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + ring * 0.4;
      const x = 640 + Math.cos(a) * R;
      const y = 400 + Math.sin(a) * R;
      s += `<circle cx="${x}" cy="${y}" r="${6 - ring * 0.7}" fill="${AQUA}" fill-opacity="${0.75 - ring * 0.12}"/>`;
      s += `<path d="M640 400 L${x} ${y}" ${stroke(0.07, 1)}/>`;
    }
  }
  s += `<circle cx="640" cy="400" r="30" fill="${AQUA}" fill-opacity="0.95"/>`;
  return s;
};

/** Inbound requests sorted into four decisive buckets. */
const triage = () => {
  let s = "";
  for (let i = 0; i < 10; i++)
    s += `<rect x="${90 + (i % 2) * 26}" y="${150 + i * 52}" width="150" height="30" rx="8" fill="${AQUA}" fill-opacity="${0.1 + (i % 5) * 0.07}"/>`;
  s += `<path d="M270 400 H430" ${stroke(0.5, 2)}/>`;
  s += `<circle cx="470" cy="400" r="40" fill="#080b10" ${stroke(0.85, 3)}/>`;
  s += `<path d="M452 400 l14 14 l28 -30" ${stroke(0.9, 4)}/>`;
  for (let i = 0; i < 4; i++) {
    const y = 190 + i * 145;
    s += `<path d="M512 400 C 640 400, 660 ${y}, 800 ${y}" ${stroke(0.3 + i * 0.1, 2)}/>`;
    s += `<rect x="810" y="${y - 42}" width="360" height="84" rx="16" ${stroke(0.35 + i * 0.12, 2)}/>`;
    s += `<rect x="840" y="${y - 12}" width="${120 + i * 60}" height="24" rx="7" fill="${AQUA}" fill-opacity="${0.16 + i * 0.1}"/>`;
  }
  return s;
};

const ART = {
  "inbox-to-resolution-engine": inbox,
  "local-first-data-pipeline": localFirst,
  "orchestrator-led-agent-team": orchestrator,
  "psw-healthtech-platform": psw,
  "stablecoin-platform": stablecoin,
  vessel,
  singularity,
  "work-triage-system": triage,
};

mkdirSync(OUT, { recursive: true });
for (const [id, draw] of Object.entries(ART)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${bg}${draw()}<rect width="${W}" height="${H}" fill="url(#fade)"/></svg>`;
  writeFileSync(`${OUT}/${id}.svg`, svg);
  console.log("wrote", `${OUT}/${id}.svg`);
}
