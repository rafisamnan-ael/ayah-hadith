"use client";

import {
  ArabicOrnament,
  FitText,
  MetaLines,
  Shell,
  resolveContent,
  themeOf,
  translationFontClass,
  typeLabel,
  type TemplateRenderProps,
} from "../shared";

/** Template 12 — Framed Minimal. */
export function Template12(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 132 : 108;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute" style={{ inset: 42, border: "1px solid var(--c-line)" }} />

      <div
        className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center"
        style={{ padding: pad }}
      >
        <span
          className="text-[14px] font-semibold uppercase text-[color:var(--c-accent)]"
          style={{ letterSpacing: "0.38em" }}
        >
          {typeLabel(content.type, language)}
        </span>

        <ArabicOrnament className="my-8 h-2 w-24 text-[color:var(--c-accent)]" />

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
        {arabic && translation && <div className="my-8 h-px w-14 bg-[var(--c-line)]" />}
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
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center" style={{ paddingBottom: pad * 0.7 }}>
        <MetaLines
          props={props}
          className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]"
        />
      </div>
    </Shell>
  );
}
