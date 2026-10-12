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

/** Template 11 — Editorial Number. */
export function Template11(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 100;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const bigNumber =
    content.type === "quran" ? content.verseNumber?.toString() : content.hadithNumber;

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
          <span className="font-serif text-[15px] uppercase tracking-wide text-[color:var(--c-muted)]">
            {content.type === "quran" ? content.surahNameEnglish : content.collection}
          </span>
        </header>

        <div className="relative flex min-h-0 flex-1 items-center">
          {bigNumber && (
            <span
              className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-serif text-[300px] font-semibold leading-none"
              style={{ color: palette.text, opacity: 0.06 }}
            >
              {bigNumber}
            </span>
          )}
          <div className="relative z-10 flex h-full min-h-0 max-w-[76%] flex-col justify-center">
            {arabic && (
              <FitText
                text={arabic}
                rtl
                align="left"
                min={20}
                max={90}
                lineHeight={1.88}
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
                align="left"
                min={16}
                max={60}
                lineHeight={1.55}
                className="w-full"
                innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
                reportKey="translation"
                reportOverflow={props.reportOverflow}
              />
            )}
          </div>
        </div>

        <footer className="flex items-center">
          <MetaLines props={props} className="font-serif text-[15px] uppercase text-[color:var(--c-muted)]" />
        </footer>
      </div>
    </Shell>
  );
}
