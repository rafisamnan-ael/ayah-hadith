"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toBlob, toJpeg, toPng } from "html-to-image";
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  Eye,
  Image as ImageIcon,
  ImageOff,
  Loader2,
  Minus,
  Palette as PaletteIcon,
  Plus,
  Share2,
  Sparkles,
  Trash2,
  Type,
  Upload,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/hooks/useT";
import { useHasMounted } from "@/hooks/useHasMounted";
import { CARD_FORMATS, CARD_FORMAT_LIST } from "@/lib/formats";
import {
  BACKGROUND_STYLES,
  PALETTES,
  getPaletteById,
  type BackgroundStyle,
} from "@/lib/palettes";
import { TEMPLATES, TEMPLATE_GROUPS, getTemplate } from "@/components/templates/registry";
import { AI_NEGATIVE, AI_STYLE, screenPrompt } from "@/lib/ai-safety";
import { PreviewStage } from "./PreviewStage";
import { TemplateThumb } from "./TemplateThumb";
import { CardPreviewModal } from "./CardPreviewModal";
import { Segmented, Toggle } from "@/components/ui/Controls";
import { Button } from "@/components/ui/Button";
import { fileToDataUrl, cropBottom } from "@/lib/image";
import { deriveGist } from "@/lib/ai-gist";
import { shortLabel } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/StateViews";
import type {
  CardFormat,
  CardMetadataOptions,
  CardRenderOptions,
  ContainedImageState,
} from "@/types";

export function PhotocardEditor({
  initialTemplateId,
}: {
  initialTemplateId?: string;
}) {
  const { t, language } = useT();
  const mounted = useHasMounted();
  const content = useAppStore((s) => s.workspace.content);
  const workspaceTemplate = useAppStore((s) => s.workspace.templateId);
  const recentTemplates = useAppStore((s) => s.recentTemplates);
  const lastPalette = useAppStore((s) => s.lastPalette);
  const lastBackground = useAppStore((s) => s.lastBackground);
  const storedCustomBg = useAppStore((s) => s.customBg);
  const setLastFormat = useAppStore((s) => s.setLastFormat);
  const setLastPalette = useAppStore((s) => s.setLastPalette);
  const setLastBackground = useAppStore((s) => s.setLastBackground);
  const setCustomBg = useAppStore((s) => s.setCustomBg);
  const decor = useAppStore((s) => s.decor);
  const setDecor = useAppStore((s) => s.setDecor);
  const showLogo = useAppStore((s) => s.showLogo);
  const setShowLogo = useAppStore((s) => s.setShowLogo);
  const showBrand = useAppStore((s) => s.showBrand);
  const setShowBrand = useAppStore((s) => s.setShowBrand);
  const showTransliteration = useAppStore((s) => s.showTransliteration);
  const setShowTransliteration = useAppStore((s) => s.setShowTransliteration);
  const showFullText = useAppStore((s) => s.showFullText);
  const setShowFullText = useAppStore((s) => s.setShowFullText);
  const showCategory = useAppStore((s) => s.showCategory);
  const setShowCategory = useAppStore((s) => s.setShowCategory);
  const brandText = useAppStore((s) => s.brandText);
  const setBrandText = useAppStore((s) => s.setBrandText);
  const storedTextScale = useAppStore((s) => s.lastTextScale);
  const setLastTextScale = useAppStore((s) => s.setLastTextScale);
  const storedArabicScale = useAppStore((s) => s.lastArabicScale);
  const storedTranslationScale = useAppStore((s) => s.lastTranslationScale);
  const setLastArabicScale = useAppStore((s) => s.setLastArabicScale);
  const setLastTranslationScale = useAppStore((s) => s.setLastTranslationScale);
  const setWorkspaceTemplate = useAppStore((s) => s.setWorkspaceTemplate);
  const pushRecentTemplate = useAppStore((s) => s.pushRecentTemplate);

  const [templateId, setTemplateId] = useState(
    () => initialTemplateId || workspaceTemplate || recentTemplates[0] || TEMPLATES[0].id,
  );
  // Portrait (4:5) is the sensible default — matching how most photocards are
  // shared in messaging apps.
  const [format, setFormat] = useState<CardFormat>("portrait");
  const [paletteId, setPaletteId] = useState(lastPalette);
  const [background, setBackground] = useState<BackgroundStyle>(lastBackground);
  const [customBg, setCustomBgState] = useState(storedCustomBg);
  // Default the translation to the app language; the effect below confirms it
  // against the content that is actually available.
  const [translationLanguage, setTranslationLanguage] = useState<"en" | "bn">(
    language === "bn" ? "bn" : "en",
  );
  const translationTouchedRef = useRef(false);
  const [meta, setMeta] = useState<CardMetadataOptions>({
    showArabic: true,
    showTranslation: true,
    showReference: true,
    showBook: true,
    showChapter: false,
    showSource: false,
  });
  const [image, setImage] = useState<ContainedImageState | undefined>();
  const [imageMode, setImageMode] = useState<"photo" | "background">("photo");
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [aiBlocked, setAiBlocked] = useState(false);
  const [templateGroup, setTemplateGroup] = useState<
    "all" | "minimal" | "editorial" | "themed" | "image"
  >("all");
  const aiPromptTouchedRef = useRef(false);
  const [textScale, setTextScale] = useState(storedTextScale || 1);
  const [arabicScale, setArabicScale] = useState(storedArabicScale || 1);
  const [translationScale, setTranslationScale] = useState(storedTranslationScale || 1);
  const [exporting, setExporting] = useState<"png" | "jpg" | "copy" | "share" | null>(null);
  const [exportError, setExportError] = useState(false);
  const [notice, setNotice] = useState<"copied" | "failed" | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [mobileNavHeight, setMobileNavHeight] = useState(56);
  const [overflowKeys, setOverflowKeys] = useState<string[]>([]);
  const [fitHeight, setFitHeight] = useState<number | undefined>(undefined);
  const [inlineFit, setInlineFit] = useState<number | undefined>(undefined);
  const exportRef = useRef<HTMLDivElement>(null);
  const dragStampRef = useRef(0);
  const warmedRef = useRef(false);
  const blobCacheRef = useRef<Map<string, Blob>>(new Map());

  const template = getTemplate(templateId);
  const formatSpec = CARD_FORMATS[format];

  // "Whole narration" option: swap the short du'a for the full narration text.
  const displayContent = useMemo(() => {
    if (!content) return content;
    if (showFullText && content.arabicFull) {
      return {
        ...content,
        arabic: content.arabicFull,
        english: content.englishFull,
        bangla: content.banglaFull,
      };
    }
    return content;
  }, [content, showFullText]);

  const chooseTemplate = useCallback((id: string) => {
    setTemplateId(id);
  }, []);

  // English is the default content language; Bangla is offered when available.
  // Never select a translation that isn't present (e.g. a du'a without Bangla),
  // so the card can't silently fall back to something else. Prefer the app
  // language, then fall back to whichever translation the content has.
  useEffect(() => {
    if (translationTouchedRef.current || !content) return;
    const hasEn = !!content.english?.trim();
    const hasBn = !!content.bangla?.trim();
    const preferred: "en" | "bn" = language === "bn" ? "bn" : "en";
    const hasPreferred = preferred === "bn" ? hasBn : hasEn;
    setTranslationLanguage(hasPreferred ? preferred : hasEn ? "en" : "bn");
  }, [content, language]);

  useEffect(() => {
    if (!initialTemplateId && workspaceTemplate && workspaceTemplate !== templateId) {
      setTemplateId(workspaceTemplate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWorkspaceTemplate(templateId);
    pushRecentTemplate(templateId);
  }, [templateId, setWorkspaceTemplate, pushRecentTemplate]);

  useEffect(() => setLastFormat(format), [format, setLastFormat]);
  useEffect(() => setLastPalette(paletteId), [paletteId, setLastPalette]);
  useEffect(() => setLastBackground(background), [background, setLastBackground]);
  useEffect(() => setCustomBg(customBg), [customBg, setCustomBg]);
  useEffect(() => setLastTextScale(textScale), [textScale, setLastTextScale]);
  useEffect(() => setLastArabicScale(arabicScale), [arabicScale, setLastArabicScale]);
  useEffect(
    () => setLastTranslationScale(translationScale),
    [translationScale, setLastTranslationScale],
  );
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setFitHeight(Math.max(320, h - 200));
      // The pinned preview stays compact on phones so the controls remain usable.
      setInlineFit(w < 1024 ? Math.max(200, Math.round(h * 0.34)) : Math.max(320, h - 200));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  useEffect(() => {
    if (!template.supportsImage) setImageMode("background");
  }, [template.supportsImage]);

  // Default the AI prompt to a thematic gist derived from the card text, so
  // the user can just press Generate. Stops once they edit it themselves.
  useEffect(() => {
    if (!content || aiPromptTouchedRef.current) return;
    setAiPrompt(deriveGist(content, language));
  }, [content, language]);

  const options: CardRenderOptions = useMemo(
    () => ({
      translationLanguage,
      metadata: meta,
      format,
      paletteId,
      background,
      customBg,
      imageMode,
      decor,
      showLogo,
      showBrand,
      brandText,
      transliteration:
        showTransliteration && content?.transliteration
          ? content.transliteration
          : undefined,
      category: showCategory
        ? translationLanguage === "bn"
          ? content?.categoryBn
          : content?.categoryEn
        : undefined,
      textScale,
      arabicScale,
      translationScale,
    }),
    [translationLanguage, meta, format, paletteId, background, customBg, imageMode, decor, showLogo, showBrand, brandText, showTransliteration, showCategory, content, textScale, arabicScale, translationScale],
  );

  const renderId = `${templateId}|${format}|${paletteId}|${background}|${customBg}|${imageMode}|${decor}${showLogo}${showBrand}${brandText}|${showTransliteration}|${showFullText}|${showCategory}|${textScale}|${arabicScale}|${translationScale}|${content?.id ?? "none"}|${translationLanguage}|${meta.showArabic}${meta.showTranslation}${meta.showReference}${meta.showBook}${meta.showChapter}${meta.showSource}|${image?.src ? "img" : "noimg"}`;
  const renderIdRef = useRef(renderId);
  renderIdRef.current = renderId;

  const reportOverflow = useCallback((key: string, overflow: boolean) => {
    setOverflowKeys((prev) => {
      const prefix = `${renderIdRef.current}:`;
      const full = prefix + key;
      const current = prev.filter((k) => k.startsWith(prefix));
      const has = current.includes(full);
      let next = current;
      if (overflow && !has) next = [...current, full];
      else if (!overflow && has) next = current.filter((k) => k !== full);
      if (next.length === prev.length && next.every((v, i) => v === prev[i])) return prev;
      return next;
    });
  }, []);

  const hasOverflow = overflowKeys.length > 0;
  const longTemplates = TEMPLATES.filter((tpl) => tpl.capacity === "long");

  const showNotice = useCallback((value: "copied" | "failed") => {
    setNotice(value);
    setTimeout(() => setNotice(null), 2600);
  }, []);

  const applyImageSrc = useCallback(
    (src: string, mode: "photo" | "background") => {
      setImage({
        src,
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        overlay: mode === "background" ? 0.15 : 0.35,
        opacity: mode === "background" ? 0.5 : 1,
      });
      setImageMode(mode);
    },
    [],
  );

  const onFile = useCallback(
    async (file?: File) => {
      if (!file) return;
      try {
        const src = await fileToDataUrl(file);
        applyImageSrc(src, template.supportsImage ? imageMode : "background");
      } catch {
        setExportError(true);
      }
    },
    [applyImageSrc, imageMode, template.supportsImage],
  );

  const generateBackground = useCallback(async () => {
    const prompt = aiPrompt.trim();
    if (!prompt || generating) return;
    setAiError(false);
    setAiBlocked(false);

    // Refuse prompts that ask for people, faces, sacred figures or anything
    // explicit/violent. Thematic backgrounds only.
    if (!screenPrompt(prompt).ok) {
      setAiBlocked(true);
      return;
    }

    setGenerating(true);
    try {
      const seed = Math.floor(Math.random() * 1_000_000);
      const query = `width=${formatSpec.width}&height=${formatSpec.height}&seed=${seed}&nologo=true&referrer=ayah-hadith&negative=${encodeURIComponent(AI_NEGATIVE)}`;

      let blob: Blob | null = null;

      // Preferred: request straight from the browser (the provider blocks some
      // datacenter IPs, so this works better in production than a server proxy).
      const clientBase =
        process.env.NEXT_PUBLIC_AI_IMAGE_API_URL?.replace(/\/$/, "") ||
        "https://image.pollinations.ai/prompt";
      try {
        const direct = await fetch(
          `${clientBase}/${encodeURIComponent(`${prompt}, ${AI_STYLE}`)}?${query}`,
        );
        if (direct.ok) {
          const type = direct.headers.get("content-type") || "";
          if (type.startsWith("image/")) blob = await direct.blob();
        }
      } catch {
        /* fall back to the server route below */
      }

      // Fallback: server-side proxy (supports keyed providers via env).
      if (!blob) {
        const res = await fetch(
          `/api/ai-background?prompt=${encodeURIComponent(prompt)}&width=${formatSpec.width}&height=${formatSpec.height}&seed=${seed}`,
        );
        if (res.status === 422) {
          setAiBlocked(true);
          return;
        }
        if (!res.ok) throw new Error("failed");
        blob = await res.blob();
      }

      const dataUrl = await cropBottom(blob, 0.07);
      applyImageSrc(dataUrl, template.supportsImage ? imageMode : "background");
    } catch {
      setAiError(true);
    } finally {
      setGenerating(false);
    }
  }, [aiPrompt, applyImageSrc, formatSpec.height, formatSpec.width, generating, imageMode, template.supportsImage]);

  const onPan = useCallback((dxPx: number, dyPx: number) => {
    dragStampRef.current = Date.now();
    setImage((img) =>
      img
        ? {
            ...img,
            offsetX: img.offsetX + dxPx,
            offsetY: img.offsetY + dyPx,
          }
        : img,
    );
  }, []);

  const renderBlob = useCallback(
    async (type: "png" | "jpg"): Promise<Blob | null> => {
      const node = exportRef.current;
      if (!node) return null;
      const cacheKey = `${renderId}|${type}`;
      const cached = blobCacheRef.current.get(cacheKey);
      if (cached) return cached; // already rendered — acts instantly on tap

      // Wait for fonts, but never block forever: a stalled font fetch used to
      // leave the export buttons disabled on mobile.
      if (typeof document !== "undefined" && document.fonts?.ready) {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 2500)),
        ]);
      }
      const base: Parameters<typeof toPng>[1] = {
        width: formatSpec.width,
        height: formatSpec.height,
        pixelRatio: 1,
        cacheBust: true,
        style: { transform: "none" },
      };
      const jpg = { ...base, backgroundColor: "#ffffff", quality: 0.95 };

      const run = async () => {
        // A single warm-up per session primes html-to-image's font embedding;
        // later exports are then a single render.
        if (!warmedRef.current) {
          try {
            await (type === "png" ? toPng(node, base) : toJpeg(node, jpg));
          } catch {
            /* ignore warm-up failure */
          }
          warmedRef.current = true;
        }
        return type === "png" ? toBlob(node, base) : toBlob(node, jpg);
      };

      try {
        const blob = await withTimeout(run(), 25000);
        if (blob) {
          if (blobCacheRef.current.size > 6) blobCacheRef.current.clear();
          blobCacheRef.current.set(cacheKey, blob);
        }
        return blob;
      } catch {
        return null; // caller shows the error and re-enables the buttons
      }
    },
    [formatSpec.height, formatSpec.width, renderId],
  );

  const download = useCallback(
    async (type: "png" | "jpg") => {
      setExporting(type);
      setExportError(false);
      try {
        const blob = await renderBlob(type);
        if (!blob) throw new Error("no blob");
        triggerDownload(URL.createObjectURL(blob), fileName(content?.id, templateId, type));
      } catch {
        setExportError(true);
      } finally {
        setExporting(null);
      }
    },
    [content?.id, renderBlob, templateId],
  );

  /** Shares via the native share sheet (best on mobile). Returns success. */
  const shareFile = useCallback(
    async (type: "png" | "jpg" = "jpg"): Promise<boolean> => {
      try {
        const blob = await renderBlob(type);
        if (!blob) return false;
        const file = new File([blob], fileName(content?.id, templateId, type), {
          type: type === "png" ? "image/png" : "image/jpeg",
        });
        const nav = navigator as Navigator & {
          canShare?: (data: ShareData) => boolean;
        };
        if (nav.share && (!nav.canShare || nav.canShare({ files: [file] }))) {
          // Share the photocard image only — no reference text attached.
          await nav.share({ files: [file] });
          return true;
        }
      } catch {
        /* cancelled or unsupported */
      }
      return false;
    },
    [content, renderBlob, templateId],
  );

  const downloadBlob = useCallback(
    async (type: "png" | "jpg"): Promise<boolean> => {
      const blob = await renderBlob(type);
      if (!blob) return false;
      triggerDownload(URL.createObjectURL(blob), fileName(content?.id, templateId, type));
      return true;
    },
    [content?.id, renderBlob, templateId],
  );

  const copyImage = useCallback(async () => {
    setExporting("copy");
    setExportError(false);
    try {
      const clipboardItem = ClipboardItem as unknown as {
        supports?: (type: string) => boolean;
      };
      const canWriteImage =
        typeof ClipboardItem !== "undefined" &&
        typeof navigator !== "undefined" &&
        !!navigator.clipboard?.write &&
        (typeof clipboardItem.supports !== "function" ||
          clipboardItem.supports("image/png"));

      if (canWriteImage) {
        try {
          // Pass the blob as a Promise so the write is registered during the
          // user gesture (avoiding mobile "gesture expired" failures).
          const item = new ClipboardItem({
            "image/png": renderBlob("png").then((b) => {
              if (!b) throw new Error("no blob");
              return b;
            }),
          });
          await navigator.clipboard.write([item]);
          showNotice("copied");
          return;
        } catch {
          /* fall through to the share sheet / download below */
        }
      }

      // Mobile fallbacks: the native share sheet (which offers "Copy" on iOS &
      // Android), then a plain download so the user always gets the image.
      if (await shareFile("png")) return;
      await downloadBlob("png");
      showNotice("failed");
    } catch {
      showNotice("failed");
    } finally {
      setExporting(null);
    }
  }, [downloadBlob, renderBlob, shareFile, showNotice]);

  const shareImage = useCallback(async () => {
    setExporting("share");
    setExportError(false);
    try {
      if (await shareFile("jpg")) return;
      if (await downloadBlob("jpg")) showNotice("failed");
      else showNotice("failed");
    } finally {
      setExporting(null);
    }
  }, [downloadBlob, shareFile, showNotice]);

  // Pre-render the PNG shortly after edits settle, so tapping Copy / Download /
  // Share acts immediately. Mobile browsers (iOS especially) block actions that
  // happen long after a tap, which is why exporting directly on tap could fail.
  useEffect(() => {
    if (!content || exporting) return;
    if (typeof document !== "undefined" && document.hidden) return;
    const timer = setTimeout(() => {
      void renderBlob("png");
    }, 1500);
    return () => clearTimeout(timer);
  }, [content, exporting, renderBlob]);

  // Match the mobile export bar to the app's bottom navigation height.
  useEffect(() => {
    const nav = Array.from(document.querySelectorAll("nav")).find(
      (n) => getComputedStyle(n).position === "fixed",
    ) as HTMLElement | undefined;
    if (nav) setMobileNavHeight(nav.offsetHeight);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto h-[520px] max-w-md animate-pulse rounded-xl2 bg-ink-100" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-lg">
          <EmptyState
            title={t("editor_title")}
            body={t("hero_sub")}
            action={
              <div className="flex gap-3">
                <Link href="/quran" className="btn-secondary">
                  {t("browse_quran")}
                </Link>
                <Link href="/hadith" className="btn-primary">
                  {t("browse_hadith")}
                </Link>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  const busy = !!exporting;

  return (
    <div className="container-page pt-8 pb-40 md:pb-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink-900">
            {t("editor_title")}
          </h1>
          <p className="mt-1 text-sm text-ink-500">{shortLabel(content, language)}</p>
        </div>
        <div className="no-scrollbar -mx-4 hidden w-full items-center gap-2 overflow-x-auto px-4 md:mx-0 md:flex md:w-auto md:flex-wrap md:overflow-visible md:px-0 [&>button]:shrink-0 [&>a]:shrink-0">
          <Button variant="ghost" onClick={() => setPreviewOpen(true)}>
            <Eye className="h-4 w-4" />
            {t("preview")}
          </Button>
          <Button variant="secondary" onClick={copyImage} disabled={busy}>
            {exporting === "copy" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
            {t("copy_image")}
          </Button>
          <Button variant="secondary" onClick={shareImage} disabled={busy}>
            {exporting === "share" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
            {t("share")}
          </Button>
          <Button variant="secondary" onClick={() => download("jpg")} disabled={busy}>
            {exporting === "jpg" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {t("download_jpg")}
          </Button>
          <Button onClick={() => download("png")} disabled={busy}>
            {exporting === "png" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {t("download_png")}
          </Button>
        </div>
      </div>

      <div className="space-y-8 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 lg:space-y-0">
        {/* Live preview — pinned so every edit is visible while scrolling controls */}
        <div className="sticky top-16 z-30 -mx-4 border-b border-ink-100 bg-[color:var(--page)] px-4 py-3 sm:-mx-6 sm:px-6 lg:top-24 lg:z-auto lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:self-start">
          <div className="mx-auto w-full max-w-xl">
            <button
              type="button"
              onClick={() => {
                // Ignore the click that ends a drag so panning doesn't open the modal.
                if (Date.now() - dragStampRef.current < 350) return;
                setPreviewOpen(true);
              }}
              className="relative block w-full cursor-zoom-in overflow-hidden rounded-xl2 shadow-card ring-1 ring-ink-100"
              aria-label={t("live_preview")}
            >
              <PreviewStage
                key={`${templateId}-${format}`}
                ref={exportRef}
                templateId={templateId}
                format={formatSpec}
                fitHeight={inlineFit}
                content={displayContent ?? content}
                options={options}
                language={language}
                image={image}
                draggable={!!image}
                onPan={onPan}
                reportOverflow={reportOverflow}
                className="relative w-full"
              />
            </button>
            <p className="mt-3 text-center text-xs text-ink-400">
              {formatSpec.width} × {formatSpec.height}px
              {image && ` · ${t("drag_hint")}`}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="min-w-0 space-y-8">
          {hasOverflow && (
            <div className="flex items-start gap-3 rounded-xl2 border border-sand-200 bg-sand-50 p-4 text-sm text-sand-900">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p>{t("text_too_long")}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-sand-700">{t("suggest_long_template")}</span>
                  {longTemplates.slice(0, 3).map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => chooseTemplate(tpl.id)}
                      className="rounded-full border border-sand-300 bg-white px-3 py-1 text-xs font-medium text-sand-800"
                    >
                      {tpl.name[language]}
                    </button>
                  ))}
                </p>
              </div>
            </div>
          )}
          <Section icon={<Sparkles className="h-4 w-4" />} title={t("template")}>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {[{ id: "all" as const, en: "All", bn: "সব" }, ...TEMPLATE_GROUPS].map(
                (g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setTemplateGroup(g.id as typeof templateGroup)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition",
                      templateGroup === g.id
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-ink-200 bg-white text-ink-500 hover:border-ink-300 hover:text-ink-900",
                    )}
                  >
                    {language === "bn" ? g.bn : g.en}
                  </button>
                ),
              )}
            </div>
            <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
              {TEMPLATES.filter(
                (tpl) => templateGroup === "all" || tpl.group === templateGroup,
              ).map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => chooseTemplate(tpl.id)}
                  className={cn(
                    "shrink-0 rounded-xl border p-1 text-left transition",
                    tpl.id === templateId
                      ? "border-ink-900 ring-1 ring-ink-900"
                      : "border-ink-100 hover:border-ink-300",
                  )}
                >
                  <TemplateThumb
                    templateId={tpl.id}
                    width={104}
                    content={displayContent ?? content}
                    options={{ ...options, format: "portrait" }}
                    language={language}
                    image={image}
                  />
                  <span className="mt-1.5 block max-w-[104px] truncate px-0.5 text-[11px] font-medium text-ink-600">
                    {tpl.name[language]}
                  </span>
                </button>
              ))}
            </div>
          </Section>

          <Section icon={<PaletteIcon className="h-4 w-4" />} title={t("palette")}>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    title={p.name[language]}
                    aria-label={p.name[language]}
                    data-palette={p.id}
                    onClick={() => setPaletteId(p.id)}
                    className={cn(
                      "h-8 w-8 rounded-full border border-ink-200 transition",
                      paletteId === p.id && "ring-2 ring-ink-900 ring-offset-2",
                    )}
                    style={{ backgroundColor: p.swatch }}
                  />
                ))}
                <label
                  title={t("custom_color")}
                  className={cn(
                    "relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-ink-200 transition",
                    paletteId === "custom" && "ring-2 ring-ink-900 ring-offset-2",
                  )}
                  style={{
                    background:
                      "conic-gradient(from 0deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #a855f7, #ef4444)",
                  }}
                >
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => {
                      setCustomBgState(e.target.value);
                      setPaletteId("custom");
                    }}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label={t("custom_color")}
                  />
                </label>
              </div>
              {paletteId === "custom" && (
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full border border-ink-200" style={{ backgroundColor: customBg }} />
                  <span className="font-mono text-xs uppercase text-ink-500">{customBg}</span>
                </div>
              )}
              {template.defaultPalette && template.defaultPalette !== paletteId && (
                <button
                  type="button"
                  onClick={() => setPaletteId(template.defaultPalette!)}
                  className="chip"
                >
                  <Sparkles className="h-3.5 w-3.5 text-sand-600" />
                  {t("suggested_palette")}: {getPaletteById(template.defaultPalette).name[language]}
                </button>
              )}
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink-700">{t("background")}</span>
                <Segmented
                  size="sm"
                  value={background}
                  onChange={(v) => setBackground(v as BackgroundStyle)}
                  options={BACKGROUND_STYLES.map((b) => ({ value: b.id, label: b.name[language] }))}
                />
              </div>
            </div>
          </Section>

          <Section icon={<ImageIcon className="h-4 w-4" />} title={t("content")}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink-700">
                  {t("english")} / {t("bangla")}
                </span>
                <Segmented
                  size="sm"
                  value={translationLanguage}
                  onChange={(v) => {
                    translationTouchedRef.current = true;
                    setTranslationLanguage(v as "en" | "bn");
                  }}
                  options={[
                    ...(content.english?.trim()
                      ? [{ value: "en", label: t("english") }]
                      : []),
                    ...(content.bangla?.trim()
                      ? [{ value: "bn", label: t("bangla") }]
                      : []),
                  ]}
                />
              </div>
              {content.transliteration && (
                <Toggle
                  label={t("transliteration")}
                  checked={showTransliteration}
                  onChange={setShowTransliteration}
                />
              )}
              {content.arabicFull && (
                <Toggle
                  label={t("whole_narration")}
                  checked={showFullText}
                  onChange={setShowFullText}
                />
              )}
              {(content.categoryEn || content.categoryBn) && (
                <Toggle
                  label={t("show_category")}
                  checked={showCategory}
                  onChange={setShowCategory}
                />
              )}
            </div>
          </Section>

          <Section icon={<Type className="h-4 w-4" />} title={t("text_size")}>
            <div className="space-y-4">
              <Slider
                label={t("overall_size")}
                min={0.7}
                max={1.6}
                step={0.05}
                display={(v) => `${Math.round(v * 100)}%`}
                value={textScale}
                onChange={setTextScale}
              />
              <Slider
                label={t("arabic_size")}
                min={0.7}
                max={1.6}
                step={0.05}
                display={(v) => `${Math.round(v * 100)}%`}
                value={arabicScale}
                onChange={setArabicScale}
              />
              <Slider
                label={t("translation_size")}
                min={0.7}
                max={1.6}
                step={0.05}
                display={(v) => `${Math.round(v * 100)}%`}
                value={translationScale}
                onChange={setTranslationScale}
              />
            </div>
          </Section>

          <Section icon={<Wand2 className="h-4 w-4" />} title={t("metadata")}>
            <div className="space-y-3">
              <Toggle
                label={t("show_arabic")}
                checked={meta.showArabic}
                onChange={(v) => setMeta((m) => ({ ...m, showArabic: v }))}
              />
              <Toggle
                label={t("show_translation")}
                checked={meta.showTranslation}
                onChange={(v) => setMeta((m) => ({ ...m, showTranslation: v }))}
              />
              <Toggle
                label={t("show_reference")}
                checked={meta.showReference}
                onChange={(v) => setMeta((m) => ({ ...m, showReference: v }))}
              />
              <Toggle
                label={t("show_book")}
                checked={meta.showBook}
                onChange={(v) => setMeta((m) => ({ ...m, showBook: v }))}
              />
              <Toggle
                label={t("show_chapter")}
                checked={meta.showChapter}
                onChange={(v) => setMeta((m) => ({ ...m, showChapter: v }))}
              />
              <Toggle
                label={t("show_source")}
                checked={meta.showSource}
                onChange={(v) => setMeta((m) => ({ ...m, showSource: v }))}
              />
            </div>
          </Section>

          <Section icon={<ImageIcon className="h-4 w-4" />} title={t("image")}>
            <div className="space-y-4">
              <div className="space-y-2 rounded-xl border border-ink-100 bg-white p-3">
                <span className="label flex items-center gap-1.5">
                  <Wand2 className="h-3.5 w-3.5 text-sand-600" />
                  {t("ai_background")}
                </span>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => {
                    aiPromptTouchedRef.current = true;
                    setAiPrompt(e.target.value);
                  }}
                  rows={2}
                  placeholder={t("ai_placeholder")}
                  className="input resize-none"
                />
                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={generateBackground} disabled={generating || !aiPrompt.trim()}>
                    {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                    {generating ? t("regenerating") : t("generate")}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      aiPromptTouchedRef.current = false;
                      setAiPrompt(deriveGist(content, language));
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    {t("ai_from_text")}
                  </Button>
                  {aiError && <span className="text-xs text-red-600">{t("ai_failed")}</span>}
                </div>
                <p className="text-[11px] leading-relaxed text-ink-400">{t("ai_hint")}</p>
                <p className="text-[11px] leading-relaxed text-ink-400">{t("ai_no_people")}</p>
                {aiBlocked && (
                  <p className="flex items-start gap-1.5 rounded-lg bg-sand-50 px-2.5 py-2 text-[11px] text-sand-800">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {t("ai_blocked")}
                  </p>
                )}
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage(undefined)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-ink-900"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t("remove_image")}
                  </button>
                )}
              </div>

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200 bg-white/60 py-4 text-sm text-ink-500 hover:border-ink-300">
                <Upload className="h-4 w-4" />
                {t("upload_image")}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
              </label>

              {image && (
                <div className="space-y-4">
                  {template.supportsImage && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-ink-700">{t("image")}</span>
                      <Segmented
                        size="sm"
                        value={imageMode}
                        onChange={(v) => {
                          const mode = v as "photo" | "background";
                          setImageMode(mode);
                          setImage((img) =>
                            img
                              ? {
                                  ...img,
                                  opacity: mode === "background" ? 0.5 : 1,
                                  overlay: mode === "background" ? 0.15 : 0.35,
                                }
                              : img,
                          );
                        }}
                        options={[
                          { value: "photo", label: t("image_photo") },
                          { value: "background", label: t("image_background") },
                        ]}
                      />
                    </div>
                  )}
                  <Slider
                    label={t("zoom")}
                    min={1}
                    max={4}
                    step={0.01}
                    value={image.zoom}
                    onChange={(v) => setImage((img) => (img ? { ...img, zoom: v } : img))}
                  />
                  <Slider
                    label={t("opacity")}
                    min={0}
                    max={1}
                    step={0.01}
                    value={image.opacity ?? 1}
                    onChange={(v) => setImage((img) => (img ? { ...img, opacity: v } : img))}
                  />
                  <Slider
                    label={t("overlay")}
                    min={0}
                    max={0.85}
                    step={0.01}
                    value={image.overlay}
                    onChange={(v) => setImage((img) => (img ? { ...img, overlay: v } : img))}
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="text-xs font-medium text-ink-500 hover:text-ink-900"
                      onClick={() => setImage((img) => (img ? { ...img, zoom: 1, offsetX: 0, offsetY: 0 } : img))}
                    >
                      {t("no_image")} / reset position
                    </button>
                    <button type="button" className="btn-ghost" onClick={() => setImage(undefined)}>
                      <Trash2 className="h-4 w-4" />
                      {t("remove_image")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Section>

          <Section icon={<Sparkles className="h-4 w-4" />} title={t("brand")}>
            <div className="space-y-3">
              <Toggle label={t("logo")} checked={showLogo} onChange={setShowLogo} />
              <Toggle label={t("decor")} checked={decor} onChange={setDecor} />
              <Toggle label={t("brand")} checked={showBrand} onChange={setShowBrand} />
              <input
                value={brandText}
                onChange={(e) => setBrandText(e.target.value)}
                placeholder={t("brand_placeholder")}
                disabled={!showBrand}
                className="input disabled:opacity-50"
              />
            </div>
          </Section>

          <Section icon={<ImageIcon className="h-4 w-4" />} title={t("format")}>
            <Segmented
              value={format}
              onChange={(v) => setFormat(v as CardFormat)}
              options={CARD_FORMAT_LIST.map((f) => ({ value: f.id, label: f.label[language] }))}
            />
          </Section>

          {exportError && (
            <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertTriangle className="h-4 w-4" />
              {t("export_failed")}
            </p>
          )}
        </div>
      </div>

      {/* Mobile export bar — pinned above the app navigation so the buttons are
          always reachable (the pinned preview used to cover them on scroll). */}
      <div
        className="fixed inset-x-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur md:hidden"
        style={{ bottom: mobileNavHeight }}
      >
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1 px-3 py-1.5">
          <BarAction
            label="PNG"
            ariaLabel={t("download_png")}
            icon={<Download className="h-5 w-5" />}
            busy={exporting === "png"}
            disabled={busy}
            onClick={() => download("png")}
          />
          <BarAction
            label="JPG"
            ariaLabel={t("download_jpg")}
            icon={<Download className="h-5 w-5" />}
            busy={exporting === "jpg"}
            disabled={busy}
            onClick={() => download("jpg")}
          />
          <BarAction
            label={t("copy_short")}
            ariaLabel={t("copy_image")}
            icon={<Copy className="h-5 w-5" />}
            busy={exporting === "copy"}
            disabled={busy}
            onClick={copyImage}
          />
          <BarAction
            label={t("share")}
            icon={<Share2 className="h-5 w-5" />}
            busy={exporting === "share"}
            disabled={busy}
            onClick={shareImage}
          />
        </div>
      </div>

      {notice && (
        <div className="fixed bottom-40 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg md:bottom-8">
          <span className="inline-flex items-center gap-2">
            {notice === "copied" ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            {notice === "copied" ? t("copied") : t("copy_failed")}
          </span>
        </div>
      )}

      <CardPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onCopy={copyImage}
        onShare={shareImage}
        onDownload={() => download("jpg")}
        busy={busy}
        templateId={templateId}
        format={formatSpec}
        fitHeight={fitHeight}
        content={displayContent ?? content}
        options={options}
        language={language}
        image={image}
      />
    </div>
  );
}

function BarAction({
  label,
  ariaLabel,
  icon,
  busy,
  disabled,
  onClick,
}: {
  label: string;
  ariaLabel?: string;
  icon: React.ReactNode;
  busy?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      className="flex flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium text-ink-600 transition active:bg-ink-100 disabled:opacity-40"
    >
      {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
      {label}
    </button>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
        <span className="text-sand-600">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  display,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  display?: (value: number) => string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-ink-500">
        {label}
        <span className="tabular-nums text-ink-400">
          {display ? display(value) : value.toFixed(2)}
        </span>
      </span>
      <div className="flex items-center gap-2">
        <Minus className="h-3.5 w-3.5 text-ink-300" />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-200 accent-ink-900"
        />
        <Plus className="h-3.5 w-3.5 text-ink-300" />
      </div>
    </label>
  );
}

function fileName(id: string | undefined, templateId: string, ext: string): string {
  const slug = (id ?? "card").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  return `ayah-hadith-${slug}-${templateId}.${ext}`;
}

function triggerDownload(url: string, name: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/** Rejects if a render takes longer than `ms`, so the UI can never get stuck. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}
