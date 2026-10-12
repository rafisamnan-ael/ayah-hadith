"use client";

import { Bookmark } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import type { ReligiousContent } from "@/types";

export function FavoriteButton({
  content,
  compact,
}: {
  content: ReligiousContent;
  compact?: boolean;
}) {
  const { t } = useT();
  const isFavorite = useAppStore((s) => s.favorites.some((f) => f.id === content.id));
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(content)}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? t("remove_favorite") : t("add_favorite")}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
        isFavorite
          ? "border-sand-300 bg-sand-50 text-sand-800"
          : "border-ink-200 bg-white text-ink-500 hover:border-ink-300 hover:text-ink-800",
      )}
    >
      <Bookmark className={cn("h-3.5 w-3.5", isFavorite && "fill-sand-600 text-sand-600")} />
      {!compact && (isFavorite ? t("remove_favorite") : t("add_favorite"))}
    </button>
  );
}
