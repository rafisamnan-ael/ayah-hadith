"use client";

import { X } from "lucide-react";
import { useT } from "@/hooks/useT";
import { Button } from "@/components/ui/Button";
import { PreviewStage } from "./PreviewStage";
import type { TemplateRenderProps } from "@/components/templates/types";
import type { CardFormatSpec } from "@/types";

export function CardPreviewModal({
  open,
  onClose,
  onCopy,
  onShare,
  onDownload,
  busy,
  templateId,
  format,
  fitHeight,
  ...render
}: {
  open: boolean;
  onClose: () => void;
  onCopy: () => void;
  onShare: () => void;
  onDownload: () => void;
  busy?: boolean;
  templateId: string;
  format: CardFormatSpec;
  fitHeight?: number;
} & Omit<TemplateRenderProps, "reportOverflow" | "format">) {
  const { t, language } = useT();
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex w-full items-center justify-between text-white">
          <span className="text-sm font-medium">{t("live_preview")}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="w-full overflow-hidden rounded-xl2 shadow-2xl">
          <PreviewStage
            templateId={templateId}
            format={format}
            fitHeight={fitHeight}
            {...render}
            reportOverflow={undefined}
            className="relative w-full"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Button variant="secondary" onClick={onCopy} disabled={busy}>
            {t("copy_image")}
          </Button>
          <Button variant="secondary" onClick={onShare} disabled={busy}>
            {t("share")}
          </Button>
          <Button onClick={onDownload} disabled={busy}>
            {t("download_jpg")}
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-white/60">{t("share_hint")}</p>
        <span className="sr-only">{language}</span>
      </div>
    </div>
  );
}
