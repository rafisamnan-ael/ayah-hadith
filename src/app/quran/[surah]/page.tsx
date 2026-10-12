"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useSurah, useAyahRefs } from "@/hooks/useQuran";
import { useT } from "@/hooks/useT";
import { useAppStore } from "@/store/useAppStore";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateViews";
import { VerseCard } from "@/components/quran/VerseCard";
import { ContentCard } from "@/components/ui/ContentCard";
import { verseToContent } from "@/services/quran/quranService";
import { localizeNumber, parseNumber } from "@/lib/utils";
import { surahNameBn } from "@/data/surahNamesBn";
import { Button } from "@/components/ui/Button";
import type { ReligiousContent } from "@/types";

const PAGE_SIZE = 20;

export default function SurahPage() {
  const params = useParams<{ surah: string }>();
  const surahNumber = Number(params?.surah);
  const { t, language } = useT();
  const addRecent = useAppStore((s) => s.addRecent);
  const { data, isLoading, isError, refetch } = useSurah(surahNumber);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [target, setTarget] = useState<number | null>(null);
  const [ayahQuery, setAyahQuery] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = new URLSearchParams(window.location.search).get("verse");
    setTarget(v ? Number(v) : null);
  }, [surahNumber]);

  useEffect(() => {
    if (!data || !target) return;
    const verse = data.verses.find((v) => v.verseNumber === target);
    if (verse) addRecent(verseToContent(verse));
  }, [data, target, addRecent]);

  const verses = useMemo(() => data?.verses ?? [], [data]);
  const shown = useMemo(() => verses.slice(0, visible), [verses, visible]);

  // The Bismillah is shown as "ayah 0" for every surah except Al-Fatiha (where
  // the source already numbers it as ayah 1, keeping the total at 7) and
  // At-Tawbah (which has none). Its translation is reused from 1:1 (same text,
  // same provider) — never fabricated.
  const basmalaRef = useAyahRefs(data?.basmala ? ["1:1"] : []);
  const basmalaContent = useMemo<ReligiousContent | null>(() => {
    if (!data?.basmala) return null;
    const ref = basmalaRef.data?.[0];
    return {
      id: `quran:${surahNumber}:0`,
      type: "quran",
      arabic: data.basmala,
      english: ref?.english,
      bangla: ref?.bangla,
      surahName: data.surah.name,
      surahNameEnglish: data.surah.englishName,
      surahNumber,
      verseNumber: 0,
    };
  }, [data, basmalaRef.data, surahNumber]);

  const scrolledRef = useRef(false);
  useEffect(() => {
    if (!target || !data || scrolledRef.current) return;
    const el = document.getElementById(`verse-${target}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      scrolledRef.current = true;
    }
  }, [target, data, shown]);

  /** Jump to a specific ayah number: reveal it, scroll to it, keep the URL. */
  const goToAyah = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const n = parseNumber(ayahQuery);
      if (n === null || n < 1) return;
      scrolledRef.current = false;
      setVisible((v) => Math.max(v, n));
      setTarget(n);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("verse", String(n));
        window.history.replaceState({}, "", url);
      }
    },
    [ayahQuery],
  );

  return (
    <div className="container-page py-10">
      <Link
        href="/quran"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("quran_title")}
      </Link>

      {isLoading && <LoadingState />}
      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && (
        <>
          <header className="mb-8 overflow-hidden rounded-xl2 border border-ink-100 bg-gradient-to-br from-white to-sage-50 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="label">{t("surah")}</p>
                <h1
                  className={`mt-1 font-serif text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl ${
                    language === "bn" ? "font-bangla" : ""
                  }`}
                >
                  {language === "bn"
                    ? surahNameBn(surahNumber) ?? data.surah.englishName
                    : data.surah.englishName}
                </h1>
                <p className="mt-1 text-sm text-ink-500">
                  {language === "bn" && `${data.surah.englishName} · `}
                  {data.surah.englishNameTranslation} ·{" "}
                  {localizeNumber(data.surah.numberOfAyahs, language)} {t("verses")}{" "}
                  ·{" "}
                  {data.surah.revelationType.toLowerCase() === "meccan"
                    ? t("meccan")
                    : t("medinan")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-arabic text-4xl text-ink-800" dir="rtl">
                  {data.surah.name}
                </p>
                <p className="mt-1 text-xs text-ink-400">
                  {t("surah")} {localizeNumber(surahNumber, language)}
                </p>
              </div>
            </div>

            <form
              onSubmit={goToAyah}
              className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-4"
            >
              <label htmlFor="ayah-jump" className="text-sm font-medium text-ink-600">
                {t("ayah_number")}
              </label>
              <input
                id="ayah-jump"
                type="text"
                inputMode="numeric"
                pattern="[0-9\u09E6-\u09EF]*"
                value={ayahQuery}
                onChange={(e) => setAyahQuery(e.target.value)}
                placeholder={`1–${data.surah.numberOfAyahs}`}
                className="input h-9 w-28 py-1 text-center"
                aria-label={t("ayah_number")}
              />
              <Button type="submit" variant="secondary">
                {t("go")}
              </Button>
            </form>
          </header>

          {basmalaContent && (
            <div className="mb-4">
              <ContentCard
                content={basmalaContent}
                heading={localizeNumber(0, language)}
                subheading={
                  language === "bn"
                    ? surahNameBn(surahNumber) ?? data.surah.englishName
                    : data.surah.englishName
                }
                showBothTranslations
                bangla={language === "bn"}
              />
            </div>
          )}

          {verses.length === 0 ? (
            <EmptyState title={t("empty_quran")} />
          ) : (
            <div className="space-y-4">
              {shown.map((verse) => (
                <div key={verse.id} id={`verse-${verse.verseNumber}`}>
                  <VerseCard
                    verse={verse}
                    showBoth
                    highlight={target === verse.verseNumber}
                  />
                </div>
              ))}
            </div>
          )}

          {visible < verses.length && (
            <div className="mt-6 flex justify-center">
              <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                {t("loading")} ({localizeNumber(visible, language)}/
                {localizeNumber(verses.length, language)})
              </Button>
            </div>
          )}

          <nav className="mt-10 flex items-center justify-between border-t border-ink-100 pt-6">
            {surahNumber > 1 ? (
              <Link href={`/quran/${surahNumber - 1}`} className="btn-secondary">
                <ArrowLeft className="h-4 w-4" />
                {localizeNumber(surahNumber - 1, language)}
              </Link>
            ) : (
              <span />
            )}
            {surahNumber < 114 ? (
              <Link href={`/quran/${surahNumber + 1}`} className="btn-secondary">
                {localizeNumber(surahNumber + 1, language)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </>
      )}

      {!data && !isLoading && !isError && (
        <EmptyState
          title={t("empty_quran")}
          action={
            <Link href="/quran" className="btn-secondary">
              <BookOpen className="h-4 w-4" />
              {t("browse_quran")}
            </Link>
          }
        />
      )}
    </div>
  );
}
