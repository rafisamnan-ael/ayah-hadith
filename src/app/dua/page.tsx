"use client";

import Link from "next/link";
import { BookOpen, HandHeart, Sparkles } from "lucide-react";
import { useT } from "@/hooks/useT";
import { DUA_CATEGORIES, DUAS } from "@/data/duas";
import { GENERAL_DUA_CATEGORIES, GENERAL_DUAS } from "@/data/generalDuas";
import { cn } from "@/lib/utils";

export default function DuaPage() {
  const { t, language } = useT();
  const bangla = language === "bn";

  const options = [
    {
      href: "/dua/quran",
      icon: <BookOpen className="h-6 w-6" />,
      title: t("quranic_dua"),
      sub: t("quranic_dua_sub"),
      count: DUAS.length,
      cats: DUA_CATEGORIES.length,
    },
    {
      href: "/dua/general",
      icon: <HandHeart className="h-6 w-6" />,
      title: t("general_dua"),
      sub: t("general_dua_sub"),
      count: GENERAL_DUAS.length,
      cats: GENERAL_DUA_CATEGORIES.length,
    },
  ];

  return (
    <div className="container-page py-10">
      <header className="mb-10">
        <h1 className="flex items-center gap-3 font-serif text-4xl font-semibold tracking-tight text-ink-900">
          <HandHeart className="h-7 w-7 text-sage-600" />
          {t("dua_title")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">{t("dua_sub")}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <Link
            key={option.href}
            href={option.href}
            className="group card-surface flex items-start gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-white transition group-hover:bg-sand-600">
              {option.icon}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block font-serif text-xl font-semibold text-ink-900",
                  bangla && "font-bangla",
                )}
              >
                {option.title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-500">
                {option.sub}
              </span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-400">
                <Sparkles className="h-3.5 w-3.5" />
                {option.cats} {t("categories")} · {option.count} {t("duas")}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
