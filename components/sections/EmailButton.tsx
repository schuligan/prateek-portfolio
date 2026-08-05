"use client";

import { useEffect, useState } from "react";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { contact } from "@/lib/contact";

/**
 * EmailButton — copies the address and confirms it, then still attempts a
 * mailto: hand-off. A bare mailto does nothing at all when no mail handler is
 * registered, which reads as a broken button; copying always works.
 */
export function EmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.location.href = `mailto:${contact.email}`;
  }

  return (
    <span onClick={handleClick} className="contents">
      <LightBeamButton>
        {copied ? "Address copied" : "Send email"}
      </LightBeamButton>
    </span>
  );
}
