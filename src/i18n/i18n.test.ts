import { describe, expect, it } from "vitest";

import en from "@/i18n/locales/en.json";
import es from "@/i18n/locales/es.json";
import pt from "@/i18n/locales/pt.json";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectKeys(item, prefix ? `${prefix}.${index}` : String(index)),
    );
  }

  if (value === null || typeof value !== "object") {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value).flatMap(([key, nested]) =>
    collectKeys(nested, prefix ? `${prefix}.${key}` : key),
  );
}

describe("i18n locale parity", () => {
  it("has matching keys across en, es and pt", () => {
    const enKeys = collectKeys(en).sort();
    const esKeys = collectKeys(es).sort();
    const ptKeys = collectKeys(pt).sort();

    expect(esKeys).toEqual(enKeys);
    expect(ptKeys).toEqual(enKeys);
  });
});
