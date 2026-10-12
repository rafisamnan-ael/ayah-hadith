"use client";

import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from "react";
import { getTemplate } from "@/components/templates/registry";
import type { TemplateRenderProps } from "@/components/templates/types";
import { cn } from "@/lib/utils";
import type { CardFormatSpec } from "@/types";

interface PreviewStageProps extends Omit<TemplateRenderProps, "reportOverflow"> {
  templateId: string;
  format: CardFormatSpec;
  /**
   * Optional max height (px). When set, the card is scaled to fit inside it so
   * the whole preview is visible at once and the page never needs to scroll to
   * see it.
   */
  fitHeight?: number;
  draggable?: boolean;
  onPan?: (dxPx: number, dyPx: number) => void;
  reportOverflow?: (key: string, overflow: boolean) => void;
  className?: string;
}

/**
 * Renders the photocard at full export size inside a CSS-scaled, self-contained
 * wrapper, and exposes the unscaled node via ref so it can be rasterised at
 * exact dimensions with html-to-image.
 */
export const PreviewStage = forwardRef<HTMLDivElement, PreviewStageProps>(
  function PreviewStage(
    { templateId, format, fitHeight, draggable, onPan, className, ...renderProps },
    exportRef,
  ) {
    const template = getTemplate(templateId);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.25);
    const dragState = useRef<{ x: number; y: number } | null>(null);

    useLayoutEffect(() => {
      const el = wrapRef.current;
      if (!el) return;
      const update = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        const s = Math.min(w / format.width, h / format.height);
        if (s > 0.01 && Number.isFinite(s)) setScale(s);
      };
      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      window.addEventListener("resize", update);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", update);
      };
    }, [format.width, format.height, fitHeight]);

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (!draggable || !onPan) return;
        dragState.current = { x: e.clientX, y: e.clientY };
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      },
      [draggable, onPan],
    );

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!onPan || !dragState.current) return;
        const dx = e.clientX - dragState.current.x;
        const dy = e.clientY - dragState.current.y;
        dragState.current = { x: e.clientX, y: e.clientY };
        // Convert screen pixels to card pixels so panning tracks the cursor.
        onPan(dx / (scale || 1), dy / (scale || 1));
      },
      [onPan, scale],
    );

    const endDrag = useCallback(() => {
      dragState.current = null;
    }, []);

    const Component = template.Component;

    return (
      <div
        ref={wrapRef}
        className={cn("relative overflow-hidden", className)}
        style={{
          width: "100%",
          aspectRatio: `${format.width} / ${format.height}`,
          maxHeight: fitHeight,
        }}
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/2",
            draggable && "cursor-grab active:cursor-grabbing",
          )}
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          <div ref={exportRef} style={{ width: format.width, height: format.height }}>
            <Component {...renderProps} format={format} />
          </div>
        </div>
      </div>
    );
  },
);
