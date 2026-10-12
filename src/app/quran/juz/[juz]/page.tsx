"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { useJuz } from "@/hooks/useQuran";
import { useT } from "@/hooks/useT";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateViews";
import { VerseCard } from "@/components/quran/VerseCard";
import { Button } from "@/components/ui/Button";
import { localizeNumber } from "@/lib/utils";
import type { QuranVerse } from "@/types";

const PAGE_SIZE = 20;

export default function JuzPage() {
  const params = useParams<{ juz: string }>();
  const juz = Number(params?.juz);
  const { t, language } = useT();
  const { data, isLoading, isError, refetch } = useJuz(juz);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const verses = useMemo(() => data ?? [], [data]);
  const shown = useMemo(() => verses.slice(0, visible), [verses, visible]);

  const groups = useMemo(() => groupBySurah(shown), [shown]);

  return (
    <div className="container-page py-10">
      <Link
        href="/quran"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("quran_title")}
      </Link>

      <header className="mb-8 flex items-center gap-4 rounded-xl2 border border-ink-100 bg-white p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
          <Layers className="h-6 w-6" />
        </span>
        <div>
          <p className="label">{t("juz")}</p>
          <h1 className="font-serif text-2xl font-semibold text-ink-900">
            {t("juz")} {localizeNumber(juz, language)}
          </h1>
        </div>
      </header>

      {isLoading && <LoadingState />}
      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && verses.length === 0 && <EmptyState title={t("empty_quran")} />}

      <div className="space-y-6">
        {groups.map((group) => (
          <Fragment key={group.surahNumber}>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={`/quran/${group.surahNumber}`}
                className="font-serif text-lg font-semibold text-ink-800 hover:text-sand-700"
              >
                {group.surahNameEnglish}
              </Link>
              <span className="h-px flex-1 bg-ink-100" />
              <span className="text-xs text-ink-400">
                {t("surah")} {localizeNumber(group.surahNumber, language)}
              </span>
            </div>
            <div className="space-y-4">
              {group.verses.map((verse) => (
                <VerseCard key={verse.id} verse={verse} showBoth />
              ))}
            </div>
          </Fragment>
        ))}
      </div>

      {visible < verses.length && (
        <div className="mt-6 flex justify-center">
          <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            {t("loading")} ({localizeNumber(visible, language)}/
            {localizeNumber(verses.length, language)})
          </Button>
        </div>
      )}
    </div>
  );
}

function groupBySurah(verses: QuranVerse[]) {
  const groups: Array<{
    surahNumber: number;
    surahNameEnglish: string;
    verses: QuranVerse[];
  }> = [];
  for (const verse of verses) {
    const last = groups[groups.length - 1];
    if (last && last.surahNumber === verse.surahNumber) {
      last.verses.push(verse);
    } else {
      groups.push({
        surahNumber: verse.surahNumber,
        surahNameEnglish: verse.surahNameEnglish,
        verses: [verse],
      });
    }
  }
  return groups;
}
