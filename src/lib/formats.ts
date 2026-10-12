import type { CardFormat, CardFormatSpec } from "@/types";

export const CARD_FORMATS: Record<CardFormat, CardFormatSpec> = {
  portrait: {
    id: "portrait",
    width: 1080,
    height: 1350,
    label: { en: "Portrait 4:5", bn: "পোর্ট্রেট ৪:৫" },
  },
  square: {
    id: "square",
    width: 1080,
    height: 1080,
    label: { en: "Square 1:1", bn: "স্কয়ার ১:১" },
  },
  story: {
    id: "story",
    width: 1080,
    height: 1920,
    label: { en: "Story 9:16", bn: "স্টোরি ৯:১৬" },
  },
};

export const CARD_FORMAT_LIST: CardFormatSpec[] = [
  CARD_FORMATS.portrait,
  CARD_FORMATS.square,
  CARD_FORMATS.story,
];
