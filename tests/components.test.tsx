import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RepoFlipCard } from "@/components/cards/RepoFlipCard";
import { ImpactSection } from "@/components/impact/ImpactSection";
import { CardSwap } from "@/components/hero/CardSwap";
import { impactCards } from "@/lib/impact";
import type { FlagshipProject } from "@/lib/types";

describe("RepoFlipCard", () => {
  it("renders the hook and links to the repo with safe rel", () => {
    render(
      <RepoFlipCard
        hook="Team Brain"
        useCase="Ask your docs a question."
        githubUrl="https://github.com/schuligan/operations-knowledge-copilot"
      />,
    );
    expect(screen.getByText("Team Brain")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/schuligan/operations-knowledge-copilot",
    );
    expect(link.getAttribute("rel")).toContain("noopener");
  });
});

describe("ImpactSection", () => {
  it("renders every impact card headline", () => {
    render(<ImpactSection cards={impactCards} />);
    impactCards.forEach((card) => {
      expect(screen.getByText(card.headline)).toBeInTheDocument();
    });
  });
});

describe("CardSwap accessibility", () => {
  const flagship: FlagshipProject[] = [
    { id: "a", kind: "flagship", title: "Port Call", blurb: "x", liveUrl: "https://a.com" },
    { id: "b", kind: "flagship", title: "Captain Chaos", blurb: "y", liveUrl: "https://b.com" },
  ];

  it("exposes a pause control and one selector dot per build", () => {
    render(<CardSwap projects={flagship} />);
    expect(
      screen.getByRole("button", { name: /pause showcase/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^show /i })).toHaveLength(2);
  });
});
