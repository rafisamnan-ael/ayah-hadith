import type { ComponentType } from "react";
import type { TemplateDefinition } from "@/types";
import type { TemplateRenderProps } from "./shared";
import { Template01 } from "./items/Template01";
import { Template02 } from "./items/Template02";
import { Template03 } from "./items/Template03";
import { Template04 } from "./items/Template04";
import { Template05 } from "./items/Template05";
import { Template06 } from "./items/Template06";
import { Template07 } from "./items/Template07";
import { Template08 } from "./items/Template08";
import { Template09 } from "./items/Template09";
import { Template10 } from "./items/Template10";
import { Template11 } from "./items/Template11";
import { Template12 } from "./items/Template12";
import { Template13 } from "./items/Template13";
import { Template14 } from "./items/Template14";
import { Template15 } from "./items/Template15";
import { Template16 } from "./items/Template16";
import { Template17 } from "./items/Template17";
import { Template18 } from "./items/Template18";
import { Template19 } from "./items/Template19";
import { Template20 } from "./items/Template20";
import { Template21 } from "./items/Template21";
import { Template22 } from "./items/Template22";
import { Template23 } from "./items/Template23";
import { Template24 } from "./items/Template24";
import { Template25 } from "./items/Template25";
import { Template26 } from "./items/Template26";
import { Template27 } from "./items/Template27";
import { Template28 } from "./items/Template28";
import { Template29 } from "./items/Template29";
import { Template30 } from "./items/Template30";

export interface TemplateEntry extends TemplateDefinition {
  Component: ComponentType<TemplateRenderProps>;
}

export const TEMPLATE_GROUPS: Array<{
  id: NonNullable<TemplateDefinition["group"]>;
  en: string;
  bn: string;
}> = [
  { id: "minimal", en: "Minimal", bn: "মিনিমাল" },
  { id: "editorial", en: "Editorial", bn: "এডিটোরিয়াল" },
  { id: "themed", en: "Themed", bn: "থিমভিত্তিক" },
  { id: "image", en: "Photo", bn: "ছবি" },
];

export const TEMPLATES: TemplateEntry[] = [
  {
    id: "minimal-white",
    name: { en: "Minimal", bn: "মিনিমাল" },
    description: { en: "Clean, elegant restraint.", bn: "পরিষ্কার, মার্জিত।" },
    group: "minimal",
    defaultPalette: "ivory",
    supportsImage: false,
    capacity: "long",
    arabicHero: true,
    Component: Template01,
  },
  {
    id: "soft-neutral",
    name: { en: "Soft Neutral", bn: "সফট নিউট্রাল" },
    description: { en: "Warm, translation-led.", bn: "উষ্ণ, অনুবাদ-কেন্দ্রিক।" },
    group: "minimal",
    defaultPalette: "sand",
    supportsImage: false,
    capacity: "long",
    arabicHero: false,
    Component: Template03,
  },
  {
    id: "quiet-line",
    name: { en: "Quiet Line", bn: "কোয়ায়েট লাইন" },
    description: { en: "Accent rule, open space.", bn: "অ্যাকসেন্ট রুল, খোলা স্পেস।" },
    group: "minimal",
    defaultPalette: "slate",
    supportsImage: false,
    capacity: "long",
    arabicHero: true,
    Component: Template13,
  },
  {
    id: "framed-minimal",
    name: { en: "Framed Minimal", bn: "ফ্রেমড মিনিমাল" },
    description: { en: "Hairline frame, centered.", bn: "হেয়ারলাইন ফ্রেম, কেন্দ্রীভূত।" },
    group: "minimal",
    defaultPalette: "sand",
    supportsImage: false,
    capacity: "long",
    arabicHero: true,
    Component: Template12,
  },
  {
    id: "monogram",
    name: { en: "Monogram", bn: "মনোগ্রাম" },
    description: { en: "Circular monogram, centered.", bn: "সার্কুলার মনোগ্রাম, কেন্দ্রীভূত।" },
    group: "minimal",
    defaultPalette: "ivory",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template14,
  },
  {
    id: "gallery",
    name: { en: "Gallery", bn: "গ্যালারি" },
    description: { en: "Ruled top & bottom, serif hero.", bn: "উপর-নিচ রুল, সেরিফ হিরো।" },
    group: "minimal",
    defaultPalette: "ivory",
    supportsImage: false,
    capacity: "long",
    arabicHero: false,
    Component: Template15,
  },
  {
    id: "column",
    name: { en: "Column", bn: "কলাম" },
    description: { en: "Split columns, hairlines.", bn: "বিভক্ত কলাম, হেয়ারলাইন।" },
    group: "minimal",
    defaultPalette: "sand",
    supportsImage: false,
    capacity: "long",
    arabicHero: true,
    Component: Template18,
  },
  {
    id: "sabr",
    name: { en: "Sabr — Calm", bn: "সবর — প্রশান্তি" },
    description: { en: "Patient, spacious calm.", bn: "ধৈর্যশীল, খোলামেলা প্রশান্তি।" },
    group: "minimal",
    defaultPalette: "sage",
    supportsImage: false,
    capacity: "long",
    arabicHero: true,
    Component: Template29,
  },

  {
    id: "dark-editorial",
    name: { en: "Editorial", bn: "এডিটোরিয়াল" },
    description: { en: "Large Arabic, left margin.", bn: "বড় আরবি, বাম মার্জিন।" },
    group: "editorial",
    defaultPalette: "ink",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template02,
  },
  {
    id: "premium-bw",
    name: { en: "Monochrome", bn: "মনোক্রোম" },
    description: { en: "High-contrast, rule-led.", bn: "উচ্চ-কনট্রাস্ট, রুল-নির্ভর।" },
    group: "editorial",
    defaultPalette: "ivory",
    supportsImage: false,
    capacity: "medium",
    arabicHero: false,
    Component: Template08,
  },
  {
    id: "typography-focus",
    name: { en: "Typography Focus", bn: "টাইপোগ্রাফি ফোকাস" },
    description: { en: "Almost entirely type.", bn: "প্রায় পুরোটাই টাইপ।" },
    group: "editorial",
    defaultPalette: "midnight",
    supportsImage: false,
    prefersNoImage: true,
    capacity: "short",
    arabicHero: true,
    Component: Template05,
  },
  {
    id: "quote-card",
    name: { en: "Quote Card", bn: "কোট কার্ড" },
    description: { en: "Translation-first, quote mark.", bn: "কোট মার্ক সহ অনুবাদ-প্রধান।" },
    group: "editorial",
    defaultPalette: "ivory",
    supportsImage: false,
    capacity: "long",
    arabicHero: false,
    Component: Template10,
  },
  {
    id: "editorial-number",
    name: { en: "Editorial Number", bn: "এডিটোরিয়াল নম্বর" },
    description: { en: "Oversized verse / hadith number.", bn: "বড় আয়াত / হাদিস নম্বর।" },
    group: "editorial",
    defaultPalette: "ivory",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template11,
  },
  {
    id: "poster",
    name: { en: "Poster", bn: "পোস্টার" },
    description: { en: "Bold uppercase statement.", bn: "বোল্ড বড় হাতের বিবৃতি।" },
    group: "editorial",
    defaultPalette: "ink",
    supportsImage: false,
    capacity: "medium",
    arabicHero: false,
    Component: Template16,
  },
  {
    id: "hikmah",
    name: { en: "Hikmah — Grid", bn: "হিকমাহ — গ্রিড" },
    description: { en: "Editorial grid, index rule.", bn: "এডিটোরিয়াল গ্রিড, ইনডেক্স রুল।" },
    group: "editorial",
    defaultPalette: "slate",
    supportsImage: false,
    capacity: "long",
    arabicHero: true,
    Component: Template28,
  },

  {
    id: "image-overlay",
    name: { en: "Image Overlay", bn: "ইমেজ ওভারলে" },
    description: { en: "Full-bleed photo with text.", bn: "পূর্ণ ছবির উপর টেক্সট।" },
    group: "image",
    defaultPalette: "ink",
    supportsImage: true,
    capacity: "short",
    arabicHero: true,
    Component: Template04,
  },
  {
    id: "split-layout",
    name: { en: "Split Layout", bn: "স্প্লিট লেআউট" },
    description: { en: "Image one side, text the other.", bn: "একপাশে ছবি, অন্যপাশে টেক্সট।" },
    group: "image",
    defaultPalette: "ivory",
    supportsImage: true,
    capacity: "medium",
    arabicHero: true,
    Component: Template06,
  },
  {
    id: "bloom",
    name: { en: "Bloom", bn: "ব্লুম" },
    description: {
      en: "Centered translation with a highlighted ending.",
      bn: "কেন্দ্রীভূত অনুবাদ, শেষাংশ হাইলাইট।",
    },
    group: "image",
    defaultPalette: "rose",
    supportsImage: true,
    capacity: "medium",
    arabicHero: false,
    Component: Template30,
  },

  {
    id: "modern-islamic",
    name: { en: "Modern Islamic", bn: "মডার্ন ইসলামিক" },
    description: { en: "Subtle geometric pattern.", bn: "সূক্ষ্ম জ্যামিতিক প্যাটার্ন।" },
    group: "themed",
    defaultPalette: "sage",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template07,
  },
  {
    id: "soft-green",
    name: { en: "Soft Tone", bn: "সফট টোন" },
    description: { en: "Gentle, centered calm.", bn: "কোমল, কেন্দ্রীভূত।" },
    group: "themed",
    defaultPalette: "sage",
    supportsImage: false,
    capacity: "long",
    arabicHero: true,
    Component: Template09,
  },
  {
    id: "aurora",
    name: { en: "Aurora", bn: "অরোরা" },
    description: { en: "Soft colour fields, rich.", bn: "নরম রঙের ক্ষেত্র, সমৃদ্ধ।" },
    group: "themed",
    defaultPalette: "rose",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template20,
  },
  {
    id: "emblem",
    name: { en: "Emblem", bn: "এমব্লেম" },
    description: { en: "Geometric emblem, centred.", bn: "জ্যামিতিক এমব্লেম, কেন্দ্রীভূত।" },
    group: "themed",
    defaultPalette: "ivory",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template19,
  },
  {
    id: "fajr",
    name: { en: "Fajr — Dawn", bn: "ফজর — ভোর" },
    description: { en: "Dawn bands and horizon.", bn: "ভোরের আলো ও দিগন্ত।" },
    group: "themed",
    defaultPalette: "sand",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template21,
  },
  {
    id: "layl",
    name: { en: "Layl — Night", bn: "লাইল — রাত" },
    description: { en: "Night sky with soft glow.", bn: "রাতের আকাশ ও আলো।" },
    group: "themed",
    defaultPalette: "midnight",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template22,
  },
  {
    id: "nur",
    name: { en: "Nur — Light", bn: "নূর — আলো" },
    description: { en: "Radial light, concentric rings.", bn: "ছড়ানো আলো, বৃত্ত।" },
    group: "themed",
    defaultPalette: "ink",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template23,
  },
  {
    id: "jannah",
    name: { en: "Jannah — Garden", bn: "জান্নাত — বাগান" },
    description: { en: "Ornamental arch, garden tones.", bn: "অলংকৃত খিলান, বাগানের রঙ।" },
    group: "themed",
    defaultPalette: "forest",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template24,
  },
  {
    id: "salah",
    name: { en: "Mihrab — Salah", bn: "মিহরাব — নামাজ" },
    description: { en: "Mihrab arch with hanging lamp.", bn: "মিহরাব খিলান ও প্রদীপ।" },
    group: "themed",
    defaultPalette: "navy",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template25,
  },
  {
    id: "dua",
    name: { en: "Du'a — Rays", bn: "দুআ — রশ্মি" },
    description: { en: "Rising rays of supplication.", bn: "ঊর্ধ্বমুখী দুআর রশ্মি।" },
    group: "themed",
    defaultPalette: "plum",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template26,
  },
  {
    id: "kawthar",
    name: { en: "Kawthar — Waves", bn: "কাউসার — ঢেউ" },
    description: { en: "Flowing water lines.", bn: "প্রবাহিত জলরেখা।" },
    group: "themed",
    defaultPalette: "navy",
    supportsImage: false,
    capacity: "medium",
    arabicHero: true,
    Component: Template27,
  },
];

export function getTemplate(id?: string | null): TemplateEntry {
  return TEMPLATES.find((tpl) => tpl.id === id) ?? TEMPLATES[0];
}
