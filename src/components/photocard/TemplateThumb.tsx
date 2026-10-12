"use client";

import { CARD_FORMATS } from "@/lib/formats";
import { getTemplate } from "@/components/templates/registry";
import type { TemplateRenderProps } from "@/components/templates/types";
import { cn } from "@/lib/utils";

/** Small, accurate live thumbnail of a template using the current content. */
export function TemplateThumb({
  templateId,
  width = 132,
  className,
  ...renderProps
}: { templateId: string; width?: number; className?: string } & Omit<
  TemplateRenderProps,
  "format"
>) {
  const template = getTemplate(templateId);
  const format = CARD_FORMATS.portrait;
  const scale = width / format.width;
  const height = format.height * scale;
  const Component = template.Component;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-ink-100 bg-white",
        className,
      )}
      style={{ width, height }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left"
        style={{
          width: format.width,
          height: format.height,
          transform: `scale(${scale})`,
        }}
      >
        <Component {...renderProps} format={format} />
      </div>
    </div>
  );
}
