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

/** Template 21 — Fajr (dawn bands). */
export function Template21(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-x-0 top-0 h-[42%]" style={{ background: `linear-gradient(to bottom, ${palette.bg2}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-[34%]" style={{ background: `linear-gradient(to top, ${palette.accent}22, transparent)` }} />
      <div className="absolute left-1/2 top-[26%] h-px w-[68%] -translate-x-1/2" style={{ background: palette.accent, opacity: 0.5 }} />
      <div className="absolute left-1/2 top-[26%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45" style={{ background: palette.accent }} />

      <div className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center" style={{ padding: pad }}>
        <span className="mb-8 text-[14px] font-semibold uppercase text-[color:var(--c-muted)]" style={{ letterSpacing: "0.4em" }}>
          {typeLabel(content.type, language)}
        </span>
        {arabic && (
          <FitText text={arabic} rtl align="center" min={20} max={110} lineHeight={1.9} className="w-[88%]" innerClassName="font-arabic text-[color:var(--c-text)]" reportKey="arabic" reportOverflow={props.reportOverflow} />
        )}
        {arabic && translation && <div className="my-8 h-px w-16 bg-[var(--c-line)]" />}
        {translation && (
          <FitText text={translation} align="center" min={16} max={68} lineHeight={1.55} className="w-[86%]" innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`} reportKey="translation" reportOverflow={props.reportOverflow} />
        )}
        <div className="mt-10">
          <MetaLines props={props} className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
