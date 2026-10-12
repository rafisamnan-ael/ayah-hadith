"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Compass, Search } from "lucide-react";
import { CATEGORIES, CATEGORY_GROUPS } from "@/data/categories";
import { useQuranSearchBoth } from "@/hooks/useQuran";
import { useHadithSearchAll } from "@/hooks/useHadith";
import { useDebounce } from "@/hooks/useDebounce";
import { useT } from "@/hooks/useT";
import { VerseCard } from "@/components/quran/VerseCard";
import { HadithCard } from "@/components/hadith/HadithCard";
import { ListSkeleton } from "@/components/ui/Skeleton";

export default function ExplorePage() {
  const { t, language } = useT();
  const [query, setQuery] = useState("");
  const [word, setWord] = useState("");
  const debouncedWord = useDebounce(word, 400);

  const wordTerm = debouncedWord.trim();
  const searchingWord = wordTerm.length >= 2;
  const quranHits = useQuranSearchBoth(searchingWord ? debouncedWord : "");
  const hadithHits = useHadithSearchAll(searchingWord ? debouncedWord : "", 4);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORY_GROUPS.map((g) => ({
      ...g,
      items: CATEGORIES.filter((c) => {
        if (c.group !== g.id) return false;
        if (!q) return true;
        return (
          c.en.toLowerCase().includes(q) ||
          c.bn.includes(query.trim()) ||
          c.keywords.en.some((k) => k.includes(q)) ||
          c.keywords.bn.some((k) => k.includes(query.trim()))
        );
      }),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const verseHits = (quranHits.data ?? []).slice(0, 3);
  const narrationHits = (hadithHits.data ?? []).slice(0, 3);

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="flex items-center gap-3 font-serif text-4xl font-semibold tracking-tight text-ink-900">
          <Compass className="h-7 w-7 text-sage-600" />
          {t("explore_title")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">{t("explore_sub")}</p>
      </header>

      <div className="mb-10 rounded-xl2 border border-ink-100 bg-white p-5 shadow-soft">
        <p className="mb-3 font-serif text-lg font-semibold text-ink-900">
          {t("search_by_word")}
        </p>
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder={t("search_word_placeholder")}
            className="input pl-11"
            aria-label={t("search_by_word")}
          />
        </div>

        {searchingWord && (
          <div className="mt-5 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-ink-500">
                {t("results_for")} “{wordTerm}”
              </p>
              <Link
                href={`/search?q=${encodeURIComponent(wordTerm)}`}
                className="text-sm font-medium text-sand-700 hover:underline"
              >
                {t("see_more")} →
              </Link>
            </div>

            {(quranHits.isFetching || hadithHits.isFetching) &&
              verseHits.length === 0 &&
              narrationHits.length === 0 && <ListSkeleton rows={2} />}

            {verseHits.length > 0 && (
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                  {t("nav_quran")}
                </p>
                <div className="space-y-4">
                  {verseHits.map((verse) => (
                    <VerseCard key={verse.id} verse={verse} showBoth />
                  ))}
                </div>
              </div>
            )}

            {narrationHits.length > 0 && (
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                  {t("nav_hadith")}
                </p>
                <div className="space-y-4">
                  {narrationHits.map((entry) => (
                    <HadithCard key={entry.id} entry={entry} showBoth />
                  ))}
                </div>
              </div>
            )}

            {!quranHits.isFetching &&
              !hadithHits.isFetching &&
              verseHits.length === 0 &&
              narrationHits.length === 0 && (
                <p className="text-sm text-ink-500">{t("no_results")}</p>
              )}
          </div>
        )}
      </div>

      <div className="relative mb-8 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("filter_categories")}
          className="input pl-11"
          aria-label={t("filter_categories")}
        />
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.id}>
            <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">
              <span className={language === "bn" ? "font-bangla" : ""}>
                {language === "bn" ? group.bn : group.en}
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((category) => (
                <Link
                  key={category.id}
                  href={`/explore/${category.id}`}
                  className="group flex flex-col justify-between gap-3 rounded-xl2 border border-ink-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-soft"
                >
                  <span
                    className={`font-serif text-lg font-semibold text-ink-900 group-hover:text-sand-700 ${
                      language === "bn" ? "font-bangla" : ""
                    }`}
                  >
                    {language === "bn" ? category.bn : category.en}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-ink-400">
                    {category.keywords[language].slice(0, 3).join(" · ")}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 && (
          <p className="rounded-xl2 border border-dashed border-ink-200 bg-white/60 p-6 text-sm text-ink-500">
            {t("no_results")}
          </p>
        )}
      </div>
    </div>
  );
}
