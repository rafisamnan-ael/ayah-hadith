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

/** Template 28 — Hikmah (editorial grid). */
export function Template28(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 120 : 96;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0" style={{ padding: pad }}>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-semibold uppercase text-[color:var(--c-accent)]" style={{ letterSpacing: "0.34em" }}>
            {typeLabel(content.type, language)}
          </span>
          <span className="h-px flex-1 bg-[var(--c-line)]" />
          <span className="font-serif text-[14px] uppercase tracking-widest text-[color:var(--c-muted)]">
            {content.type === "quran"
              ? language === "bn"
                ? "সূরা"
                : "Surah"
              : language === "bn"
                ? "হাদিস"
                : "Hadith"}
          </span>
        </div>

        <div className="mt-8 flex min-h-0 h-[calc(100%-3rem)] flex-col">
          <div className="flex min-h-0 flex-1">
            <div className="flex w-8 shrink-0 flex-col items-center">
              <span className="h-1.5 w-1.5 rotate-45 bg-[var(--c-accent)]" />
              <span className="mt-2 w-px flex-1 bg-[var(--c-line)]" />
            </div>
            <div className="ml-6 flex min-h-0 flex-1 flex-col justify-center">
              {arabic && (
                <FitText
                  text={arabic}
                  rtl
                  align="right"
                  min={20}
                  max={92}
                  lineHeight={1.9}
                  className="w-full"
                  innerClassName="font-arabic text-[color:var(--c-text)]"
                  reportKey="arabic"
                  reportOverflow={props.reportOverflow}
                />
              )}
            </div>
          </div>

          {arabic && translation && <div className="my-7 h-px w-full bg-[var(--c-line)]" />}

          <div className="flex min-h-0 flex-1">
            <div className="w-8 shrink-0" />
            <div className="ml-6 flex min-h-0 flex-1 items-center">
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
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-[var(--c-line)]" />
          <MetaLines props={props} className="font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
