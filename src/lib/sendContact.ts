export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function getFormspreeFormId(): string {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  if (!formId) {
    throw new Error("VITE_FORMSPREE_FORM_ID is not configured");
  }
  return formId;
}

export async function sendContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`https://formspree.io/f/${getFormspreeFormId()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }
}
