"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  findGeneralDuaCategory,
  generalDuasInCategory,
} from "@/data/generalDuas";
import { useT } from "@/hooks/useT";
import { GeneralDuaCard } from "@/components/dua/GeneralDuaCard";
import { EmptyState } from "@/components/ui/StateViews";
import { cn } from "@/lib/utils";

export default function GeneralDuaCategoryPage() {
  const params = useParams<{ category: string }>();
  const category = findGeneralDuaCategory(params?.category);
  const { t, language } = useT();
  const bangla = language === "bn";

  if (!category) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title={t("no_results")}
          action={
            <Link href="/dua/general" className="btn-secondary">
              {t("general_dua")}
            </Link>
          }
        />
      </div>
    );
  }

  const duas = generalDuasInCategory(category.id);
  const label = bangla ? category.bn : category.en;

  return (
    <div className="container-page py-10">
      <Link
        href="/dua/general"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("general_dua")}
      </Link>

      <header className="mb-8">
        <p className="label">{t("general_dua")}</p>
        <h1
          className={cn(
            "mt-1 font-serif text-4xl font-semibold tracking-tight text-ink-900",
            bangla && "font-bangla",
          )}
        >
          {label}
        </h1>
      </header>

      <div className="space-y-4">
        {duas.map((dua) => (
          <GeneralDuaCard key={dua.id} dua={dua} categoryLabel={label} />
        ))}
      </div>
    </div>
  );
}
