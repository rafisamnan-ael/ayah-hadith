"use client";

import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useOpenInEditor } from "@/hooks/useOpenInEditor";
import { useT } from "@/hooks/useT";
import { useHasMounted } from "@/hooks/useHasMounted";

/**
 * A persistent "create a card" affordance so a photocard is always one tap away
 * while studying. Opens the editor with the most recently viewed verse/hadith.
 */
export function QuickComposeButton() {
  const pathname = usePathname();
  const mounted = useHasMounted();
  const recents = useAppStore((s) => s.recents);
  const openInEditor = useOpenInEditor();
  const { t } = useT();

  if (!mounted || pathname.startsWith("/create")) return null;
  const last = recents[0];
  if (!last) return null;

  return (
    <button
      type="button"
      onClick={() => openInEditor(last)}
      className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-ink-800 md:bottom-6 md:right-6"
      aria-label={t("create_photocard")}
    >
      <Sparkles className="h-4 w-4" />
      <span className="hidden sm:inline">{t("create_photocard")}</span>
    </button>
  );
}
