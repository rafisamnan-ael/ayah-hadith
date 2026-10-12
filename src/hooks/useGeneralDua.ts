"use client";

import { useQuery } from "@tanstack/react-query";
import type { GeneralDuaData } from "@/types";

/** Fetches a general (Sunnah) du'a with Arabic + English + Bangla via the proxy. */
export function useGeneralDua(ref: string) {
  return useQuery({
    queryKey: ["dua", "general", "v2", ref],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/dua/${ref}?v=2`, { signal });
      if (!res.ok) throw new Error("Failed to load du'a");
      return (await res.json()) as GeneralDuaData;
    },
    enabled: /^\d+$/.test(ref),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
