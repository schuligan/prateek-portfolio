import type { ImpactCard } from "@/lib/types";

interface ImpactSectionProps {
  cards: ImpactCard[];
}

/**
 * ImpactSection — the "how I lead" proof wall. Each card leads with a big
 * before→after metric (the brag) over a one-line scrubbed context. Renders
 * from typed data; no client/employer names.
 */
export function ImpactSection({ cards }: ImpactSectionProps) {
  return (
    <section aria-labelledby="impact-heading" className="w-full max-w-5xl">
      <h2
        id="impact-heading"
        className="mb-6 text-sm uppercase tracking-[0.3em] text-muted"
      >
        Impact
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <li
            key={card.id}
            className="rounded-2xl border border-surface-border bg-surface p-6 text-left"
          >
            <p className="text-xl font-semibold leading-tight text-accent">
              {card.headline}
            </p>
            <p className="mt-3 text-sm text-muted">{card.context}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
