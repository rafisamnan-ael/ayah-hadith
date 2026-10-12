"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useT } from "@/hooks/useT";
import { TOPICS } from "@/data/topics";
import { SectionHeading } from "@/components/ui/Section";

export default function TopicsPage() {
  const { t, language } = useT();

  return (
    <div className="container-page py-10">
      <Link
        href="/hadith"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("hadith_title")}
      </Link>

      <SectionHeading title={t("topics")} subtitle={t("topic_note")} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic) => (
          <Link
            key={topic.id}
            href={`/hadith/topics/${topic.id}`}
            className="group flex items-center gap-4 rounded-xl2 border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
              <TrendingUp className="h-5 w-5" />
            </span>
            <span>
              <span
                className={`block font-serif text-lg font-semibold text-ink-900 ${
                  language === "bn" ? "font-bangla" : ""
                }`}
              >
                {language === "bn" ? topic.bn : topic.en}
              </span>
              <span className="mt-0.5 block text-xs text-ink-400">
                {topic.keywords.slice(0, 3).join(", ")}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
