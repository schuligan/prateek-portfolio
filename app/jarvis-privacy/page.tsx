import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jarvis privacy policy — Prateek Jha",
  description: "Privacy policy for Jarvis, Prateek Jha's private personal assistant.",
};

export default function JarvisPrivacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-[#EDE6DA]">
      <h1 className="font-display text-3xl">Jarvis privacy policy</h1>
      <p className="mt-2 text-sm text-[#9BA3AE]">Last updated 28 September 2026</p>
      <section className="mt-10 space-y-4 leading-relaxed">
        <p>
          Jarvis is Prateek Jha&apos;s private personal assistant. It is not offered to anyone else, and only
          Prateek&apos;s own Google account signs in to it.
        </p>
        <p>
          With his permission, Jarvis reads and drafts his own Gmail and reads and changes his own Google Calendar.
          It runs on his laptop. The sign-in token and anything it reads stay on that laptop.
        </p>
        <p>
          Jarvis does not sell, share or transfer Google user data to anyone, does not use it for advertising, and
          does not use it to train AI models. Its use of data from Google APIs follows the Google API Services User
          Data Policy, including the Limited Use requirements.
        </p>
        <p>
          Prateek can revoke access at any time at{" "}
          <a className="text-[#3DE1C4] underline" href="https://myaccount.google.com/permissions">
            myaccount.google.com/permissions
          </a>
          . Questions: <a className="text-[#3DE1C4] underline" href="mailto:masters.prateek@gmail.com">masters.prateek@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}
