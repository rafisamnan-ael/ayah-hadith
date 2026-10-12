"use client";

import {
  FitText,
  GeometricPattern,
  MetaLines,
  Shell,
  resolveContent,
  themeOf,
  translationFontClass,
  typeLabel,
  type TemplateRenderProps,
} from "../shared";

/** Template 07 — Modern Islamic. */
export function Template07(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <GeometricPattern color={palette.accent} opacity={palette.isDark ? 0.12 : 0.09} />
      <div className="absolute" style={{ inset: 40, border: "1px solid var(--c-line)" }} />

      <div
        className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center"
        style={{ padding: pad }}
      >
        <span
          className="mb-9 text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
          style={{ letterSpacing: "0.34em" }}
        >
          {typeLabel(content.type, language)}
        </span>

        {arabic && (
          <FitText
            text={arabic}
            rtl
            align="center"
            min={20}
            max={100}
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
            align="center"
            min={16}
            max={66}
            lineHeight={1.55}
            className="w-[88%]"
            innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
            reportKey="translation"
            reportOverflow={props.reportOverflow}
          />
        )}

        <div className="mt-12">
          <MetaLines
            props={props}
            className="justify-center font-serif text-[15px] uppercase text-[color:var(--c-muted)]"
          />
        </div>
      </div>
    </Shell>
  );
}
