"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CATEGORY_GROUPS, findCategory } from "@/data/categories";
import { useT } from "@/hooks/useT";
import { useAyahRefs, useQuranSearchMany } from "@/hooks/useQuran";
import { useCollections, useCollection } from "@/hooks/useHadith";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateViews";
import { Segmented } from "@/components/ui/Controls";
import { SectionHeading } from "@/components/ui/Section";
import { VerseCard } from "@/components/quran/VerseCard";
import { HadithCard } from "@/components/hadith/HadithCard";
import { Button } from "@/components/ui/Button";
import type { HadithEntry } from "@/types";

type Tab = "all" | "quran" | "hadith";
const HADITH_PAGE = 10;

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = findCategory(params?.category);
  const { t, language } = useT();
  const [tab, setTab] = useState<Tab>("all");
  const [visible, setVisible] = useState(HADITH_PAGE);

  const featured = useAyahRefs(category?.verses ?? []);
  const keywords = category?.keywords[language] ?? [];
  const quran = useQuranSearchMany(keywords, language);

  const collections = useCollections();
  const [collectionId, setCollectionId] = useState("bukhari");
  const collectionOptions = useMemo(
    () => (collections.data ?? []).filter((c) => c.translationLanguages.includes("en")),
    [collections.data],
  );
  const { data: hadithData, isLoading: hadithLoading, isError: hadithError, refetch } =
    useCollection(category ? collectionId : "", language);

  const hadithMatches = useMemo<HadithEntry[]>(() => {
    if (!category || !hadithData) return [];
    const enKeys = category.keywords.en.map((k) => k.toLowerCase());
    const bnKeys = category.keywords.bn;
    // Matches are only REORDERED — shortest first (Arabic + the translation
    // that will be shown), since short narrations are easiest to turn into a
    // photocard. The text itself is never altered or shortened.
    const textLen = (h: HadithEntry) =>
      (h.arabic?.length ?? 0) +
      ((language === "bn" ? h.bangla : h.english)?.length ?? 0);
    return hadithData.hadiths
      .filter((h) => {
        const en = (h.english ?? "").toLowerCase();
        const bn = h.bangla ?? "";
        return (
          enKeys.some((k) => en.includes(k)) || bnKeys.some((k) => bn.includes(k))
        );
      })
      .sort((a, b) => textLen(a) - textLen(b));
  }, [category, hadithData, language]);

  if (!category) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title={t("no_results")}
          action={
            <Link href="/explore" className="btn-secondary">
              {t("nav_explore")}
            </Link>
          }
        />
      </div>
    );
  }

  const group = CATEGORY_GROUPS.find((g) => g.id === category.group);
  const featuredVerses = (featured.data ?? []).slice(0, tab === "all" ? 4 : 12);
  const featuredIds = new Set((featured.data ?? []).map((v) => v.id));
  const quranVerses = (quran.data ?? [])
    .filter((v) => !featuredIds.has(v.id))
    .slice(0, tab === "all" ? 4 : 40);
  const hadithShown = hadithMatches.slice(0, tab === "all" ? 4 : visible);

  return (
    <div className="container-page py-10">
      <Link
        href="/explore"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("explore_title")}
      </Link>

      <header className="mb-6">
        <p className={`label ${language === "bn" ? "font-bangla" : ""}`}>
          {language === "bn" ? group?.bn : group?.en}
        </p>
        <h1
          className={`mt-1 font-serif text-4xl font-semibold tracking-tight text-ink-900 ${
            language === "bn" ? "font-bangla" : ""
          }`}
        >
          {language === "bn" ? category.bn : category.en}
        </h1>
        <p className="mt-2 text-sm text-ink-400">{t("topic_note")}</p>
      </header>

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

      <div className="space-y-12">
        {/* Featured curated verses */}
        {tab !== "hadith" && (category.verses?.length ?? 0) > 0 && (
          <section>
            <SectionHeading title={t("featured")} />
            {featured.isLoading && <LoadingState />}
            {featured.isError && <ErrorState onRetry={() => featured.refetch()} />}
            <div className="space-y-4">
              {featuredVerses.map((verse) => (
                <VerseCard key={verse.id} verse={verse} showBoth />
              ))}
            </div>
          </section>
        )}

        {/* Qur'an keyword matches */}
        {tab !== "hadith" && (
          <section>
            <SectionHeading
              title={category.verses?.length ? t("more_on_topic") : t("nav_quran")}
              subtitle={keywords.slice(0, 3).join(" · ")}
            />
            {quran.isLoading && <LoadingState />}
            {quran.isError && <ErrorState onRetry={() => quran.refetch()} />}
            {!quran.isLoading && quranVerses.length === 0 && !quran.isError && (
              <EmptyState title={t("no_results")} body={t("try_another")} />
            )}
            <div className="space-y-4">
              {quranVerses.map((verse) => (
                <VerseCard key={verse.id} verse={verse} showBoth />
              ))}
            </div>
            {tab === "all" && (quran.data?.length ?? 0) > 4 && (
              <button
                type="button"
                onClick={() => setTab("quran")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
              >
                {t("see_more")} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </section>
        )}

        {/* Hadith matches */}
        {tab !== "quran" && (
          <section>
            <SectionHeading
              title={t("nav_hadith")}
              subtitle={t("shortest_first")}
              action={
                <label className="text-xs">
                  <span className="label mr-2">{t("collections")}</span>
                  <select
                    value={collectionId}
                    onChange={(e) => {
                      setCollectionId(e.target.value);
                      setVisible(HADITH_PAGE);
                    }}
                    className="input mt-1 inline-block w-52"
                  >
                    {collectionOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {language === "bn" ? c.nameBn ?? c.name : c.name}
                      </option>
                    ))}
                  </select>
                </label>
              }
            />
            {hadithError && <ErrorState onRetry={() => refetch()} />}
            {(hadithLoading || collections.isLoading) && <LoadingState />}
            {!hadithLoading && hadithMatches.length === 0 && !hadithError && (
              <EmptyState title={t("no_results")} body={t("try_another")} />
            )}
            <div className="space-y-4">
              {hadithShown.map((entry) => (
                <HadithCard key={entry.id} entry={entry} showBoth />
              ))}
            </div>
            {tab === "hadith" && visible < hadithMatches.length && (
              <div className="mt-6 flex justify-center">
                <Button variant="secondary" onClick={() => setVisible((v) => v + HADITH_PAGE)}>
                  {t("see_more")} ({hadithShown.length}/{hadithMatches.length})
                </Button>
              </div>
            )}
            {tab === "all" && hadithMatches.length > 4 && (
              <button
                type="button"
                onClick={() => setTab("hadith")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
              >
                {t("see_more")} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
