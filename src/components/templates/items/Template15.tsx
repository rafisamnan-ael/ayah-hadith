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

/** Template 15 — Gallery. */
export function Template15(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 126 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <div className="flex items-center justify-between pb-5">
          <span
            className="text-[14px] font-semibold uppercase text-[color:var(--c-muted)]"
            style={{ letterSpacing: "0.36em" }}
          >
            {typeLabel(content.type, language)}
          </span>
          <span className="text-[14px] uppercase tracking-widest text-[color:var(--c-muted)]">
            {content.type === "quran" ? content.surahNameEnglish : content.collection}
          </span>
        </div>
        <div className="h-px w-full bg-[var(--c-line)]" />

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          {translation && (
            <FitText
              text={translation}
              align="center"
              min={23}
              max={106}
              lineHeight={1.38}
              className="w-[90%]"
              innerClassName={`${translationFontClass(lang)} text-[color:var(--c-text)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
          {translation && arabic && <div className="my-9 h-px w-16 bg-[var(--c-line)]" />}
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="center"
              min={18}
              max={64}
              lineHeight={1.9}
              className="w-[90%]"
              innerClassName="font-arabic text-[color:var(--c-body)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <div className="h-px w-full bg-[var(--c-line)]" />
        <div className="pt-5">
          <MetaLines props={props} className="font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
