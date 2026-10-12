export type BackgroundStyle = "solid" | "gradient" | "pattern" | "grain";

export interface CardPalette {
  id: string;
  name: { en: string; bn: string };
  /** Base surface. */
  bg: string;
  /** Secondary surface used by gradients and shapes. */
  bg2: string;
  /** Primary type (Arabic / headline). */
  text: string;
  /** Translation body copy. */
  body: string;
  /** Metadata / captions. */
  muted: string;
  /** Rules, ornaments, small accents. */
  accent: string;
  /** Hairlines and dividers. */
  line: string;
  isDark: boolean;
  swatch: string;
}

export const PALETTES: CardPalette[] = [
  {
    id: "ivory",
    name: { en: "Ivory", bn: "আইভরি" },
    bg: "#FBF9F5",
    bg2: "#F1EADF",
    text: "#191920",
    body: "#33333C",
    muted: "#9A958C",
    accent: "#B78F5C",
    line: "rgba(25,25,32,0.12)",
    isDark: false,
    swatch: "#FBF9F5",
  },
  {
    id: "ink",
    name: { en: "Ink", bn: "ইঙ্ক" },
    bg: "#121216",
    bg2: "#1E1E24",
    text: "#F5F4F1",
    body: "#E6E4DE",
    muted: "#8A8791",
    accent: "#C9A46A",
    line: "rgba(255,255,255,0.16)",
    isDark: true,
    swatch: "#121216",
  },
  {
    id: "charcoal",
    name: { en: "Charcoal", bn: "চারকোল" },
    bg: "#23262B",
    bg2: "#2E323A",
    text: "#F2F3F5",
    body: "#E0E4EA",
    muted: "#8F959E",
    accent: "#9DB2C6",
    line: "rgba(255,255,255,0.15)",
    isDark: true,
    swatch: "#23262B",
  },
  {
    id: "sage",
    name: { en: "Sage", bn: "সেজ" },
    bg: "#F2F5F0",
    bg2: "#E3EBDF",
    text: "#1E2A21",
    body: "#2F3D33",
    muted: "#8B978D",
    accent: "#5C845C",
    line: "rgba(30,42,33,0.14)",
    isDark: false,
    swatch: "#F2F5F0",
  },
  {
    id: "sand",
    name: { en: "Sand", bn: "স্যান্ড" },
    bg: "#F4EFE7",
    bg2: "#EBE1CF",
    text: "#2A2118",
    body: "#3C3227",
    muted: "#9A8B76",
    accent: "#A87A4C",
    line: "rgba(42,33,24,0.14)",
    isDark: false,
    swatch: "#F4EFE7",
  },
  {
    id: "navy",
    name: { en: "Navy", bn: "নেভি" },
    bg: "#101A2B",
    bg2: "#17233A",
    text: "#EDF1F7",
    body: "#DBE3EF",
    muted: "#7C8AA0",
    accent: "#C8A96A",
    line: "rgba(255,255,255,0.15)",
    isDark: true,
    swatch: "#101A2B",
  },
  {
    id: "forest",
    name: { en: "Forest", bn: "ফরেস্ট" },
    bg: "#14201B",
    bg2: "#1B2B24",
    text: "#ECF2EE",
    body: "#D8E4DC",
    muted: "#7E9187",
    accent: "#C2A25F",
    line: "rgba(255,255,255,0.14)",
    isDark: true,
    swatch: "#14201B",
  },
  {
    id: "plum",
    name: { en: "Plum", bn: "প্লাম" },
    bg: "#221A26",
    bg2: "#2C2231",
    text: "#F3EDF4",
    body: "#E5DCEC",
    muted: "#9288A0",
    accent: "#C79AB6",
    line: "rgba(255,255,255,0.14)",
    isDark: true,
    swatch: "#221A26",
  },
  {
    id: "slate",
    name: { en: "Slate", bn: "স্লেট" },
    bg: "#ECEFF2",
    bg2: "#DEE4E9",
    text: "#1C2228",
    body: "#2C343C",
    muted: "#8A949E",
    accent: "#6B7C8C",
    line: "rgba(28,34,40,0.14)",
    isDark: false,
    swatch: "#ECEFF2",
  },
  {
    id: "rose",
    name: { en: "Rose", bn: "রোজ" },
    bg: "#F7F0EE",
    bg2: "#EFE0DC",
    text: "#2A1E1E",
    body: "#3E2E2D",
    muted: "#A08C89",
    accent: "#B57B6E",
    line: "rgba(42,30,30,0.14)",
    isDark: false,
    swatch: "#F7F0EE",
  },
  {
    id: "midnight",
    name: { en: "Midnight", bn: "মিডনাইট" },
    bg: "#0B0F14",
    bg2: "#131A22",
    text: "#EAF0F6",
    body: "#CDD8E4",
    muted: "#71808F",
    accent: "#D4B072",
    line: "rgba(255,255,255,0.14)",
    isDark: true,
    swatch: "#0B0F14",
  },
  {
    id: "terracotta",
    name: { en: "Terracotta", bn: "টেরাকোটা" },
    bg: "#F6EEE7",
    bg2: "#EBD9CB",
    text: "#2B211A",
    body: "#3E3128",
    muted: "#A08B78",
    accent: "#C06B45",
    line: "rgba(43,33,26,0.14)",
    isDark: false,
    swatch: "#F6EEE7",
  },
];

export const DEFAULT_PALETTE_ID = "ivory";

export function getPaletteById(id?: string | null): CardPalette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}

export const BACKGROUND_STYLES: Array<{
  id: BackgroundStyle;
  name: { en: string; bn: string };
}> = [
  { id: "solid", name: { en: "Solid", bn: "সলিড" } },
  { id: "gradient", name: { en: "Gradient", bn: "গ্রেডিয়েন্ট" } },
  { id: "pattern", name: { en: "Pattern", bn: "প্যাটার্ন" } },
  { id: "grain", name: { en: "Grain", bn: "গ্রেইন" } },
];

/* --------------------------- custom background --------------------------- */

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function mix(hex: string, target: [number, number, number], amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const out = rgb.map((v, i) => Math.round(v + (target[i] - v) * amount));
  return `rgb(${out[0]}, ${out[1]}, ${out[2]})`;
}

/**
 * Builds a palette-like theme from any background hex, choosing readable
 * foreground colours automatically. Keeps the "custom background" option safe.
 */
export function paletteFromBackground(hex: string): CardPalette {
  const rgb = hexToRgb(hex) ?? [251, 249, 245];
  const lum = luminance(rgb);
  const dark = lum < 0.45;
  const fg = dark ? "#F6F5F2" : "#17171C";
  return {
    id: "custom",
    name: { en: "Custom", bn: "কাস্টম" },
    bg: hex,
    bg2: mix(hex, dark ? [255, 255, 255] : [17, 17, 20], 0.08),
    text: fg,
    body: mix(fg, rgb, 0.22),
    muted: mix(fg, rgb, 0.62),
    accent: dark ? "#D8B980" : "#A87A4C",
    line: dark ? "rgba(255,255,255,0.16)" : "rgba(17,17,20,0.14)",
    isDark: dark,
    swatch: hex,
  };
}

export function resolvePalette(paletteId?: string | null, customBg?: string): CardPalette {
  if (paletteId === "custom" && customBg) return paletteFromBackground(customBg);
  return getPaletteById(paletteId);
}
