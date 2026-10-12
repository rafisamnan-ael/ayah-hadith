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

/** Template 22 — Layl (night sky). */
export function Template22(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 130 : 106;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" style={{ opacity: palette.isDark ? 0.5 : 0.25 }}>
        <defs>
          <radialGradient id="layl-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
          </radialGradient>
          <pattern id="layl-stars" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="26" r="1.6" fill={palette.text} />
            <circle cx="86" cy="64" r="1.2" fill={palette.text} />
            <circle cx="52" cy="102" r="1" fill={palette.text} />
            <circle cx="102" cy="18" r="1" fill={palette.text} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#layl-stars)" />
        <rect width="100%" height="100%" fill="url(#layl-glow)" />
      </svg>

      <div className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center" style={{ padding: pad }}>
        <span className="mb-8 text-[14px] font-semibold uppercase text-[color:var(--c-accent)]" style={{ letterSpacing: "0.4em" }}>
          {typeLabel(content.type, language)}
        </span>
        {arabic && (
          <FitText text={arabic} rtl align="center" min={20} max={112} lineHeight={1.9} className="w-[88%]" innerClassName="font-arabic text-[color:var(--c-text)]" reportKey="arabic" reportOverflow={props.reportOverflow} />
        )}
        {arabic && translation && <div className="my-8 h-px w-16 bg-[var(--c-line)]" />}
        {translation && (
          <FitText text={translation} align="center" min={16} max={68} lineHeight={1.55} className="w-[86%]" innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`} reportKey="translation" reportOverflow={props.reportOverflow} />
        )}
        <div className="mt-10">
          <MetaLines props={props} className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
