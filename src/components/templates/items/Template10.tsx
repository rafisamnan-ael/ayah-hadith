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

/** Template 10 — Quote Card (translation-led). */
export function Template10(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 126 : 102;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <header className="flex items-center justify-between">
          <span
            className="text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
            style={{ letterSpacing: "0.32em" }}
          >
            {typeLabel(content.type, language)}
          </span>
          <span className="h-px w-12 bg-[var(--c-line)]" />
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          {translation && (
            <>
              <span className="select-none font-serif text-[120px] leading-[0.5] text-[color:var(--c-accent)] opacity-40">
                &ldquo;
              </span>
              <FitText
                text={translation}
                align="left"
                min={21}
                max={108}
                lineHeight={1.4}
                className="mt-2 w-full"
                innerClassName={`${translationFontClass(lang)} text-[color:var(--c-text)]`}
                reportKey="translation"
                reportOverflow={props.reportOverflow}
              />
            </>
          )}
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="right"
              min={16}
              max={56}
              lineHeight={1.9}
              className="mt-12 w-4/5 self-end"
              innerClassName="font-arabic text-[color:var(--c-body)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <footer className="flex items-center">
          <span className="inline-flex items-center rounded-full border border-[color:var(--c-line)] px-5 py-2.5">
            <MetaLines props={props} className="font-serif text-[15px] uppercase text-[color:var(--c-muted)]" />
          </span>
        </footer>
      </div>
    </Shell>
  );
}
