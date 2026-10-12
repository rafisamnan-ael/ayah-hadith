"use client";

import { ContentCard } from "@/components/ui/ContentCard";
import { hadithToContent } from "@/services/hadith/hadithService";
import { useT } from "@/hooks/useT";
import { collectionNameBn } from "@/data/collectionNamesBn";
import { chapterNameBn } from "@/data/chapterNamesBn";
import { alsoInNames } from "@/lib/hadithText";
import { localizeNumber } from "@/lib/utils";
import type { HadithEntry } from "@/types";

export function HadithCard({
  entry,
  showBoth,
  highlight,
  withReadLink = true,
}: {
  entry: HadithEntry;
  showBoth?: boolean;
  highlight?: boolean;
  withReadLink?: boolean;
}) {
  const { t, language } = useT();
  const content = hadithToContent(entry);
  const bangla = language === "bn";
  const heading = bangla
    ? `হাদিস ${localizeNumber(entry.hadithNumber, "bn")}`
    : `Hadith ${entry.hadithNumber}`;
  const collectionLabel = bangla
    ? collectionNameBn(entry.collectionId) ?? entry.collection
    : entry.collection;
  const chapterLabel =
    bangla && entry.chapter ? chapterNameBn(entry.chapter) ?? entry.chapter : entry.chapter;
  const alsoIn = alsoInNames(entry.alsoIn, bangla ? "bn" : "en").filter(
    (n) => n && n !== collectionLabel,
  );
  const sub = [collectionLabel, ...alsoIn, chapterLabel]
    .filter(Boolean)
    .join(" · ");

  return (
    <ContentCard
      content={content}
      heading={heading}
      subheading={sub}
      showBothTranslations={showBoth}
      bangla={bangla}
      className={highlight ? "ring-2 ring-sand-300" : undefined}
      readHref={
        withReadLink
          ? `/hadith/${entry.collectionId}/${entry.hadithNumber}`
          : undefined
      }
      readLabel={t("read")}
    />
  );
}
