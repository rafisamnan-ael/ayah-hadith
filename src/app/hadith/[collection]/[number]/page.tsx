"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useCollections, useCollection } from "@/hooks/useHadith";
import { useT } from "@/hooks/useT";
import { useAppStore } from "@/store/useAppStore";
import { useOpenInEditor } from "@/hooks/useOpenInEditor";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateViews";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { hadithToContent } from "@/services/hadith/hadithService";
import { localizeNumber } from "@/lib/utils";
import { collectionNameBn } from "@/data/collectionNamesBn";
import { chapterNameBn } from "@/data/chapterNamesBn";
import { gradeNameBn } from "@/data/gradesBn";
import { alsoInNames } from "@/lib/hadithText";
import type { HadithCollectionSummary } from "@/types";

function resolveLanguage(
  collections: HadithCollectionSummary[] | undefined,
  id: string,
  uiLang: "en" | "bn",
): "en" | "bn" {
  const c = collections?.find((x) => x.id === id);
  if (!c) return uiLang;
  if (c.translationLanguages.includes(uiLang)) return uiLang;
  return c.translationLanguages[0] ?? "en";
}

export default function HadithDetailPage() {
  const params = useParams<{ collection: string; number: string }>();
  const collectionId = params?.collection ?? "";
  const number = params?.number ?? "";
  const { t, language } = useT();
  const collections = useCollections();
  const resolvedLang = useMemo(
    () => resolveLanguage(collections.data, collectionId, language),
    [collections.data, collectionId, language],
  );
  const { data, isLoading, isError, refetch } = useCollection(
    collectionId,
    resolvedLang,
  );
  const addRecent = useAppStore((s) => s.addRecent);
  const openInEditor = useOpenInEditor();

  const index = useMemo(
    () => (data?.hadiths ?? []).findIndex((h) => h.hadithNumber === number),
    [data, number],
  );
  const entry = index >= 0 ? data?.hadiths[index] : undefined;
  const chapterLabel =
    language === "bn" && entry?.chapter
      ? chapterNameBn(entry.chapter) ?? entry.chapter
      : entry?.chapter;
  const prev = index > 0 ? data?.hadiths[index - 1] : undefined;
  const next =
    data && index >= 0 && index < data.hadiths.length - 1
      ? data.hadiths[index + 1]
      : undefined;

  useEffect(() => {
    if (entry) addRecent(hadithToContent(entry));
  }, [entry, addRecent]);

  return (
    <div className="container-page py-10">
      <Link
        href={`/hadith/${collectionId}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {language === "bn"
          ? data?.collection.nameBn ?? collectionNameBn(collectionId) ?? t("hadith_title")
          : data?.collection.name ?? t("hadith_title")}
      </Link>

      {isLoading && <LoadingState />}
      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && !entry && (
        <EmptyState
          title={t("no_results")}
          body={t("try_another")}
          action={
            <Link href={`/hadith/${collectionId}`} className="btn-secondary">
              {t("back")}
            </Link>
          }
        />
      )}

      {entry && (
        <article className="mx-auto max-w-3xl">
          <header className="mb-6">
            <p className={`label ${language === "bn" ? "font-bangla" : ""}`}>
              {language === "bn"
                ? data?.collection.nameBn ?? collectionNameBn(collectionId) ?? entry.collection
                : entry.collection}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-ink-900">
              {t("hadith")} {localizeNumber(entry.hadithNumber, language)}
            </h1>
            {collectionId && (
              <p className="mt-1 text-sm text-ink-400">
                {entry.book && `${t("book")} ${entry.book}`}
                {chapterLabel && ` · ${chapterLabel}`}
              </p>
            )}
          </header>

          <div className="card-surface space-y-8 p-6 sm:p-9">
            {entry.arabic && (
              <p
                className="arabic font-arabic text-2xl leading-[2.1] text-ink-900 sm:text-[30px]"
                dir="rtl"
              >
                {entry.arabic}
              </p>
            )}

            <section>
              <p className="label">{t("english")}</p>
              {entry.english ? (
                <p className="mt-2 text-[17px] leading-relaxed text-ink-800">
                  {entry.english}
                </p>
              ) : (
                <p className="mt-2 text-sm italic text-ink-300">
                  {t("translation_unavailable")}
                </p>
              )}
            </section>

            <section>
              <p className="label">{t("bangla")}</p>
              {entry.bangla ? (
                <p className="mt-2 font-bangla text-[17px] leading-relaxed text-ink-800">
                  {entry.bangla}
                </p>
              ) : (
                <p className="mt-2 text-sm italic text-ink-300">
                  {t("translation_unavailable")}
                </p>
              )}
            </section>

            <dl className="grid gap-x-8 gap-y-2 border-t border-ink-50 pt-5 text-[15px] sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="font-medium text-ink-500">{t("source")}:</dt>
                <dd className={language === "bn" ? "font-bangla text-ink-700" : "text-ink-700"}>
                  {[
                    language === "bn"
                      ? data?.collection.nameBn ?? collectionNameBn(collectionId) ?? entry.collection
                      : entry.collection,
                    ...alsoInNames(entry.alsoIn, language),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </dd>
              </div>
              {entry.book && (
                <div className="flex gap-2">
                  <dt className="font-medium text-ink-500">{t("book")}:</dt>
                  <dd className="text-ink-700">{entry.book}</dd>
                </div>
              )}
              {entry.chapter && (
                <div className="flex gap-2">
                  <dt className="font-medium text-ink-500">{t("chapter")}:</dt>
                  <dd className="text-ink-700">{chapterLabel}</dd>
                </div>
              )}
              {entry.grade && (
                <div className="flex gap-2">
                  <dt className="font-medium text-ink-500">{t("grade")}:</dt>
                  <dd className="text-ink-700">
                    {language === "bn"
                      ? gradeNameBn(entry.grade) ?? entry.grade
                      : entry.grade}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <FavoriteButton content={hadithToContent(entry)} />
            <button
              type="button"
              onClick={() => openInEditor(hadithToContent(entry))}
              className="btn-primary"
            >
              <Sparkles className="h-4 w-4" />
              {t("create_photocard")}
            </button>
          </div>

          <nav className="mt-10 flex items-center justify-between border-t border-ink-100 pt-6">
            {prev ? (
              <Link
                href={`/hadith/${collectionId}/${prev.hadithNumber}`}
                className="btn-secondary"
              >
                <ArrowLeft className="h-4 w-4" />
                {localizeNumber(prev.hadithNumber, language)}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/hadith/${collectionId}/${next.hadithNumber}`}
                className="btn-secondary"
              >
                {localizeNumber(next.hadithNumber, language)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      )}
    </div>
  );
}

