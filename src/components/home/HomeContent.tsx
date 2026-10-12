"use client";

import Link from "next/link";
import { BookOpen, Compass, HandHeart, Library, Sparkles } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useAppStore } from "@/store/useAppStore";
import { useHasMounted } from "@/hooks/useHasMounted";
import { CATEGORIES } from "@/data/categories";
import { SectionHeading } from "@/components/ui/Section";
import { contentHref, shortLabel } from "@/lib/routes";
import { TEMPLATES } from "@/components/templates/registry";
import { TypeBadge } from "@/components/ui/ContentCard";
import type { ReligiousContent } from "@/types";

export function HomeContent() {
  const { t, language } = useT();
  const mounted = useHasMounted();
  const recents = useAppStore((s) => s.recents);
  const recentTemplates = useAppStore((s) => s.recentTemplates);

  const templateById = (id: string) => TEMPLATES.find((x) => x.id === id);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-100 bg-gradient-to-b from-white to-sand-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sage-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-sand-100/70 blur-3xl" />
        <div className="container-page relative py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-3 py-1 text-xs font-medium text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-sand-500" />
              {t("tagline")}
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink-950 text-balance sm:text-5xl md:text-6xl">
              {t("hero_title")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
              {t("hero_sub")}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BrowseCard
              href="/quran"
              icon={<BookOpen className="h-6 w-6" />}
              label={t("browse_quran")}
              sub={t("quran_sub")}
            />
            <BrowseCard
              href="/hadith"
              icon={<Library className="h-6 w-6" />}
              label={t("browse_hadith")}
              sub={t("hadith_sub")}
            />
            <BrowseCard
              href="/dua"
              icon={<HandHeart className="h-6 w-6" />}
              label={t("nav_dua")}
              sub={t("dua_sub")}
            />
          </div>
        </div>
      </section>

      <div className="container-page py-12 sm:py-16">
        {mounted && recents.length > 0 && (
          <section className="mb-10">
            <SectionHeading
              title={t("recent_content")}
              action={
                <Link href="/favorites" className="text-sm font-medium text-ink-500 hover:text-ink-900">
                  {t("see_all")}
                </Link>
              }
            />
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {recents.slice(0, 6).map((item) => (
                <RecentMini key={item.id} content={item} language={language} />
              ))}
            </div>
          </section>
        )}

        {mounted && recentTemplates.length > 0 && (
          <section className="mb-14">
            <SectionHeading title={t("recently_used_templates")} />
            <div className="flex flex-wrap gap-2">
              {recentTemplates.map((id) => {
                const tpl = templateById(id);
                if (!tpl) return null;
                return (
                  <Link
                    key={id}
                    href={`/create?template=${id}`}
                    className="chip"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-sand-600" />
                    {tpl.name[language]}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

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
            {CATEGORIES.slice(0, 16).map((category) => (
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
    </div>
  );
}

function BrowseCard({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group card-surface flex items-start gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-white transition group-hover:bg-sand-600">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-serif text-xl font-semibold text-ink-900">
          {label}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-500">
          {sub}
        </span>
      </span>
    </Link>
  );
}

function RecentMini({
  content,
  language,
}: {
  content: ReligiousContent;
  language: "en" | "bn";
}) {
  const text = (language === "bn" ? content.bangla : content.english) || content.arabic || "";
  return (
    <Link
      href={contentHref(content)}
      className="group w-44 shrink-0 rounded-xl border border-ink-100 bg-white p-3 transition hover:border-ink-200 hover:shadow-soft"
    >
      <TypeBadge type={content.type} />
      <p className="mt-1.5 truncate font-serif text-[13px] font-semibold text-ink-900">
        {shortLabel(content, language)}
      </p>
      {text && (
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-500">
          {text}
        </p>
      )}
    </Link>
  );
}
