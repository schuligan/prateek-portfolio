import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// jsdom lacks matchMedia — components (Cursor, CardSwap) call it.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

// next/image → plain <img> in tests (drop Next-only props).
vi.mock("next/image", () => ({
  default: ({ fill, priority, sizes, ...props }: Record<string, unknown>) =>
    React.createElement("img", props),
}));
