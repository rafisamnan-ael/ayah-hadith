"use client";

import Link from "next/link";
import { ArrowLeft, HandHeart } from "lucide-react";
import { GENERAL_DUA_CATEGORIES, GENERAL_DUAS } from "@/data/generalDuas";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";

export default function GeneralDuaPage() {
  const { t, language } = useT();
  const bangla = language === "bn";

  return (
    <div className="container-page py-10">
      <Link
        href="/dua"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("nav_dua")}
      </Link>

      <header className="mb-8">
        <h1 className="flex items-center gap-3 font-serif text-4xl font-semibold tracking-tight text-ink-900">
          <HandHeart className="h-7 w-7 text-sage-600" />
          <span className={cn(bangla && "font-bangla")}>{t("general_dua")}</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          {t("general_dua_sub")}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {GENERAL_DUA_CATEGORIES.map((category) => {
          const count = GENERAL_DUAS.filter((d) => d.category === category.id).length;
          return (
            <Link
              key={category.id}
              href={`/dua/general/${category.id}`}
              className="group flex flex-col justify-between gap-3 rounded-xl2 border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-soft"
            >
              <span
                className={cn(
                  "font-serif text-lg font-semibold text-ink-900 group-hover:text-sand-700",
                  bangla && "font-bangla",
                )}
              >
                {bangla ? category.bn : category.en}
              </span>
              <span className="text-[11px] uppercase tracking-wide text-ink-400">
                {count} {t("duas")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
