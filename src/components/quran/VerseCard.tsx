"use client";

import { ContentCard } from "@/components/ui/ContentCard";
import { verseToContent } from "@/services/quran/quranService";
import { useT } from "@/hooks/useT";
import { surahNameBn } from "@/data/surahNamesBn";
import { localizeNumber } from "@/lib/utils";
import type { QuranVerse } from "@/types";

export function VerseCard({
  verse,
  showBoth,
  highlight,
}: {
  verse: QuranVerse;
  showBoth?: boolean;
  highlight?: boolean;
}) {
  const { language } = useT();
  const content = verseToContent(verse);
  const ref = `${verse.surahNumber}:${verse.verseNumber}`;
  const heading = language === "bn" ? localizeNumber(ref, "bn") : ref;
  const subheading =
    language === "bn"
      ? surahNameBn(verse.surahNumber) ?? verse.surahNameEnglish
      : verse.surahNameEnglish;

  return (
    <ContentCard
      content={content}
      heading={heading}
      subheading={subheading}
      showBothTranslations={showBoth}
      bangla={language === "bn"}
      className={highlight ? "ring-2 ring-sand-300" : undefined}
    />
  );
}
