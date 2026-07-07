import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TerminalLabel } from "@/components/TerminalLabel";

describe("TerminalLabel", () => {
  it("renders slashes variant", () => {
    render(<TerminalLabel>Connect</TerminalLabel>);
    expect(screen.getByText("// Connect")).toBeInTheDocument();
  });

  it("renders comment variant", () => {
    render(<TerminalLabel variant="comment">Availability</TerminalLabel>);
    expect(screen.getByText("/* Availability */")).toBeInTheDocument();
  });
});
