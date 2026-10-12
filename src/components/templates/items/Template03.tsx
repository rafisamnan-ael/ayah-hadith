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

/** Template 03 — Soft Neutral (translation-led). */
export function Template03(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 124 : 100;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <header className="flex items-center justify-between">
          <span
            className="text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
            style={{ letterSpacing: "0.3em" }}
          >
            {typeLabel(content.type, language)}
          </span>
          <span className="h-2.5 w-2.5 rotate-45 bg-[var(--c-accent)]" />
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="left"
              min={20}
              max={64}
              lineHeight={1.9}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-body)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
          {arabic && translation && <div className="my-10 h-px w-16 bg-[var(--c-line)]" />}
          {translation && (
            <FitText
              text={translation}
              align="left"
              min={18}
              max={114}
              lineHeight={1.42}
              className="w-full"
              innerClassName={`${translationFontClass(lang)} font-medium text-[color:var(--c-text)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <footer className="flex items-center">
          <MetaLines
            props={props}
            className="font-serif text-[17px] uppercase text-[color:var(--c-accent)]"
          />
        </footer>
      </div>
    </Shell>
  );
}
