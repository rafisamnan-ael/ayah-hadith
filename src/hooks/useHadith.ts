"use client";

import { useQuery } from "@tanstack/react-query";
import { hadithService } from "@/services/hadith/hadithService";
import { searchHadithEverywhere } from "@/services/hadith/hadithSearch";
import type { AppLanguage } from "@/types";

export const hadithKeys = {
  collections: ["hadith", "collections"] as const,
  collection: (id: string, lang: AppLanguage) =>
    ["hadith", "collection", id, lang] as const,
  searchAll: (term: string) => ["hadith", "searchAll", term] as const,
};

export function useCollections() {
  return useQuery({
    queryKey: hadithKeys.collections,
    queryFn: ({ signal }) => hadithService.listCollections(signal),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useCollection(collectionId: string, language: AppLanguage) {
  return useQuery({
    queryKey: hadithKeys.collection(collectionId, language),
    queryFn: ({ signal }) =>
      hadithService.getCollection(collectionId, language, signal),
    enabled: Boolean(collectionId),
    // Full collections are large and effectively static.
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60,
  });
}

/** Searches every indexed collection for a word (English or Bangla). */
export function useHadithSearchAll(keyword: string, limit = 24) {
  const term = keyword.trim();
  return useQuery({
    queryKey: hadithKeys.searchAll(term),
    queryFn: () => searchHadithEverywhere(term, limit),
    enabled: term.length >= 2,
    staleTime: 1000 * 60 * 30,
  });
}
