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

/** Template 01 — Minimal. */
export function Template01(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 120 : 96;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <header className="flex items-center justify-between">
          <span
            className="text-[17px] font-semibold uppercase text-[color:var(--c-accent)]"
            style={{ letterSpacing: "0.34em" }}
          >
            {typeLabel(content.type, language)}
          </span>
          <span className="h-px flex-1 bg-[var(--c-line)]" style={{ marginLeft: 28 }} />
        </header>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="center"
              min={24}
              max={130}
              lineHeight={1.95}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-text)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
          {translation && (
            <ArabicOrnament
              className={`h-2 w-28 text-[color:var(--c-accent)] ${arabic ? "my-10" : "mb-10"}`}
            />
          )}
          {translation && (
            <FitText
              text={translation}
              align="center"
              min={16}
              max={72}
              lineHeight={1.55}
              className="w-full"
              innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <footer className="flex items-center justify-center">
          <MetaLines
            props={props}
            className="justify-center text-center font-serif text-[17px] uppercase text-[color:var(--c-muted)]"
          />
        </footer>
      </div>
    </Shell>
  );
}
