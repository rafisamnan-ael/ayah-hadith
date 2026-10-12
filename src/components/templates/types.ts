import type {
  AppLanguage,
  CardRenderOptions,
  ContainedImageState,
  CardFormatSpec,
  ReligiousContent,
} from "@/types";

export interface TemplateRenderProps {
  content: ReligiousContent;
  options: CardRenderOptions;
  language: AppLanguage;
  image?: ContainedImageState;
  format: CardFormatSpec;
  /**
   * Templates report when their auto-fitting text cannot fit at the minimum
   * size, so the editor can warn the user and suggest a long-text template.
   */
  reportOverflow?: (key: string, overflow: boolean) => void;
}

export function getArabic(content: ReligiousContent): string | undefined {
  const t = content.arabic?.trim();
  return t ? t : undefined;
}

export function getTranslation(
  content: ReligiousContent,
  options: CardRenderOptions,
): { text?: string; lang: "en" | "bn" | "translit" | "none" } {
  if (options.translationLanguage === "none") return { text: undefined, lang: "none" };
  const raw =
    options.translationLanguage === "bn"
      ? content.bangla
      : options.translationLanguage === "translit"
        ? content.transliteration
        : content.english;
  const trimmed = raw?.trim();
  return trimmed
    ? { text: trimmed, lang: options.translationLanguage }
    : { text: undefined, lang: options.translationLanguage };
}

export function weightedLength(content: ReligiousContent): number {
  return (content.arabic?.length ?? 0) + (content.english?.length ?? 0) + (content.bangla?.length ?? 0);
}
