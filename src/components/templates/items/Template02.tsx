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

/** Template 02 — Editorial. */
export function Template02(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 130 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <header className="flex items-center gap-5">
          <span className="h-px w-10 bg-[var(--c-accent)]" />
          <span
            className="text-[14px] font-semibold uppercase text-[color:var(--c-accent)]"
            style={{ letterSpacing: "0.34em" }}
          >
            {typeLabel(content.type, language)}
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="right"
              min={22}
              max={120}
              lineHeight={1.85}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-text)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
          {arabic && translation && <div className="mb-8 mt-10 h-px w-24 bg-[var(--c-line)]" />}
          {translation && (
            <FitText
              text={translation}
              align="left"
              min={16}
              max={64}
              lineHeight={1.6}
              className="w-4/5"
              innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <footer className="flex items-center justify-end">
          <MetaLines
            props={props}
            className="text-right font-serif text-[14px] uppercase text-[color:var(--c-muted)]"
          />
        </footer>
      </div>
    </Shell>
  );
}
