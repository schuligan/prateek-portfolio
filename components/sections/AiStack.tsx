import { aiStack } from "@/lib/contact";

/**
 * AiStack — the models and tools Prateek orchestrates. Framed as leverage,
 * not a skills bar; it signals AI fluency without listing languages.
 */
export function AiStack() {
  return (
    <section aria-labelledby="stack-heading" className="w-full max-w-5xl">
      <h2
        id="stack-heading"
        className="mb-6 text-sm uppercase tracking-[0.3em] text-muted"
      >
        The stack I orchestrate
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiStack.map((item) => (
          <li
            key={item.label}
            className="rounded-2xl border border-surface-border bg-surface p-6 text-left"
          >
            <p className="text-lg font-medium text-ink">{item.label}</p>
            <p className="mt-1 text-sm text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
