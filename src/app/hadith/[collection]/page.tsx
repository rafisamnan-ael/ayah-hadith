"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { useCollections, useCollection } from "@/hooks/useHadith";
import { useT } from "@/hooks/useT";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateViews";
import { HadithCard } from "@/components/hadith/HadithCard";
import { Button } from "@/components/ui/Button";
import { localizeNumber, parseDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { chapterNameBn } from "@/data/chapterNamesBn";
import type { HadithCollectionSummary } from "@/types";

const PAGE_SIZE = 15;

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

export default function CollectionPage() {
  const params = useParams<{ collection: string }>();
  const collectionId = params?.collection ?? "";
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

  const [chapter, setChapter] = useState("all");
  const [query, setQuery] = useState("");
  const [numberQuery, setNumberQuery] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const router = useRouter();

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [chapter, query]);

  useEffect(() => {
    setNumberError(false);
  }, [numberQuery]);

  /** Jump straight to a hadith by its number (e.g. "1", "93"). */
  const goToHadith = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Accept Bangla/Arabic digits too (Avro keyboard writes ০–৯).
      const n = parseDigits(numberQuery);
      if (!n) return;
      // Only report "not found" once the list is loaded; otherwise navigate and
      // let the hadith page decide (it may still be downloading).
      const list = data?.hadiths;
      if (list && !list.some((h) => h.hadithNumber === n)) {
        setNumberError(true);
        return;
      }
      router.push(`/hadith/${collectionId}/${n}`);
    },
    [numberQuery, data, router, collectionId],
  );

  const chapters = useMemo(() => {
    const sections = data?.sections ?? {};
    return Object.entries(sections)
      .map(([num, title]) => ({ num, title }))
      .filter((c) => c.title && c.title.trim())
      .sort((a, b) => Number(a.num) - Number(b.num));
  }, [data]);

  const filtered = useMemo(() => {
    const list = data?.hadiths ?? [];
    const q = query.trim().toLowerCase();
    return list.filter((h) => {
      if (chapter !== "all" && h.book !== chapter) return false;
      if (!q) return true;
      const text = [h.arabic, h.english, h.bangla, h.hadithNumber]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(q);
    });
  }, [data, chapter, query]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="container-page py-10">
      <Link
        href="/hadith"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("hadith_title")}
      </Link>

      <header className="mb-6 rounded-xl2 border border-ink-100 bg-white p-6">
        <h1
          className={`font-serif text-3xl font-semibold tracking-tight text-ink-900 ${
            language === "bn" ? "font-bangla" : ""
          }`}
        >
          {(language === "bn"
            ? data?.collection.nameBn ?? data?.collection.name
            : data?.collection.name) ?? collectionId}
        </h1>
        {data?.collection.nameArabic && (
          <p className="mt-1 font-arabic text-xl text-ink-400" dir="rtl">
            {data.collection.nameArabic}
          </p>
        )}
        {data && (
          <p className="mt-2 text-sm text-ink-500">
            {localizeNumber(data.hadiths.length, language)} {t("hadith")} ·{" "}
            {localizeNumber(chapters.length, language)} {t("chapters")}
          </p>
        )}
      </header>

      {isLoading && (
        <div>
          <LoadingState label={t("loading")} />
          <p className="text-center text-xs text-ink-400">
            {t("hadith_sub")}
          </p>
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}

      <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            className="input pl-11"
            aria-label={t("nav_search")}
          />
        </div>
        {data && (
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="input"
            aria-label={t("chapter")}
          >
            <option value="all">{t("all_chapters")}</option>
            {chapters.map((c) => (
              <option key={c.num} value={c.num}>
                {localizeNumber(c.num, language)}.{" "}
                {language === "bn" ? chapterNameBn(c.title) ?? c.title : c.title}
              </option>
            ))}
          </select>
        )}
      </div>

      <form
        onSubmit={goToHadith}
        className="mb-6 flex flex-wrap items-center gap-2"
      >
        <label htmlFor="hadith-jump" className="text-sm text-ink-500">
          {t("hadith_number")}
        </label>
        <input
          id="hadith-jump"
          type="text"
          inputMode="numeric"
          pattern="[0-9\u09E6-\u09EF]*"
          value={numberQuery}
          onChange={(e) => setNumberQuery(e.target.value)}
          placeholder="1"
          className="input h-9 w-28 py-1 text-center"
          aria-label={t("hadith_number")}
        />
        <Button type="submit" variant="secondary">
          {t("go")}
        </Button>
        {numberError && (
          <span className="text-sm text-rose-600">{t("number_not_in_book")}</span>
        )}
      </form>

      {data && (
        <>
          {data.hadiths[0] && data.hadiths[0].hadithNumber !== "1" && (
            <p className="mb-4 text-sm text-ink-500">
              {t("source_starts_at")}{" "}
              {localizeNumber(data.hadiths[0].hadithNumber, language)}.
            </p>
          )}
          {filtered.length === 0 ? (
            <EmptyState title={t("no_results")} body={t("try_another")} />
          ) : (
            <div className="space-y-4">
              {shown.map((entry) => (
                <HadithCard key={entry.id} entry={entry} showBoth />
              ))}
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-6 flex justify-center">
              <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                {t("loading")} ({localizeNumber(shown.length, language)}/
                {localizeNumber(filtered.length, language)})
              </Button>
            </div>
          )}

          <div
            className={cn(
              "mt-10 rounded-xl2 border border-ink-100 bg-white p-5 text-sm text-ink-500",
            )}
          >
            <p className="font-medium text-ink-700">{t("source")}</p>
            <p className="mt-1">
              {data.collection.name} · {t("hadith")} —{" "}
              {resolvedLang === "bn" ? t("bangla") : t("english")} +{" "}
              {t("arabic")}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
