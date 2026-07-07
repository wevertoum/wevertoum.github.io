import { describe, expect, it, vi, beforeEach } from "vitest";

import { sendContact } from "@/lib/sendContact";

describe("sendContact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("posts payload to Formspree", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await sendContact({
      name: "Jane",
      email: "jane@example.com",
      message: "Hello",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://formspree.io/f/xoqpgrlv",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "Jane",
          email: "jane@example.com",
          message: "Hello",
        }),
      }),
    );
  });

  it("throws when request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(
      sendContact({ name: "Jane", email: "jane@example.com", message: "Hi" }),
    ).rejects.toThrow("Failed to send message");
  });
});
