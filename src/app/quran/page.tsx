"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, ChevronRight, Compass, Layers, Search } from "lucide-react";
import { useSurahs } from "@/hooks/useQuran";
import { useT } from "@/hooks/useT";
import { ErrorState, LoadingState } from "@/components/ui/StateViews";
import { Segmented } from "@/components/ui/Controls";
import { Button } from "@/components/ui/Button";
import { localizeNumber, parseDigits } from "@/lib/utils";
import { surahNameBn } from "@/data/surahNamesBn";
import type { SurahSummary } from "@/types";

export default function QuranPage() {
  const { t, language } = useT();
  const router = useRouter();
  const [tab, setTab] = useState<"surahs" | "juz">("surahs");
  const [query, setQuery] = useState("");
  const [refQuery, setRefQuery] = useState("");
  const [revelation, setRevelation] = useState<"all" | "Meccan" | "Medinan">("all");
  const [sort, setSort] = useState<"number" | "length">("number");
  const surahs = useSurahs();

  /** Jumps to a verse from a "surah:ayah" reference (accepts Bangla digits). */
  const goToRef = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = refQuery
      .split(/[^\d\u09E6-\u09EF]+/)
      .map(parseDigits)
      .filter(Boolean)
      .map(Number);
    if (!parts.length) return;
    const [surah, ayah] = parts;
    if (surah < 1 || surah > 114) return;
    router.push(ayah ? `/quran/${surah}?verse=${ayah}` : `/quran/${surah}`);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = (surahs.data ?? []).filter((s) => {
      if (revelation !== "all" && s.revelationType !== revelation) return false;
      if (!q) return true;
      return (
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        String(s.number) === q ||
        s.name.includes(query.trim())
      );
    });
    return sort === "length"
      ? [...list].sort((a, b) => a.numberOfAyahs - b.numberOfAyahs)
      : list;
  }, [surahs.data, query, revelation, sort]);

  return (
    <div className="container-page py-10">
      <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 font-serif text-4xl font-semibold tracking-tight text-ink-900">
            <BookOpen className="h-7 w-7 text-sage-600" />
            {t("quran_title")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-ink-500">{t("quran_sub")}</p>
        </div>
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: "surahs", label: t("surahs"), icon: <BookOpen className="h-4 w-4" /> },
            { value: "juz", label: t("juz"), icon: <Layers className="h-4 w-4" /> },
          ]}
        />
      </header>

      {tab === "surahs" && (
        <div className="mb-6 space-y-4">
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
          <form
            onSubmit={goToRef}
            className="flex flex-wrap items-center gap-2"
          >
            <label htmlFor="ref-jump" className="text-sm font-medium text-ink-600">
              {t("go_to_ayah")}
            </label>
            <input
              id="ref-jump"
              type="text"
              inputMode="numeric"
              value={refQuery}
              onChange={(e) => setRefQuery(e.target.value)}
              placeholder="27:19"
              className="input h-9 w-32 py-1 text-center"
              aria-label={t("go_to_ayah")}
            />
            <Button type="submit" variant="secondary">
              {t("go")}
            </Button>
          </form>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Segmented
                size="sm"
                value={revelation}
                onChange={(v) => setRevelation(v as "all" | "Meccan" | "Medinan")}
                options={[
                  { value: "all", label: t("all_revelation") },
                  { value: "Meccan", label: t("meccan") },
                  { value: "Medinan", label: t("medinan") },
                ]}
              />
              <label className="text-xs">
                <span className="label mr-2">{t("sort_by")}</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "number" | "length")}
                  className="input mt-1 inline-block w-40"
                >
                  <option value="number">{t("sort_number")}</option>
                  <option value="length">{t("sort_length")}</option>
                </select>
              </label>
            </div>
            <Link href="/explore" className="btn-secondary">
              <Compass className="h-4 w-4" />
              {t("quran_themes")}
            </Link>
          </div>
        </div>
      )}

      {tab === "surahs" ? (
        <SurahList
          surahs={filtered}
          loading={surahs.isLoading}
          error={surahs.isError}
          onRetry={() => surahs.refetch()}
          language={language}
        />
      ) : (
        <JuzGrid language={language} />
      )}
    </div>
  );
}

function SurahList({
  surahs,
  loading,
  error,
  onRetry,
  language,
}: {
  surahs: SurahSummary[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  language: "en" | "bn";
}) {
  const { t } = useT();
  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={onRetry} />;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {surahs.map((surah) => (
        <Link
          key={surah.number}
          href={`/quran/${surah.number}`}
          className="group flex items-center gap-4 rounded-xl2 border border-ink-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-soft"
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <span className="absolute inset-0 rotate-45 rounded-lg bg-sand-50 ring-1 ring-sand-200 transition group-hover:bg-sand-100" />
            <span className="relative text-sm font-semibold text-sand-800">
              {localizeNumber(surah.number, language)}
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline justify-between gap-3">
              <span
                className={`truncate font-serif text-base font-semibold text-ink-900 ${
                  language === "bn" ? "font-bangla" : ""
                }`}
              >
                {language === "bn"
                  ? surahNameBn(surah.number) ?? surah.englishName
                  : surah.englishName}
              </span>
              <span className="shrink-0 font-arabic text-lg text-ink-700" dir="rtl">
                {surah.name}
              </span>
            </span>
            <span className="mt-0.5 flex items-center gap-2 text-xs text-ink-400">
              <span className="truncate">
                {surah.englishName}
                {language === "bn" ? ` · ${surah.englishNameTranslation}` : ""}
              </span>
              <span className="text-ink-200">·</span>
              <span className="shrink-0">
                {localizeNumber(surah.numberOfAyahs, language)} {t("verses")}
              </span>
              <span className="text-ink-200">·</span>
              <span className="shrink-0 capitalize">
                {surah.revelationType.toLowerCase() === "meccan"
                  ? t("meccan")
                  : t("medinan")}
              </span>
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-300" />
        </Link>
      ))}
    </div>
  );
}

function JuzGrid({ language }: { language: "en" | "bn" }) {
  const { t } = useT();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
        <Link
          key={juz}
          href={`/quran/juz/${juz}`}
          className="flex flex-col items-center justify-center gap-1 rounded-xl2 border border-ink-100 bg-white py-6 transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-soft"
        >
          <span className="font-serif text-2xl font-semibold text-ink-900">
            {localizeNumber(juz, language)}
          </span>
          <span className="text-xs uppercase tracking-wide text-ink-400">
            {t("juz")}
          </span>
        </Link>
      ))}
    </div>
  );
}
