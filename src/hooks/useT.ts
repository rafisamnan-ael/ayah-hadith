"use client";

import { useAppStore } from "@/store/useAppStore";
import { translate, type DictKey } from "@/lib/i18n";

export function useLanguage() {
  return useAppStore((s) => s.language);
}

/** Returns a translator bound to the current interface language. */
export function useT() {
  const language = useAppStore((s) => s.language);
  const t = (key: DictKey) => translate(key, language);
  return { t, language };
}
