"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { useQuranSearchBoth } from "@/hooks/useQuran";
import { useCollections, useHadithSearchAll } from "@/hooks/useHadith";
import { useT } from "@/hooks/useT";
import { useDebounce } from "@/hooks/useDebounce";
import { EmptyState, ErrorState } from "@/components/ui/StateViews";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { Segmented } from "@/components/ui/Controls";
import { VerseCard } from "@/components/quran/VerseCard";
import { HadithCard } from "@/components/hadith/HadithCard";
import { SectionHeading } from "@/components/ui/Section";
import { CATEGORIES } from "@/data/categories";

type Tab = "all" | "quran" | "hadith";

export default function SearchPage() {
  const { t, language } = useT();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const debounced = useDebounce(query, 400);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  // Word search matches both the English and the Bangla translation.
  const quran = useQuranSearchBoth(tab === "hadith" ? "" : debounced);
  // Every indexed collection (Bukhari, Muslim, Abu Dawud, …) at once.
  const hadith = useHadithSearchAll(
    tab === "quran" ? "" : debounced,
    tab === "all" ? 6 : 40,
  );

  const collections = useCollections();

  const quranVerses = useMemo(
    () => (quran.data ?? []).slice(0, tab === "all" ? 6 : 40),
    [quran.data, tab],
  );
  const hadithMatches = hadith.data ?? [];

  const term = debounced.trim();
  const topicMatches = useMemo(() => {
    if (term.length < 2) return [];
    const lc = term.toLowerCase();
    return CATEGORIES.filter(
      (c) =>
        c.en.toLowerCase().includes(lc) ||
        c.bn.includes(term) ||
        c.keywords.en.some((k) => k.includes(lc)),
    );
  }, [term]);

  const collectionMatches = useMemo(() => {
    if (term.length < 2) return [];
    const lc = term.toLowerCase();
    return (collections.data ?? []).filter(
      (c) =>
        c.name.toLowerCase().includes(lc) ||
        c.id.includes(lc) ||
        (c.nameBn ?? "").includes(term),
    );
  }, [collections.data, term]);

  const searching = term.length >= 2;
  const quranLoading = quran.isFetching && tab !== "hadith";
  const hadithLoading = hadith.isFetching && tab !== "quran";

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink-900">
          {t("nav_search")}
        </h1>
        <p className="mt-2 text-sm text-ink-500">{t("search_placeholder")}</p>
      </header>

      <div className="relative mb-5">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search_placeholder")}
          className="input pl-11"
          aria-label={t("nav_search")}
        />
      </div>

      <div className="mb-8">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: "all", label: t("search_all") },
            { value: "quran", label: t("nav_quran") },
            { value: "hadith", label: t("nav_hadith") },
          ]}
        />
      </div>

      {!searching && (
        <div className="space-y-6">
          <EmptyState title={t("no_results")} body={t("try_another")} />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.slice(0, 10).map((category) => (
              <Link
                key={category.id}
                href={`/explore/${category.id}`}
                className="chip"
              >
                {language === "bn" ? category.bn : category.en}
              </Link>
            ))}
          </div>
        </div>
      )}

      {searching && (
        <div className="space-y-12">
          {(topicMatches.length > 0 || collectionMatches.length > 0) && (
            <section>
              <SectionHeading title={t("topics")} />
              <div className="flex flex-wrap gap-2">
                {collectionMatches.map((c) => (
                  <Link key={c.id} href={`/hadith/${c.id}`} className="chip">
                    {c.name}
                  </Link>
                ))}
                {topicMatches.map((category) => (
                  <Link
                    key={category.id}
                    href={`/explore/${category.id}`}
                    className="chip"
                  >
                    <span className={language === "bn" ? "font-bangla" : ""}>
                      {language === "bn" ? category.bn : category.en}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {tab !== "hadith" && (
            <section>
              <SectionHeading
                title={t("nav_quran")}
                subtitle={`${t("results_for")} “${term}”`}
              />
              {quran.isError && <ErrorState onRetry={() => quran.refetch()} />}
              {quranLoading && <ListSkeleton rows={2} />}
              {!quranLoading && quranVerses.length === 0 && !quran.isError && (
                <EmptyState title={t("no_results")} body={t("try_another")} />
              )}
              <div className="space-y-4">
                {quranVerses.map((verse) => (
                  <VerseCard key={verse.id} verse={verse} showBoth />
                ))}
              </div>
            </section>
          )}

          {tab !== "quran" && (
            <section>
              <SectionHeading
                title={t("nav_hadith")}
                subtitle={`${t("results_for")} “${term}”`}
              />
              {hadith.isError && <ErrorState onRetry={() => hadith.refetch()} />}
              {hadithLoading && <ListSkeleton rows={2} />}
              {!hadithLoading && hadithMatches.length === 0 && !hadith.isError && (
                <EmptyState title={t("no_results")} body={t("try_another")} />
              )}
              <div className="space-y-4">
                {hadithMatches.map((entry) => (
                  <HadithCard key={entry.id} entry={entry} showBoth />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
