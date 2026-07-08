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

// jsdom lacks IntersectionObserver — framer-motion whileInView needs it.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

// next/image → plain <img> in tests (drop Next-only props).
vi.mock("next/image", () => ({
  default: ({ fill, priority, sizes, ...props }: Record<string, unknown>) =>
    React.createElement("img", props),
}));
