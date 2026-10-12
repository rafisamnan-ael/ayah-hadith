"use client";

import {
  FitText,
  MetaLines,
  Shell,
  resolveContent,
  themeOf,
  translationFontClass,
  typeLabel,
  type TemplateRenderProps,
} from "../shared";

/** Template 29 — Sabr (calm). */
export function Template29(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 130 : 106;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <div className="flex justify-center">
          <span className="text-[13px] font-semibold uppercase text-[color:var(--c-muted)]" style={{ letterSpacing: "0.5em" }}>
            {typeLabel(content.type, language)}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          {arabic && (
            <FitText text={arabic} rtl align="center" min={20} max={112} lineHeight={2} className="w-[90%] self-center" innerClassName="font-arabic text-[color:var(--c-text)]" reportKey="arabic" reportOverflow={props.reportOverflow} />
          )}
          {arabic && translation && <div className="my-10 mr-auto ml-auto h-px w-24 bg-[var(--c-line)]" />}
          {translation && (
            <FitText text={translation} align="center" min={16} max={64} lineHeight={1.7} className="w-[86%] self-center" innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`} reportKey="translation" reportOverflow={props.reportOverflow} />
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-[var(--c-accent)]" />
          <MetaLines props={props} className="font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
