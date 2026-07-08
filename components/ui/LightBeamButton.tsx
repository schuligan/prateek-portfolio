import type { ReactNode } from "react";

interface LightBeamButtonProps {
  children: ReactNode;
  /** When set, renders an anchor; otherwise a button. */
  href?: string;
  /** Anchor-only: opens in a new tab with safe rel. */
  external?: boolean;
  className?: string;
}

/**
 * LightBeamButton — pill button with a rotating conic-gradient light-beam
 * border (pure CSS via @property, see globals.css). Dark-native, aqua accent.
 * Renders an <a> when `href` is given, else a <button>. Motion freezes under
 * the global reduced-motion rule.
 */
export function LightBeamButton({
  children,
  href,
  external,
  className = "",
}: LightBeamButtonProps) {
  const inner = <span className="light-beam-inner">{children}</span>;
  const classes = `light-beam ${className}`.trim();

  if (href) {
    const rel = external ? "noopener noreferrer" : undefined;
    const target = external ? "_blank" : undefined;
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {inner}
    </button>
  );
}
