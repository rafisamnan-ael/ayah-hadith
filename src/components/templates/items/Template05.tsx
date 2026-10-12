"use client";

import {
  FitText,
  MetaLines,
  Shell,
  resolveContent,
  themeOf,
  translationFontClass,
  type TemplateRenderProps,
} from "../shared";

/** Template 05 — Typography Focus. */
export function Template05(props: TemplateRenderProps) {
  const { format } = props;
  const pad = format.id === "story" ? 132 : 96;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const hero = arabic ?? translation;
  const secondary = arabic ? translation : undefined;

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div
        className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center"
        style={{ padding: pad }}
      >
        {hero && (
          <FitText
            text={hero}
            rtl={Boolean(arabic)}
            align="center"
            min={31}
            max={168}
            lineHeight={arabic ? 1.8 : 1.3}
            className="w-full"
            innerClassName={
              arabic
                ? "font-arabic text-[color:var(--c-text)]"
                : `${translationFontClass(lang)} italic text-[color:var(--c-text)]`
            }
            reportKey="hero"
            reportOverflow={props.reportOverflow}
          />
        )}
        {secondary && <div className="my-9 h-px w-20 bg-[var(--c-line)]" />}
        {secondary && (
          <FitText
            text={secondary}
            align="center"
            min={16}
            max={62}
            lineHeight={1.6}
            className="w-4/5"
            innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
            reportKey="secondary"
            reportOverflow={props.reportOverflow}
          />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center" style={{ paddingBottom: pad * 0.55 }}>
        <MetaLines props={props} className="font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
      </div>
    </Shell>
  );
}
