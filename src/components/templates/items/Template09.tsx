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

/** Template 09 — Soft Tone. */
export function Template09(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 126 : 102;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <header className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--c-accent)]" />
          <span
            className="text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
            style={{ letterSpacing: "0.3em" }}
          >
            {typeLabel(content.type, language)}
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
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
          {arabic && translation && <div className="mx-auto my-9 h-px w-16 bg-[var(--c-line)]" />}
          {translation && (
            <FitText
              text={translation}
              align="center"
              min={16}
              max={68}
              lineHeight={1.55}
              className="w-full"
              innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <footer className="flex justify-center">
          <MetaLines
            props={props}
            className="justify-center text-center font-serif text-[15px] uppercase text-[color:var(--c-accent)]"
          />
        </footer>
      </div>
    </Shell>
  );
}
