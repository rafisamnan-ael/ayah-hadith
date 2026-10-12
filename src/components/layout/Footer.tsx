"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";
import { Mark } from "./Logo";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-ink-100 bg-white/60">
      <div className="container-page flex flex-col gap-4 py-10 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Mark className="mt-0.5 h-6 w-6 text-ink-300" />
          <div>
            <p className="font-serif text-base font-semibold text-ink-800">
              {t("appName")}
            </p>
            <p className="mt-1 max-w-md text-xs leading-relaxed">{t("footer_note")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-xs sm:items-end">
          <div className="flex gap-4">
            <Link href="/quran" className="hover:text-ink-800">
              {t("nav_quran")}
            </Link>
            <Link href="/hadith" className="hover:text-ink-800">
              {t("nav_hadith")}
            </Link>
            <Link href="/create" className="hover:text-ink-800">
              {t("nav_create")}
            </Link>
          </div>
          <p className="text-ink-400">
            Quran: alquran.cloud · Hadith: fawazahmed0/hadith-api
          </p>
        </div>
      </div>
    </footer>
  );
}
