"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BookOpen, Compass, HandHeart, Heart, Home, Library, Search, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import type { AppLanguage } from "@/types";

const navItems = [
  { href: "/", key: "nav_home", icon: Home },
  { href: "/quran", key: "nav_quran", icon: BookOpen },
  { href: "/hadith", key: "nav_hadith", icon: Library },
  { href: "/dua", key: "nav_dua", icon: HandHeart },
  { href: "/explore", key: "nav_explore", icon: Compass },
  { href: "/favorites", key: "nav_favorites", icon: Heart },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { t, language } = useT();
  const setLanguage = useAppStore((s) => s.setLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "bn" ? "ltr" : "ltr";
  }, [language]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-[color:var(--page)]/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={t("appName")} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition",
                  active
                    ? "bg-ink-900 text-white"
                    : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                )}
              >
                <Icon className="h-4 w-4" />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label={t("nav_search")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-100 hover:text-ink-900"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          <LanguageToggle
            language={language}
            onChange={setLanguage}
          />

          <Link href="/create" className="btn-primary hidden h-9 px-4 sm:inline-flex">
            <Sparkles className="h-4 w-4" />
            {t("nav_create")}
          </Link>
        </div>
      </div>
    </header>
  );
}

function LanguageToggle({
  language,
  onChange,
}: {
  language: AppLanguage;
  onChange: (lang: AppLanguage) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-full border border-ink-200 bg-white p-0.5 text-xs font-semibold"
    >
      <button
        type="button"
        onClick={() => onChange("bn")}
        className={cn(
          "rounded-full px-3 py-1.5 font-bangla transition",
          language === "bn" ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900",
        )}
      >
        বাংলা
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={cn(
          "rounded-full px-2.5 py-1.5 transition",
          language === "en" ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900",
        )}
      >
        EN
      </button>
    </div>
  );
}
