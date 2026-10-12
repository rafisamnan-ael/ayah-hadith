"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppLanguage, CardFormat, ReligiousContent } from "@/types";
import type { BackgroundStyle } from "@/lib/palettes";

interface Workspace {
  content?: ReligiousContent;
  templateId?: string;
}

interface AppState {
  language: AppLanguage;
  favorites: ReligiousContent[];
  recents: ReligiousContent[];
  recentTemplates: string[];
  lastFormat: CardFormat;
  lastPalette: string;
  lastBackground: BackgroundStyle;
  customBg: string;
  decor: boolean;
  showLogo: boolean;
  showBrand: boolean;
  brandText: string;
  showTransliteration: boolean;
  showFullText: boolean;
  showCategory: boolean;
  lastTextScale: number;
  lastArabicScale: number;
  lastTranslationScale: number;
  workspace: Workspace;

  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;

  isFavorite: (id: string) => boolean;
  toggleFavorite: (content: ReligiousContent) => void;
  removeFavorite: (id: string) => void;

  addRecent: (content: ReligiousContent) => void;
  clearRecents: () => void;

  pushRecentTemplate: (templateId: string) => void;
  setLastFormat: (format: CardFormat) => void;
  setLastPalette: (paletteId: string) => void;
  setLastBackground: (background: BackgroundStyle) => void;
  setCustomBg: (hex: string) => void;
  setDecor: (value: boolean) => void;
  setShowLogo: (value: boolean) => void;
  setShowBrand: (value: boolean) => void;
  setShowTransliteration: (value: boolean) => void;
  setShowFullText: (value: boolean) => void;
  setShowCategory: (value: boolean) => void;
  setBrandText: (value: string) => void;
  setLastTextScale: (value: number) => void;
  setLastArabicScale: (value: number) => void;
  setLastTranslationScale: (value: number) => void;

  openInEditor: (content: ReligiousContent, templateId?: string) => void;
  setWorkspaceTemplate: (templateId: string) => void;
}

const MAX_RECENTS = 12;
const MAX_TEMPLATES = 4;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: "en",
      favorites: [],
      recents: [],
      recentTemplates: [],
      lastFormat: "portrait",
      lastPalette: "ivory",
      lastBackground: "gradient",
      customBg: "#FBF9F5",
      decor: true,
      showLogo: true,
      showBrand: false,
      brandText: "@ayah.hadith",
      showTransliteration: false,
      showFullText: false,
      showCategory: false,
      lastTextScale: 1,
      lastArabicScale: 1,
      lastTranslationScale: 1,
      workspace: {},

      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((s) => ({ language: s.language === "en" ? "bn" : "en" })),

      isFavorite: (id) => get().favorites.some((f) => f.id === id),
      toggleFavorite: (content) =>
        set((s) => {
          const exists = s.favorites.some((f) => f.id === content.id);
          return {
            favorites: exists
              ? s.favorites.filter((f) => f.id !== content.id)
              : [content, ...s.favorites].slice(0, 200),
          };
        }),
      removeFavorite: (id) =>
        set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),

      addRecent: (content) =>
        set((s) => ({
          recents: [content, ...s.recents.filter((r) => r.id !== content.id)].slice(
            0,
            MAX_RECENTS,
          ),
        })),
      clearRecents: () => set({ recents: [] }),

      pushRecentTemplate: (templateId) =>
        set((s) => ({
          recentTemplates: [
            templateId,
            ...s.recentTemplates.filter((t) => t !== templateId),
          ].slice(0, MAX_TEMPLATES),
        })),
      setLastFormat: (lastFormat) => set({ lastFormat }),
      setLastPalette: (lastPalette) => set({ lastPalette }),
      setLastBackground: (lastBackground) => set({ lastBackground }),
      setCustomBg: (customBg) => set({ customBg }),
      setDecor: (decor) => set({ decor }),
      setShowLogo: (showLogo) => set({ showLogo }),
      setShowBrand: (showBrand) => set({ showBrand }),
      setShowTransliteration: (showTransliteration) => set({ showTransliteration }),
      setShowFullText: (showFullText) => set({ showFullText }),
      setShowCategory: (showCategory) => set({ showCategory }),
      setBrandText: (brandText) => set({ brandText }),
      setLastTextScale: (lastTextScale) => set({ lastTextScale }),
      setLastArabicScale: (lastArabicScale) => set({ lastArabicScale }),
      setLastTranslationScale: (lastTranslationScale) => set({ lastTranslationScale }),

      openInEditor: (content, templateId) =>
        set({ workspace: { content, templateId } }),
      setWorkspaceTemplate: (templateId) =>
        set((s) => ({ workspace: { ...s.workspace, templateId } })),
    }),
    {
      name: "ayah-hadith-store",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      // The brand signature is now off by default — reset it once for existing
      // installs so no photocard carries it unless the user enables it.
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as Partial<AppState>;
        if (version < 2) return { ...state, showBrand: false };
        return state;
      },
      partialize: (state) => ({
        language: state.language,
        favorites: state.favorites,
        recents: state.recents,
        recentTemplates: state.recentTemplates,
        lastFormat: state.lastFormat,
        lastPalette: state.lastPalette,
        lastBackground: state.lastBackground,
        customBg: state.customBg,
        decor: state.decor,
        showLogo: state.showLogo,
        showBrand: state.showBrand,
        brandText: state.brandText,
        showTransliteration: state.showTransliteration,
        showFullText: state.showFullText,
        showCategory: state.showCategory,
        lastTextScale: state.lastTextScale,
        lastArabicScale: state.lastArabicScale,
        lastTranslationScale: state.lastTranslationScale,
        workspace: state.workspace,
      }),
    },
  ),
);
