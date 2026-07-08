/**
 * Aurora — fixed ambient background: two large blurred radial blobs (aqua
 * top-left, faint magenta bottom-right) plus a central aqua-tinted glow.
 * Pure CSS, no interactivity — safe as a server component. Motion is a slow
 * "breathing" drift on transform/opacity only, frozen under reduced-motion
 * via the global rule in app/globals.css.
 */
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute -left-[10%] -top-[15%] h-[620px] w-[620px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-accent) 55%, transparent) 0%, transparent 70%)",
          animation: "aurora-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-spark) 28%, transparent) 0%, transparent 72%)",
          animation: "aurora-drift 28s ease-in-out infinite",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-accent) 12%, transparent) 0%, transparent 65%)",
          animation: "aurora-drift 34s ease-in-out infinite",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
