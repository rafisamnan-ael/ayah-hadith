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

/** Template 14 — Monogram. */
export function Template14(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 130 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const source = content.type === "quran" ? content.surahNameEnglish : content.collection;
  const initial = (source || "A").trim().charAt(0).toUpperCase();

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col items-center" style={{ padding: pad }}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--c-line)]">
          <span className="font-serif text-2xl font-semibold text-[color:var(--c-accent)]">
            {initial}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="center"
              min={20}
              max={104}
              lineHeight={1.9}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-text)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
          {arabic && translation && <div className="my-9 h-px w-14 bg-[var(--c-line)]" />}
          {translation && (
            <FitText
              text={translation}
              align="center"
              min={16}
              max={64}
              lineHeight={1.6}
              className="w-[88%]"
              innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <MetaLines
          props={props}
          className="justify-center font-serif text-[15px] uppercase text-[color:var(--c-muted)]"
        />
      </div>
    </Shell>
  );
}
