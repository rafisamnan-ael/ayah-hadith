"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { findDuaCategory, duasInCategory } from "@/data/duas";
import { duaRef } from "@/lib/dua";
import { useAyahRefs } from "@/hooks/useQuran";
import { useT } from "@/hooks/useT";
import { DuaCard } from "@/components/dua/DuaCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateViews";
import { cn } from "@/lib/utils";

export default function DuaCategoryPage() {
  const params = useParams<{ category: string }>();
  const category = findDuaCategory(params?.category);
  const duas = useMemo(
    () => (category ? duasInCategory(category.id) : []),
    [category],
  );
  const refs = useMemo(() => duas.map(duaRef), [duas]);
  const resolved = useAyahRefs(refs);
  const { t, language } = useT();
  const bangla = language === "bn";

  if (!category) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title={t("no_results")}
          action={
            <Link href="/dua/quran" className="btn-secondary">
              {t("nav_dua")}
            </Link>
          }
        />
      </div>
    );
  }

  const verseFor = (surah: number, ayah: number) =>
    resolved.data?.find((v) => v.surahNumber === surah && v.verseNumber === ayah);

  return (
    <div className="container-page py-10">
      <Link
        href="/dua/quran"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("nav_dua")}
      </Link>

      <header className="mb-8">
        <p className="label">{t("dua_title")}</p>
        <h1
          className={cn(
            "mt-1 font-serif text-4xl font-semibold tracking-tight text-ink-900",
            bangla && "font-bangla",
          )}
        >
          {bangla ? category.bn : category.en}
        </h1>
      </header>

      {resolved.isLoading && <LoadingState />}
      {resolved.isError && <ErrorState onRetry={() => resolved.refetch()} />}

      <div className="space-y-4">
        {duas.map((dua) => (
          <DuaCard
            key={dua.id}
            dua={dua}
            verse={verseFor(dua.surah, dua.ayah)}
            categoryLabel={bangla ? category.bn : category.en}
          />
        ))}
      </div>
    </div>
  );
}
