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

/** Template 20 — Aurora (soft colour blobs). */
export function Template20(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-24 top-8 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ backgroundColor: palette.accent, opacity: palette.isDark ? 0.22 : 0.16 }}
        />
        <div
          className="absolute -bottom-24 -right-20 h-[460px] w-[460px] rounded-full blur-3xl"
          style={{ backgroundColor: palette.bg2, opacity: palette.isDark ? 0.7 : 0.9 }}
        />
      </div>

      <div className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center" style={{ padding: pad }}>
        <span
          className="mb-8 text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
          style={{ letterSpacing: "0.36em" }}
        >
          {typeLabel(content.type, language)}
        </span>

        {arabic && (
          <FitText
            text={arabic}
            rtl
            align="center"
            min={20}
            max={108}
            lineHeight={1.9}
            className="w-full"
            innerClassName="font-arabic text-[color:var(--c-text)]"
            reportKey="arabic"
            reportOverflow={props.reportOverflow}
          />
        )}
        {arabic && translation && <div className="my-9 h-px w-16 bg-[var(--c-line)]" />}
        {translation && (
          <FitText
            text={translation}
            align="center"
            min={16}
            max={68}
            lineHeight={1.55}
            className="w-[88%]"
            innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
            reportKey="translation"
            reportOverflow={props.reportOverflow}
          />
        )}

        <div className="mt-12">
          <MetaLines
            props={props}
            className="justify-center font-serif text-[15px] uppercase text-[color:var(--c-muted)]"
          />
        </div>
      </div>
    </Shell>
  );
}
