"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";
import { duaCardContent } from "@/lib/duaCard";
import type { ReligiousContent } from "@/types";

export function useOpenInEditor() {
  const router = useRouter();
  const openInEditor = useAppStore((s) => s.openInEditor);
  const addRecent = useAppStore((s) => s.addRecent);
  return useCallback(
    (content: ReligiousContent, templateId?: string) => {
      addRecent(content);
      openInEditor(duaCardContent(content), templateId);
      router.push("/create");
    },
    [addRecent, openInEditor, router],
  );
}
