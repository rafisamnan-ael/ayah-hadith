"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Compass, Library, Search } from "lucide-react";
import { useCollections } from "@/hooks/useHadith";
import { useT } from "@/hooks/useT";
import { ErrorState } from "@/components/ui/StateViews";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { SectionHeading } from "@/components/ui/Section";
import { CATEGORIES } from "@/data/categories";

export default function HadithPage() {
  const { t, language } = useT();
  const collections = useCollections();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = collections.data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (c) => c.name.toLowerCase().includes(q) || c.id.includes(q),
    );
  }, [collections.data, query]);

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="flex items-center gap-3 font-serif text-4xl font-semibold tracking-tight text-ink-900">
          <Library className="h-7 w-7 text-sand-600" />
          {t("hadith_title")}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-500">{t("hadith_sub")}</p>
      </header>

      <div className="relative mb-8">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search_placeholder")}
          className="input pl-11"
          aria-label={t("nav_search")}
        />
      </div>

      <section className="mb-12">
        <SectionHeading
          title={t("collections")}
          subtitle={`${t("hadith_sub")}`}
        />
        {collections.isLoading && <ListSkeleton rows={4} />}
        {collections.isError && (
          <ErrorState onRetry={() => collections.refetch()} />
        )}
        {collections.data && filtered.length === 0 && (
          <p className="rounded-xl2 border border-dashed border-ink-200 bg-white/60 p-6 text-sm text-ink-500">
            {t("no_results")}
          </p>
        )}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((collection) => (
            <Link
              key={collection.id}
              href={`/hadith/${collection.id}`}
              className="group flex flex-col justify-between gap-4 rounded-xl2 border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-soft"
            >
              <div>
                <h3
                  className={`font-serif text-lg font-semibold text-ink-900 ${
                    language === "bn" ? "font-bangla" : ""
                  }`}
                >
                  {language === "bn"
                    ? collection.nameBn ?? collection.name
                    : collection.name}
                </h3>
                {collection.nameArabic && (
                  <p className="mt-1 font-arabic text-base text-ink-400" dir="rtl">
                    {collection.nameArabic}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {collection.translationLanguages.map((l) => (
                  <span
                    key={l}
                    className="rounded-full bg-ink-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-500"
                  >
                    {l === "en" ? t("english") : t("bangla")}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title={t("explore_title")}
          subtitle={t("explore_sub")}
          action={
            <Link
              href="/explore"
              className="text-sm font-medium text-ink-500 hover:text-ink-900"
            >
              {t("see_all")}
            </Link>
          }
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/explore/${category.id}`}
              className="chip"
            >
              <Compass className="h-3.5 w-3.5 text-sage-600" />
              <span className={language === "bn" ? "font-bangla" : ""}>
                {language === "bn" ? category.bn : category.en}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
