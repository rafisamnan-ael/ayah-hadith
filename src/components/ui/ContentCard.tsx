"use client";

import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useOpenInEditor } from "@/hooks/useOpenInEditor";
import { cn } from "@/lib/utils";
import { gradeNameBn } from "@/data/gradesBn";
import { FavoriteButton } from "./FavoriteButton";
import type { ReligiousContent } from "@/types";

export function TypeBadge({ type }: { type: ReligiousContent["type"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
        type === "quran"
          ? "bg-sage-100 text-sage-800"
          : "bg-sand-100 text-sand-800",
      )}
    >
      {type}
    </span>
  );
}

export function ContentCard({
  content,
  heading,
  subheading,
  showBothTranslations = false,
  compact = false,
  className,
  readHref,
  readLabel,
  bangla,
}: {
  content: ReligiousContent;
  heading?: string;
  subheading?: string;
  showBothTranslations?: boolean;
  compact?: boolean;
  className?: string;
  readHref?: string;
  readLabel?: string;
  bangla?: boolean;
}) {
  const { t, language } = useT();
  const openInEditor = useOpenInEditor();

  const requested = language === "bn" ? content.bangla : content.english;
  const fallback = language === "bn" ? content.english : content.bangla;
  const primary = requested || fallback;
  const usingFallback = !requested && !!fallback;
  const primaryLabel = requested
    ? language === "bn"
      ? t("bangla")
      : t("english")
    : language === "bn"
      ? t("english")
      : t("bangla");
  const secondary = language === "bn" ? content.english : content.bangla;
  const secondaryLabel = language === "bn" ? t("english") : t("bangla");
  const fallbackNote =
    language === "bn" ? t("fallback_english") : t("fallback_bangla");

  return (
    <article
      className={cn(
        "card-surface flex flex-col transition hover:shadow-card",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-7",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <TypeBadge type={content.type} />
            {content.topic && (
              <span className="text-[11px] font-medium text-ink-400">
                {content.topic}
              </span>
            )}
          </div>
          {heading && (
            <h3
              className={cn(
                "truncate font-serif text-lg font-semibold text-ink-900",
                bangla && "font-bangla",
              )}
            >
              {heading}
            </h3>
          )}
          {subheading && (
            <p className={cn("truncate text-xs text-ink-400", bangla && "font-bangla")}>
              {subheading}
            </p>
          )}
        </div>
        <FavoriteButton content={content} compact />
      </header>

      {content.arabic && (
        <p
          dir="rtl"
          className={cn(
            "arabic mt-4 font-arabic text-ink-900",
            compact ? "text-xl leading-[2]" : "text-2xl leading-[2.1] sm:text-[28px]",
          )}
        >
          {content.arabic}
        </p>
      )}

      {content.transliteration && (
        <p className="mt-3 font-serif text-[15px] italic leading-relaxed text-ink-600">
          {content.transliteration}
        </p>
      )}

      <div className="mt-4 space-y-3">
        <TranslationBlock
          label={primaryLabel}
          text={primary}
          missing={t("translation_unavailable")}
          highlight
          bangla={requested ? language === "bn" : language !== "bn"}
        />
        {usingFallback && (
          <p className="text-[11px] font-medium text-sand-700">{fallbackNote}</p>
        )}
        {showBothTranslations && !usingFallback && (
          <TranslationBlock
            label={secondaryLabel}
            text={secondary}
            bangla={language !== "bn"}
          />
        )}
      </div>

      {(content.chapter || content.grade) && (
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-ink-500">
          {content.chapter && (
            <div className="flex gap-1.5">
              <dt className="font-medium text-ink-500">{t("chapter")}:</dt>
              <dd>{content.chapter}</dd>
            </div>
          )}
          {content.grade && (
            <div className="flex gap-1.5">
              <dt className="font-medium text-ink-500">{t("grade")}:</dt>
              <dd>
                {language === "bn"
                  ? gradeNameBn(content.grade) ?? content.grade
                  : content.grade}
              </dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-50 pt-4">
        {readHref ? (
          <Link href={readHref} className="btn-ghost px-3">
            <BookOpen className="h-4 w-4" />
            {readLabel}
          </Link>
        ) : (
          <span />
        )}
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

function TranslationBlock({
  label,
  text,
  missing,
  highlight,
  bangla,
}: {
  label: string;
  text?: string;
  missing?: string;
  highlight?: boolean;
  bangla?: boolean;
}) {
  return (
    <div>
      <span className="label">{label}</span>
      {text ? (
        <p
          className={cn(
            "mt-1.5 leading-relaxed",
            highlight ? "text-[17px] text-ink-800" : "text-[15px] text-ink-600",
            bangla && "font-bangla",
          )}
        >
          {text}
        </p>
      ) : (
        missing && (
          <p className="mt-1 text-sm italic text-ink-300">{missing}</p>
        )
      )}
    </div>
  );
}
