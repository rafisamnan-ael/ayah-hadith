"use client";

import { Sparkles } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useOpenInEditor } from "@/hooks/useOpenInEditor";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { useGeneralDua } from "@/hooks/useGeneralDua";
import { generalDuaToContent } from "@/lib/dua";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import type { GeneralDua } from "@/data/generalDuas";

export function GeneralDuaCard({
  dua,
  categoryLabel,
}: {
  dua: GeneralDua;
  categoryLabel: string;
}) {
  const { t, language } = useT();
  const { data, isLoading, isError } = useGeneralDua(dua.ref);
  const openInEditor = useOpenInEditor();
  const bangla = language === "bn";
  const content = generalDuaToContent(dua, data);

  const title = (bangla ? data?.titleBn : data?.titleEn) || dua.title.en;
  const attribution = (bangla ? data?.attributionBn : data?.attributionEn) ?? undefined;
  const grade = (bangla ? data?.gradeBn : data?.gradeEn) ?? undefined;

  if (isLoading) {
    return (
      <div className="card-surface space-y-3 p-5 sm:p-7">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="ml-auto h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="card-surface p-5 text-sm text-ink-500 sm:p-7">
        {t("error_body")}
      </div>
    );
  }

  return (
    <article className="card-surface flex flex-col p-5 sm:p-7">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="label">{categoryLabel}</span>
          <h3
            className={cn(
              "mt-1 font-serif text-lg font-semibold leading-snug text-ink-900 sm:text-xl",
              bangla && "font-bangla",
            )}
          >
            {title}
          </h3>
        </div>
        <FavoriteButton content={content} compact />
      </header>

      {data.arabic && (
        <p
          dir="rtl"
          className="arabic mt-4 font-arabic text-2xl leading-[2.1] text-ink-900 sm:text-[28px]"
        >
          {data.arabic}
        </p>
      )}

      <p className="mt-4 font-serif text-[17px] italic leading-relaxed text-ink-600">
        {dua.transliteration}
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <span className="label">{t("english")}</span>
          {data.english ? (
            <blockquote className="mt-1.5 border-l-2 border-sand-200 pl-3 text-[16px] leading-relaxed text-ink-800">
              {data.english}
            </blockquote>
          ) : (
            <p className="mt-1.5 text-sm italic text-ink-300">
              {t("translation_unavailable")}
            </p>
          )}
        </div>
        <div>
          <span className="label">{t("bangla")}</span>
          {data.bangla ? (
            <blockquote className="mt-1.5 border-l-2 border-sand-200 pl-3 font-bangla text-[16px] leading-relaxed text-ink-800">
              {data.bangla}
            </blockquote>
          ) : (
            <p className="mt-1.5 text-sm italic text-ink-300">
              {t("translation_unavailable")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-50 pt-4">
        <span className="min-w-0 text-[12px] uppercase leading-snug tracking-wide text-ink-400">
          {attribution ? `${t("source")}: ${attribution}` : ""}
          {grade ? `${attribution ? " · " : ""}${t("grade")}: ${grade}` : ""}
        </span>
        <button
          type="button"
          onClick={() => openInEditor(content)}
          className="btn-primary shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          {t("create_photocard")}
        </button>
      </div>
    </article>
  );
}
