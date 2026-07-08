import { Aurora } from "@/components/ambient/Aurora";
import { Stars } from "@/components/ambient/Stars";
import { Cursor } from "@/components/ui/Cursor";
import { Loader } from "@/components/ui/Loader";

/**
 * Epic 2 shell demo. Assembles the ambient background, cursor, and loader
 * built for the design system so they can be verified visually together.
 * The real hero content lands in Epic 4 — this is a placeholder.
 */
export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Stars />
      <Aurora />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <div className="rounded-3xl border border-surface-border bg-surface px-10 py-12 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted">
            Portfolio
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            Prateek Jha
          </h1>
          <p className="mt-4 text-lg text-muted sm:text-xl">
            AI Product &amp; Program Leader
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ground transition-transform hover:scale-105"
            >
              View work
            </a>
            <a
              href="#"
              className="rounded-full border border-surface-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
