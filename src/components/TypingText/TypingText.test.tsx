import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { TypingText } from "@/components/TypingText";

describe("TypingText", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders full text immediately when reduced motion is preferred", () => {
    render(<TypingText text="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
