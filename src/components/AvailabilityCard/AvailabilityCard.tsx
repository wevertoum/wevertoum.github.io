import { useTranslation } from "react-i18next";

import { TerminalLabel } from "@/components/TerminalLabel";

export function AvailabilityCard() {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <TerminalLabel variant="comment" as="h3" className="mb-3 block">
        {t("availability.label")}
      </TerminalLabel>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {t("availability.text")}
      </p>
    </div>
  );
}
