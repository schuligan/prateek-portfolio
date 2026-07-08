/**
 * StaticCore — the reduced-motion / no-WebGL fallback for the Jarvis Core.
 * A soft, still aqua orb. Purely decorative.
 */
export function StaticCore() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
    >
      <div
        className="h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 42% 40%, #4fcbc0 0%, #0b3b3a 42%, transparent 70%)",
          filter: "blur(10px)",
          opacity: 0.45,
        }}
      />
    </div>
  );
}
