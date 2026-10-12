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

/** Template 16 — Poster. */
export function Template16(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 100;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <div className="flex items-center gap-4">
          <span className="text-[15px] font-semibold uppercase text-[color:var(--c-accent)]" style={{ letterSpacing: "0.3em" }}>
            {typeLabel(content.type, language)}
          </span>
          <span className="h-px flex-1 bg-[var(--c-line)]" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          {translation && (
            <FitText
              text={translation}
              align="left"
              min={25}
              max={130}
              lineHeight={1.18}
              className="w-full"
              innerClassName={`${translationFontClass(lang)} font-semibold uppercase text-[color:var(--c-text)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
          {translation && arabic && <div className="my-9 h-[3px] w-20 bg-[var(--c-accent)]" />}
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="right"
              min={18}
              max={52}
              lineHeight={1.9}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-body)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-[var(--c-line)]" />
          <MetaLines props={props} className="font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
