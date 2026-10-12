"use client";

import { Sparkles } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useOpenInEditor } from "@/hooks/useOpenInEditor";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { duaToContent } from "@/lib/dua";
import { surahNameBn } from "@/data/surahNamesBn";
import { localizeNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Dua, QuranVerse } from "@/types";

export function DuaCard({
  dua,
  verse,
  categoryLabel,
}: {
  dua: Dua;
  verse?: QuranVerse;
  categoryLabel: string;
}) {
  const { t, language } = useT();
  const openInEditor = useOpenInEditor();
  const bangla = language === "bn";
  const content = duaToContent(dua, verse);

  const surahLabel = bangla
    ? surahNameBn(dua.surah) ?? verse?.surahNameEnglish ?? ""
    : verse?.surahNameEnglish ?? "";
  const ref = bangla
    ? localizeNumber(`${dua.surah}:${dua.ayah}`, "bn")
    : `${dua.surah}:${dua.ayah}`;

  return (
    <article className="card-surface flex flex-col p-5 sm:p-7">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="label">{categoryLabel}</span>
          <h3
            className={cn(
              "mt-1 font-serif text-xl font-semibold text-ink-900 sm:text-2xl",
              bangla && "font-bangla",
            )}
          >
            {bangla ? dua.title.bn : dua.title.en}
          </h3>
        </div>
        <FavoriteButton content={content} compact />
      </header>

      {verse?.arabic && (
        <p
          dir="rtl"
          className="arabic mt-4 font-arabic text-2xl leading-[2.1] text-ink-900 sm:text-[30px]"
        >
          {verse.arabic}
        </p>
      )}

      <p
        className="mt-4 font-serif text-[17px] italic leading-relaxed text-ink-600"
        lang="en"
      >
        {dua.transliteration}
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <span className="label">{t("english")}</span>
          {verse?.english ? (
            <blockquote className="mt-1.5 border-l-2 border-sand-200 pl-3 text-[17px] leading-relaxed text-ink-800">
              &ldquo;{verse.english}&rdquo;
            </blockquote>
          ) : (
            <p className="mt-1.5 text-sm italic text-ink-300">
              {t("translation_unavailable")}
            </p>
          )}
        </div>
        <div>
          <span className="label">{t("bangla")}</span>
          {verse?.bangla ? (
            <blockquote className="mt-1.5 border-l-2 border-sand-200 pl-3 font-bangla text-[17px] leading-relaxed text-ink-800">
              &ldquo;{verse.bangla}&rdquo;
            </blockquote>
          ) : (
            <p className="mt-1.5 text-sm italic text-ink-300">
              {t("translation_unavailable")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-50 pt-4">
        <span className="text-[13px] uppercase tracking-wide text-ink-400">
          {t("source")}: {surahLabel} · {ref}
        </span>
        <button
          type="button"
          onClick={() => openInEditor(content)}
          className="btn-primary"
        >
          <Sparkles className="h-4 w-4" />
          {t("create_photocard")}
        </button>
      </div>
    </article>
  );
}
