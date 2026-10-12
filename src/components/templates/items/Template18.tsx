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

/** Template 18 — Column (two-column, portrait). */
export function Template18(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const isStory = format.id === "story";
  const pad = isStory ? 110 : 88;

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col" style={{ padding: pad }}>
        <span
          className="pb-6 text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
          style={{ letterSpacing: "0.34em" }}
        >
          {typeLabel(content.type, language)}
        </span>

        <div className={`flex min-h-0 flex-1 ${isStory ? "flex-col" : "flex-row"}`}>
          {arabic && (
            <div className={`flex min-h-0 flex-1 items-center ${isStory ? "pb-8" : "pr-10"}`}>
              <FitText
                text={arabic}
                rtl
                align={isStory ? "left" : "right"}
                min={20}
                max={84}
                lineHeight={1.9}
                className="w-full"
                innerClassName="font-arabic text-[color:var(--c-text)]"
                reportKey="arabic"
                reportOverflow={props.reportOverflow}
              />
            </div>
          )}

          {arabic && translation && (
            <div className={isStory ? "h-px w-full bg-[var(--c-line)]" : "w-px self-stretch bg-[var(--c-line)]"} />
          )}

          {translation && (
            <div className={`flex min-h-0 flex-1 items-center ${isStory ? "pt-8" : "pl-10"}`}>
              <FitText
                text={translation}
                align="left"
                min={16}
                max={62}
                lineHeight={1.55}
                className="w-full"
                innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
                reportKey="translation"
                reportOverflow={props.reportOverflow}
              />
            </div>
          )}
        </div>

        <div className="pt-6">
          <MetaLines props={props} className="font-serif text-[15px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
