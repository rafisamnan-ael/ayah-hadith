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

/** Template 13 — Quiet Line. */
export function Template13(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 124 : 100;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex" style={{ padding: pad }}>
        <div className="w-[3px] shrink-0 rounded-full bg-[var(--c-accent)]" />

        <div className="ml-10 flex min-h-0 flex-1 flex-col">
          <span
            className="text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
            style={{ letterSpacing: "0.34em" }}
          >
            {typeLabel(content.type, language)}
          </span>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            {arabic && (
              <FitText
                text={arabic}
                rtl
                align="right"
                min={20}
                max={96}
                lineHeight={1.9}
                className="w-full"
                innerClassName="font-arabic text-[color:var(--c-text)]"
                reportKey="arabic"
                reportOverflow={props.reportOverflow}
              />
            )}
            {arabic && translation && <div className="my-9 h-px w-16 bg-[var(--c-line)]" />}
            {translation && (
              <FitText
                text={translation}
                align="left"
                min={16}
                max={62}
                lineHeight={1.6}
                className="w-full"
                innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
                reportKey="translation"
                reportOverflow={props.reportOverflow}
              />
            )}
          </div>

          <MetaLines props={props} className="font-serif text-[15px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
