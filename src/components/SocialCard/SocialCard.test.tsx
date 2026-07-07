import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialCard } from "@/components/SocialCard";

describe("SocialCard", () => {
  it("renders social link with label and handle", () => {
    render(
      <SocialCard
        social={{
          key: "github",
          label: "GitHub",
          handle: "@wevertoum",
          url: "https://github.com/wevertoum/",
        }}
      />,
    );

    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/wevertoum/",
    );
    expect(screen.getByText("@wevertoum")).toBeInTheDocument();
  });
});
