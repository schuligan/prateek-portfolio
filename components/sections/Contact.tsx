import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { contact } from "@/lib/contact";

/**
 * Contact — the closing panel. Primary LightBeam CTAs (book / email) plus
 * secondary links (GitHub, LinkedIn) and a résumé download.
 */
export function Contact() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="w-full max-w-3xl text-center"
    >
      <h2
        id="contact-heading"
        className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        Let&apos;s talk.
      </h2>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <LightBeamButton href={contact.bookUrl} external>
          Book a call
        </LightBeamButton>
        <LightBeamButton href={`mailto:${contact.email}`}>
          Send email
        </LightBeamButton>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
