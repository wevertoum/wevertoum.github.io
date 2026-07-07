import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import { describe, expect, it } from "vitest";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import i18n from "@/i18n";

function renderSwitcher() {
  return render(
    <I18nextProvider i18n={i18n}>
      <LanguageSwitcher />
    </I18nextProvider>,
  );
}

describe("LanguageSwitcher", () => {
  it("changes language on click", async () => {
    const user = userEvent.setup();
    renderSwitcher();

    await user.click(screen.getByRole("button", { name: "ES" }));
    expect(i18n.language.startsWith("es")).toBe(true);
    expect(document.documentElement.lang).toBeDefined();
  });
});
