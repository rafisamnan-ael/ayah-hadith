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

/** Template 08 — Monochrome. */
export function Template08(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 100;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <header className="flex items-center justify-between">
          <span
            className="font-serif text-[14px] font-semibold uppercase text-[color:var(--c-text)]"
            style={{ letterSpacing: "0.34em" }}
          >
            {typeLabel(content.type, language)}
          </span>
          <span className="h-3.5 w-3.5 rotate-45 border border-[color:var(--c-text)]" />
        </header>

        <div className="mt-7 h-[5px] w-full bg-[var(--c-text)]" />

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          {translation && (
            <FitText
              text={translation}
              align="left"
              min={25}
              max={138}
              lineHeight={1.24}
              className="w-full"
              innerClassName={`${translationFontClass(lang)} font-semibold text-[color:var(--c-text)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
          {translation && arabic && <div className="my-9 h-px w-20 bg-[var(--c-line)]" />}
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="right"
              min={18}
              max={56}
              lineHeight={1.9}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-body)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <footer className="flex items-center justify-between border-t border-[color:var(--c-line)] pt-6">
          <MetaLines props={props} className="font-serif text-[15px] uppercase text-[color:var(--c-muted)]" />
        </footer>
      </div>
    </Shell>
  );
}
