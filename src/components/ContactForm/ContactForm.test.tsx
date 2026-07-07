import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/ContactForm";
import i18n from "@/i18n";

vi.mock("@/lib/sendContact", () => ({
  sendContact: vi.fn(),
}));

import { sendContact } from "@/lib/sendContact";

function renderForm() {
  return render(
    <I18nextProvider i18n={i18n}>
      <ContactForm />
    </I18nextProvider>,
  );
}

describe("ContactForm", () => {
  beforeEach(async () => {
    vi.mocked(sendContact).mockReset();
    await i18n.changeLanguage("en");
  });

  it("shows validation errors for empty submit", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: /let's talk/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please write a message/i)).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "invalid");
    await user.type(screen.getByLabelText(/message/i), "Hello");
    await user.click(screen.getByRole("button", { name: /let's talk/i }));

    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it("submits successfully", async () => {
    vi.mocked(sendContact).mockResolvedValue();
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello there");
    await user.click(screen.getByRole("button", { name: /let's talk/i }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(sendContact).toHaveBeenCalledWith({
        name: "Jane",
        email: "jane@example.com",
        message: "Hello there",
      });
    });
  });
});
