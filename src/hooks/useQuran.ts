"use client";

import { useQuery } from "@tanstack/react-query";
import { quranService, sortByQuranOrder } from "@/services/quran/quranService";
import type { AppLanguage } from "@/types";

export const quranKeys = {
  surahs: ["quran", "surahs"] as const,
  surah: (n: number) => ["quran", "surah", n] as const,
  juz: (n: number) => ["quran", "juz", n] as const,
  search: (q: string, lang: AppLanguage) => ["quran", "search", q, lang] as const,
  searchMany: (keys: string[], lang: AppLanguage) =>
    ["quran", "searchMany", keys, lang] as const,
  ayahRefs: (refs: string[]) => ["quran", "ayahRefs", refs] as const,
};

export function useSurahs() {
  return useQuery({
    queryKey: quranKeys.surahs,
    queryFn: ({ signal }) => quranService.listSurahs(signal),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useSurah(number: number) {
  return useQuery({
    queryKey: quranKeys.surah(number),
    queryFn: ({ signal }) => quranService.getSurah(number, signal),
    enabled: Number.isFinite(number) && number >= 1 && number <= 114,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useJuz(number: number) {
  return useQuery({
    queryKey: quranKeys.juz(number),
    queryFn: ({ signal }) => quranService.getJuz(number, signal),
    enabled: number >= 1 && number <= 30,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useQuranSearch(keyword: string, language: AppLanguage) {
  const term = keyword.trim();
  return useQuery({
    queryKey: quranKeys.search(term, language),
    queryFn: ({ signal }) => quranService.search(term, language, signal),
    enabled: term.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}

export function useQuranSearchMany(keywords: string[], language: AppLanguage) {
  const keys = keywords.map((k) => k.trim()).filter(Boolean).slice(0, 3);
  return useQuery({
    queryKey: quranKeys.searchMany(keys, language),
    queryFn: ({ signal }) => quranService.searchMany(keys, language, signal),
    enabled: keys.length > 0,
    staleTime: 1000 * 60 * 30,
  });
}

/**
 * Word search across the Qur'an matching both the English and the Bangla
 * translation at once, merged into Qur'an order.
 */
export function useQuranSearchBoth(keyword: string) {
  const term = keyword.trim();
  const isBangla = /[\u0980-\u09FF]/.test(term);
  return useQuery({
    queryKey: ["quran", "searchBoth", term] as const,
    queryFn: async ({ signal }) => {
      // Match whichever translation the query's script belongs to.
      return isBangla
        ? quranService.search(term, "bn", signal)
        : quranService.search(term, "en", signal);
    },
    enabled: term.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}

/** Fetches a set of curated verse references like ["2:255", "94:5"]. */
export function useAyahRefs(refs: string[]) {
  return useQuery({
    queryKey: quranKeys.ayahRefs(refs),
    queryFn: async ({ signal }) => {
      const verses = await Promise.all(
        refs.map((ref) => {
          const [surah, ayah] = ref.split(":").map(Number);
          return quranService.getAyah(surah, ayah, signal).catch(() => null);
        }),
      );
      return sortByQuranOrder(
        verses.filter((v): v is NonNullable<typeof v> => Boolean(v)),
      );
    },
    enabled: refs.length > 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
