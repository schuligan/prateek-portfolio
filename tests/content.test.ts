import { describe, it, expect } from "vitest";
import { projects } from "@/lib/projects";
import { impactCards } from "@/lib/impact";
import type { FlagshipProject, RepoProject } from "@/lib/types";

describe("projects registry", () => {
  const countKind = (kind: string) =>
    projects.filter((p) => p.kind === kind).length;

  it("has the expected mix (4 flagship, 11 repo, 2 capability, 1 current)", () => {
    expect(countKind("flagship")).toBe(4);
    expect(countKind("repo")).toBe(11);
    expect(countKind("capability")).toBe(2);
    expect(countKind("current")).toBe(1);
  });

  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("repo github urls point at the schuligan account", () => {
    projects
      .filter((p): p is RepoProject => p.kind === "repo")
      .forEach((p) => {
        expect(p.githubUrl).toMatch(/^https:\/\/github\.com\/schuligan\//);
      });
  });

  it("flagship live urls are https", () => {
    projects
      .filter((p): p is FlagshipProject => p.kind === "flagship")
      .forEach((p) => {
        expect(p.liveUrl).toMatch(/^https:\/\//);
      });
  });
});

describe("impact cards", () => {
  it("has 8 cards with unique ids", () => {
    expect(impactCards.length).toBe(8);
    const ids = impactCards.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Guardrail: client/employer names must never leak onto the public site.
  it("contain no client or employer names (scrubbed)", () => {
    const banned = [
      "Barclays",
      "Frame",
      "Accept/Pay",
      "Cashco",
      "Toast",
      "Deloitte",
      "Thumbay",
      "Persona",
      "ComplyAdvantage",
      "Actimize",
      "FircoSoft",
      "Aviso",
      "MNP",
    ];
    const text = impactCards
      .map((c) => `${c.headline} ${c.context}`)
      .join(" ");
    banned.forEach((name) => expect(text).not.toContain(name));
  });
});
