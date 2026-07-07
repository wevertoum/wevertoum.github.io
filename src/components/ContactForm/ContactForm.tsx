import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

import { TerminalLabel } from "@/components/TerminalLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContact } from "@/lib/sendContact";

type ContactFormProps = {
  onSuccess?: () => void;
};

export function ContactForm({ onSuccess }: ContactFormProps) {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t("validation.nameRequired")),
        email: z
          .string()
          .min(1, t("validation.emailRequired"))
          .email(t("validation.emailInvalid")),
        message: z.string().min(1, t("validation.messageRequired")),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSending(true);
    try {
      await sendContact(values);
      toast.success(t("contact.success"));
      reset();
      onSuccess?.();
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <TerminalLabel variant="slashes" as="h2" className="mb-1 block">
        {t("contact.formTitle")}
      </TerminalLabel>

      <div className="space-y-2">
        <Label htmlFor="name" className="font-mono text-accent">
          <TerminalLabel>{t("contact.fields.name")}</TerminalLabel>
        </Label>
        <Input
          id="name"
          placeholder={t("contact.placeholders.name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" className="text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-mono text-accent">
          <TerminalLabel>{t("contact.fields.email")}</TerminalLabel>
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t("contact.placeholders.email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-mono text-accent">
          <TerminalLabel>{t("contact.fields.message")}</TerminalLabel>
        </Label>
        <Textarea
          id="message"
          placeholder={t("contact.placeholders.message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-destructive" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSending} className="w-full sm:w-auto">
        <Send className="size-4" aria-hidden="true" />
        {isSending ? t("contact.sending") : t("contact.submit")}
      </Button>
    </form>
  );
}
