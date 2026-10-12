"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn, localizeNumber } from "@/lib/utils";
import type { CardMetadataOptions, ContainedImageState } from "@/types";
import {
  resolvePalette,
  type BackgroundStyle,
  type CardPalette,
} from "@/lib/palettes";
import { surahNameBn } from "@/data/surahNamesBn";
import { collectionNameBn } from "@/data/collectionNamesBn";
import { alsoInNames } from "@/lib/hadithText";
import { gradeNameBn } from "@/data/gradesBn";
import type { TemplateRenderProps } from "./types";
import { getTranslation, getArabic } from "./types";

/* --------------------------------- FitText -------------------------------- */

/** User-adjustable text scales for the card, provided by `<Shell>`. */
interface TextScales {
  text: number;
  arabic: number;
  translation: number;
}
const TextScaleContext = createContext<TextScales>({ text: 1, arabic: 1, translation: 1 });
/** Optional transliteration rendered directly under the Arabic. */
const TransliterationContext = createContext<string | undefined>(undefined);
/** Optional eyebrow label rendered directly above the Arabic. */
interface CategoryLabel {
  text: string;
  size: number;
  color?: string;
}
const CategoryContext = createContext<CategoryLabel | undefined>(undefined);

export function FitText({
  text,
  min = 20,
  max = 72,
  lineHeight = 1.6,
  className,
  innerClassName,
  rtl,
  reportKey,
  reportOverflow,
  letterSpacing,
  align,
  highlightTail,
  tailColor,
  tailWords = 3,
}: {
  text?: string;
  min?: number;
  max?: number;
  lineHeight?: number;
  className?: string;
  innerClassName?: string;
  rtl?: boolean;
  reportKey?: string;
  reportOverflow?: (key: string, overflow: boolean) => void;
  letterSpacing?: string;
  align?: "left" | "center" | "right" | "justify";
  /** Colour the final few words (used by translation-led templates). */
  highlightTail?: boolean;
  tailColor?: string;
  tailWords?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(max);
  const [fontsReady, setFontsReady] = useState(false);
  const reportRef = useRef(reportOverflow);
  reportRef.current = reportOverflow;
  const scales = useContext(TextScaleContext);
  const key = (reportKey ?? "").toLowerCase();
  const cls = innerClassName ?? "";
  const looksArabic = cls.includes("font-arabic");
  const looksTranslation = cls.includes("font-serif") || cls.includes("font-bangla");
  const role: "arabic" | "translation" | "none" =
    key.includes("arabic") || (looksArabic && !looksTranslation)
      ? "arabic"
      : key.includes("translation") ||
          key.includes("secondary") ||
          (looksTranslation && !looksArabic)
        ? "translation"
        : "none";
  const roleScale =
    role === "arabic"
      ? scales.arabic / Math.max(1, scales.translation)
      : role === "translation"
        ? scales.translation / Math.max(1, scales.arabic)
        : 1;
  const scale =
    (scales.text || 1) * (roleScale || 1) * (cls.includes("font-bangla") ? 1.15 : 1);
  const translit = useContext(TransliterationContext);
  const showTranslit = Boolean(translit) && (rtl || role === "arabic");
  const categoryLabel = useContext(CategoryContext);
  const showCategory = Boolean(categoryLabel) && (rtl || role === "arabic");
  const categoryIsBangla = categoryLabel
    ? /[\u0980-\u09FF]/.test(categoryLabel.text)
    : false;
  // Optional: colour the final few words (translation-led hero templates).
  const tailSplit = ((): { head: string; tail: string } | null => {
    if (!highlightTail || !text) return null;
    const words = text.trim().split(/\s+/);
    const n = Math.max(1, Math.min(tailWords, words.length));
    return {
      head: words.slice(0, words.length - n).join(" "),
      tail: words.slice(words.length - n).join(" "),
    };
  })();

  useEffect(() => {
    let mounted = true;
    const fonts = (typeof document !== "undefined" && document.fonts) || undefined;
    if (fonts?.ready) {
      fonts.ready.then(() => mounted && setFontsReady(true));
    } else {
      setFontsReady(true);
    }
    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i || !text) return;

    // With a category eyebrow the block carries a little extra fixed height, so
    // let the text shrink further than usual to guarantee it always fits.
    const floor = min * scale * (showCategory ? 0.68 : 1);
    let lo = floor;
    let hi = max * scale;
    let best = floor;
    let fits = false;

    for (let k = 0; k < 16; k++) {
      const mid = (lo + hi) / 2;
      i.style.fontSize = `${mid}px`;
      i.style.lineHeight = String(lineHeight);
      if (o.scrollHeight <= o.clientHeight + 1) {
        best = mid;
        fits = true;
        lo = mid;
      } else {
        hi = mid;
      }
    }

    const finalSize = fits ? best : floor;
    i.style.fontSize = `${finalSize}px`;
    i.style.lineHeight = String(lineHeight);
    setFontSize(finalSize);
    // Flag overflow if it didn't fit, or if the eyebrow forced it below the
    // template's intended minimum (so the "use a longer template" hint still works).
    if (reportKey) reportRef.current?.(reportKey, !fits || finalSize < min * scale - 0.5);
  }, [text, min, max, lineHeight, fontsReady, reportKey, scale, showCategory]);

  if (!text) return null;

  return (
    <div
      ref={outer}
      className={cn("flex min-h-0 items-center overflow-hidden", className)}
      style={{ flexGrow: Math.max(0, scale - 1), flexShrink: 1, flexBasis: "auto" }}
    >
      <div
        ref={inner}
        dir={rtl ? "rtl" : undefined}
        className={cn("w-full", rtl && "arabic", innerClassName)}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight,
          letterSpacing,
          textAlign: align,
        }}
      >
        {showCategory && categoryLabel && (
          <span
            dir="auto"
            className={cn(
              "block font-semibold",
              categoryIsBangla ? "font-bangla" : "font-serif",
            )}
            style={{
              fontSize: `${categoryLabel.size}px`,
              lineHeight: 1.15,
              color: categoryLabel.color,
              letterSpacing: categoryIsBangla ? "0.01em" : "0.02em",
              textTransform: "none",
              marginBottom: categoryLabel.size * 0.38,
            }}
          >
            {categoryLabel.text}
          </span>
        )}
        {tailSplit ? (
          <>
            {tailSplit.head && `${tailSplit.head} `}
            <span style={{ color: tailColor }}>{tailSplit.tail}</span>
          </>
        ) : (
          text
        )}
        {showTranslit && (
          <span
            dir="ltr"
            className="mt-[0.35em] block font-serif text-[0.5em] font-normal not-italic leading-snug"
            style={{ textAlign: align === "center" ? "center" : "left" }}
          >
            {translit}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Image layer ------------------------------- */

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

/**
 * Renders an image that always covers the given box, with correct
 * centre-scaling and 1:1 panning at any zoom level, plus an opacity control.
 * Measured against the natural image size so panning can reveal any part of
 * the photo (not just what object-fit happens to show).
 */
export function ImageLayer({
  image,
  width,
  height,
  className,
  scrim = "flat",
}: {
  image?: ContainedImageState;
  width: number;
  height: number;
  className?: string;
  scrim?: "flat" | "bottom" | "editorial" | "none";
}) {
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  if (!image?.src) return null;

  const z = clamp(image.zoom || 1, 1, 5);
  const opacity = image.opacity ?? 1;

  const cover = nat ? Math.max(width / nat.w, height / nat.h) : 1;
  const dispW = nat ? nat.w * cover : width;
  const dispH = nat ? nat.h * cover : height;
  const maxX = Math.max(0, (dispW * z - width) / 2);
  const maxY = Math.max(0, (dispH * z - height) / 2);
  const ox = clamp(image.offsetX || 0, -maxX, maxX);
  const oy = clamp(image.offsetY || 0, -maxY, maxY);

  const overlay = clamp(image.overlay ?? 0, 0, 1);
  const scrimBg =
    scrim === "none"
      ? "transparent"
      : scrim === "bottom"
        ? `linear-gradient(to top, rgba(0,0,0,${Math.min(overlay + 0.15, 1)}) 0%, rgba(0,0,0,${overlay * 0.4}) 55%, rgba(0,0,0,${overlay * 0.15}) 100%)`
        : scrim === "editorial"
          ? `linear-gradient(120deg, rgba(0,0,0,${Math.min(overlay + 0.1, 1)}) 0%, rgba(0,0,0,${overlay * 0.35}) 70%)`
          : `rgba(0,0,0,${overlay})`;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt=""
        onLoad={(e) => {
          const el = e.currentTarget;
          setNat({ w: el.naturalWidth || width, h: el.naturalHeight || height });
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: dispW,
          height: dispH,
          maxWidth: "none",
          marginLeft: -dispW / 2,
          marginTop: -dispH / 2,
          transform: `translate(${ox}px, ${oy}px) scale(${z})`,
          transformOrigin: "center center",
          opacity,
        }}
      />
      {scrim !== "none" && overlay > 0 && (
        <div className="absolute inset-0" style={{ background: scrimBg }} />
      )}
    </div>
  );
}

/* ------------------------------- Metadata -------------------------------- */

export function MetaLines({
  props,
  className,
  separator = " · ",
  itemClassName,
  size = 30,
}: {
  props: TemplateRenderProps;
  className?: string;
  separator?: string;
  itemClassName?: string;
  /** Font size (px) for the metadata/reference line inside the card. */
  size?: number;
}) {
  const lines = metadataLines(props.content, props.options.metadata, props.language);
  if (props.options.showBrand && props.options.brandText?.trim()) {
    lines.push(props.options.brandText.trim());
  }
  if (lines.length === 0) return null;
  return (
    <div
      className={cn("flex flex-wrap items-center", className)}
      style={{ fontSize: size, color: "var(--c-body)", fontWeight: 500 }}
    >
      {lines.map((line, i) => (
        <span key={line + i} className={cn("inline-flex items-center", itemClassName)}>
          {i > 0 && <span className="mx-3 opacity-50">{separator}</span>}
          {line}
        </span>
      ))}
    </div>
  );
}

export function metadataLines(
  content: TemplateRenderProps["content"],
  options: CardMetadataOptions,
  language: "en" | "bn",
): string[] {
  const lines: string[] = [];
  if (content.type === "quran") {
    if (options.showReference) {
      // Prefer the localized name; never fall back to the Arabic name (it would
      // look "broken" inside a Latin/Bangla reference line).
      const localized =
        content.surahNameEnglish ||
        (!/[\u0600-\u06FF]/.test(content.surahName || "")
          ? content.surahName || ""
          : "");
      const name =
        language === "bn" && content.surahNumber
          ? surahNameBn(content.surahNumber) ?? localized
          : localized;
      const num =
        content.surahNumber && content.verseNumber
          ? language === "bn"
            ? localizeNumber(`${content.surahNumber}:${content.verseNumber}`, "bn")
            : `${content.surahNumber}:${content.verseNumber}`
          : "";
      const ref = [name, num].filter(Boolean).join(" ");
      if (ref) lines.push(ref);
    }
    if (options.showBook || options.showChapter) {
      const rev = content.revelationType
        ? language === "bn"
          ? content.revelationType === "Meccan"
            ? "মাক্কী"
            : content.revelationType === "Medinan"
              ? "মাদানী"
              : content.revelationType
          : content.revelationType
        : "";
      const juz = content.juz
        ? `${language === "bn" ? "জুজ" : "Juz"} ${
            language === "bn" ? localizeNumber(content.juz, "bn") : content.juz
          }`
        : "";
      const extra = [rev, juz].filter(Boolean).join(" · ");
      if (extra) lines.push(extra);
    }
  } else {
    if (options.showReference && content.hadithNumber) {
      lines.push(
        `${language === "bn" ? "হাদিস" : "Hadith"} ${
          language === "bn"
            ? localizeNumber(content.hadithNumber, "bn")
            : content.hadithNumber
        }`,
      );
    }
    if (options.showBook) {
      const col =
        language === "bn"
          ? collectionNameBn(content.collectionId) ??
            content.collectionBn ??
            content.collection
          : content.collection;
      // The narration is often reported in more than one collection; the source
      // citation names them, so list them together in the reference line.
      const extra = alsoInNames(content.alsoIn, language).filter(
        (n) => n && n !== col,
      );
      const label = [col, ...extra].filter(Boolean).join(" · ");
      if (label) lines.push(label);
    }
    if (options.showChapter && content.chapter) {
      lines.push(content.chapter);
    }
    if (options.showSource && content.grade) {
      lines.push(
        language === "bn"
          ? gradeNameBn(content.grade) ?? content.grade
          : content.grade,
      );
    }
  }
  return Array.from(new Set(lines.filter(Boolean)));
}

/* --------------------------- Decorative patterns --------------------------- */

export function GeometricPattern({
  className,
  color = "currentColor",
  opacity = 0.06,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const rawId = useId();
  const patternId = `geo-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ color, opacity }}
    >
      <defs>
        <pattern id={patternId} width="90" height="90" patternUnits="userSpaceOnUse">
          <path
            d="M45 0 L90 45 L45 90 L0 45 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="45" cy="45" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function ArabicOrnament({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 8"
      className={className}
      fill="none"
      style={{ color }}
    >
      <line x1="0" y1="4" x2="44" y2="4" stroke="currentColor" strokeWidth="1" />
      <rect x="56" y="1" width="8" height="8" transform="rotate(45 60 5)" stroke="currentColor" strokeWidth="1" />
      <line x1="76" y1="4" x2="120" y2="4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------ helper exports ----------------------------- */

export function BackgroundLayer({
  palette,
  background,
  customBg,
}: {
  palette: CardPalette;
  background: BackgroundStyle;
  customBg?: string;
}) {
  const bg = customBg || palette.bg;
  if (background === "gradient") {
    return (
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(140deg, ${bg} 0%, ${palette.bg2} 100%)` }}
      />
    );
  }
  if (background === "pattern") {
    return (
      <div className="absolute inset-0" style={{ backgroundColor: bg }}>
        <GeometricPattern color={palette.accent} opacity={palette.isDark ? 0.1 : 0.08} />
      </div>
    );
  }
  if (background === "grain") {
    return (
      <div className="absolute inset-0" style={{ backgroundColor: bg }}>
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full" style={{ opacity: palette.isDark ? 0.06 : 0.05 }}>
          <defs>
            <pattern id="grain-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={palette.text} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grain-dots)" />
        </svg>
      </div>
    );
  }
  return null;
}

export function Shell({
  width,
  height,
  palette,
  background = "solid",
  customBg,
  options,
  image,
  className,
  style,
  children,
}: {
  width: number;
  height: number;
  palette: CardPalette;
  background?: BackgroundStyle;
  customBg?: string;
  options?: {
    imageMode?: "photo" | "background";
    decor?: boolean;
    textScale?: number;
    arabicScale?: number;
    translationScale?: number;
    showLogo?: boolean;
    /** Optional transliteration line rendered under the Arabic. */
    transliteration?: string;
    /** Optional eyebrow label shown at the top of the card. */
    category?: string;
  };
  image?: ContainedImageState;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const bg = customBg || palette.bg;
  const vars = {
    "--c-bg": bg,
    "--c-bg2": palette.bg2,
    "--c-text": palette.text,
    "--c-body": palette.body,
    "--c-muted": palette.muted,
    "--c-accent": palette.accent,
    "--c-line": palette.line,
    "--c-swatch": palette.swatch,
  } as React.CSSProperties;

  const bgImage =
    options?.imageMode === "background" && image?.src ? image : undefined;
  const decor = options?.decor !== false;
  const showLogo = options?.showLogo !== false;
  // Kept small and inside the corner gutter (all templates keep >= 84px padding)
  // so the logo can never sit on top of the card text.
  const logoSize = Math.round(Math.min(width, height) * 0.048);
  const logoInset = Math.round(Math.min(width, height) * 0.028);
  const clampScale = (v: number | undefined) => Math.min(Math.max(v ?? 1, 0.5), 2);
  const textScales: TextScales = {
    text: clampScale(options?.textScale),
    arabic: clampScale(options?.arabicScale),
    translation: clampScale(options?.translationScale),
  };

  // Optional eyebrow label rendered just above the Arabic (e.g. the du'a
  // category). Sized generously so the reason for the du'a is readable at a
  // glance; the Arabic auto-fit accounts for it automatically.
  const category = options?.category?.trim();
  const categorySize = Math.round(Math.min(width, height) * 0.031);
  const categoryLabel: CategoryLabel | undefined = category
    ? { text: category, size: categorySize, color: palette.accent }
    : undefined;

  return (
    <div
      className={cn("card-surface-render relative overflow-hidden", className)}
      style={{ width, height, backgroundColor: bg, ...vars, ...style }}
    >
      <BackgroundLayer palette={palette} background={background} customBg={customBg} />
      {bgImage && (
        <>
          <ImageLayer image={bgImage} width={width} height={height} scrim="none" />
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${bgImage.overlay ?? 0})` }}
          />
        </>
      )}

      {decor && (
        <CornerDecor width={width} height={height} hideTopLeft={showLogo} />
      )}

      {showLogo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand-logo.png"
          alt=""
          style={{
            position: "absolute",
            top: logoInset,
            left: logoInset,
            height: logoSize,
            width: "auto",
            opacity: 0.95,
            filter: palette.isDark
              ? "brightness(1.55) saturate(1.05) drop-shadow(0 0 8px rgba(255,255,255,0.22))"
              : undefined,
          }}
        />
      )}

      <TextScaleContext.Provider value={textScales}>
        <TransliterationContext.Provider value={options?.transliteration}>
          <CategoryContext.Provider value={categoryLabel}>
            {children}
          </CategoryContext.Provider>
        </TransliterationContext.Provider>
      </TextScaleContext.Provider>
    </div>
  );
}

/** Subtle hairline corner ticks — a light finishing touch. */
function CornerDecor({
  width,
  height,
  hideTopLeft,
}: {
  width: number;
  height: number;
  hideTopLeft?: boolean;
}) {
  const inset = Math.round(Math.min(width, height) * 0.045);
  const len = Math.round(Math.min(width, height) * 0.03);
  const corners = [
    { top: inset, left: inset, rotate: 0 },
    { top: inset, right: inset, rotate: 90 },
    { bottom: inset, right: inset, rotate: 180 },
    { bottom: inset, left: inset, rotate: 270 },
  ].filter((_, i) => !(hideTopLeft && i === 0));
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {corners.map((c, i) => {
        const { rotate, ...pos } = c;
        return (
          <span
            key={i}
            className="absolute"
            style={{
              ...pos,
              width: len,
              height: len,
              borderTop: "1.5px solid var(--c-accent)",
              borderLeft: "1.5px solid var(--c-accent)",
              opacity: 0.5,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Resolves palette + background from a template's render props. */
export function themeOf(options: {
  paletteId?: string;
  customBg?: string;
  background?: BackgroundStyle;
}): { palette: CardPalette; background: BackgroundStyle; customBg?: string } {
  return {
    palette: resolvePalette(options.paletteId, options.customBg),
    background: options.background ?? "solid",
    customBg: options.paletteId === "custom" ? options.customBg : undefined,
  };
}

export function translationFontClass(lang: "en" | "bn" | "translit" | "none"): string {
  return lang === "bn" ? "font-bangla" : "font-serif";
}

export function typeLabel(
  type: "quran" | "hadith",
  language: "en" | "bn",
): string {
  if (type === "quran") return language === "bn" ? "কুরআন" : "QURAN";
  return language === "bn" ? "হাদিস" : "HADITH";
}

export function resolveContent(props: TemplateRenderProps): {
  arabic?: string;
  translation?: string;
  lang: "en" | "bn" | "translit" | "none";
} {
  const arabic = props.options.metadata.showArabic
    ? getArabic(props.content)
    : undefined;
  if (!props.options.metadata.showTranslation) {
    return { arabic, translation: undefined, lang: props.options.translationLanguage };
  }
  const { text, lang } = getTranslation(props.content, props.options);
  return { arabic, translation: text, lang };
}

export { getArabic, getTranslation };
export type { TemplateRenderProps };
