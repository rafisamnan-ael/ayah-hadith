"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/hooks/useT";
import { useHasMounted } from "@/hooks/useHasMounted";
import { EmptyState } from "@/components/ui/StateViews";
import { ContentCard } from "@/components/ui/ContentCard";
import { contentHref, shortLabel } from "@/lib/routes";

export default function FavoritesPage() {
  const { t } = useT();
  const mounted = useHasMounted();
  const favorites = useAppStore((s) => s.favorites);

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="flex items-center gap-3 font-serif text-4xl font-semibold tracking-tight text-ink-900">
          <Heart className="h-7 w-7 text-sand-600" />
          {t("favorites_title")}
        </h1>
      </header>

      {mounted && favorites.length === 0 && (
        <EmptyState
          title={t("favorites_empty")}
          action={
            <div className="flex gap-3">
              <Link href="/quran" className="btn-secondary">
                {t("browse_quran")}
              </Link>
              <Link href="/hadith" className="btn-primary">
                {t("browse_hadith")}
              </Link>
            </div>
          }
        />
      )}

      <div className="space-y-4">
        {mounted &&
          favorites.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              heading={shortLabel(content)}
              showBothTranslations
              compact
              readHref={contentHref(content)}
              readLabel={t("open")}
            />
          ))}
      </div>
    </div>
  );
}
