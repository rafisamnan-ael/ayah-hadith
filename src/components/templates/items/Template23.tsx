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

/** Template 23 — Nur (radial light). */
export function Template23(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" style={{ color: palette.accent }}>
        <defs>
          <radialGradient id="nur-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity={palette.isDark ? 0.4 : 0.28} />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#nur-glow)" />
        {[0.16, 0.24, 0.34].map((r, i) => (
          <circle key={i} cx="50%" cy="50%" r={`${r * 100}%`} fill="none" stroke="currentColor" strokeWidth="1" opacity={0.16 - i * 0.03} />
        ))}
      </svg>

      <div className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center" style={{ padding: pad }}>
        <span className="mb-8 text-[14px] font-semibold uppercase text-[color:var(--c-accent)]" style={{ letterSpacing: "0.4em" }}>
          {typeLabel(content.type, language)}
        </span>
        {arabic && (
          <FitText text={arabic} rtl align="center" min={20} max={112} lineHeight={1.9} className="w-[86%]" innerClassName="font-arabic text-[color:var(--c-text)]" reportKey="arabic" reportOverflow={props.reportOverflow} />
        )}
        {arabic && translation && <div className="my-8 h-px w-16 bg-[var(--c-line)]" />}
        {translation && (
          <FitText text={translation} align="center" min={16} max={68} lineHeight={1.55} className="w-[84%]" innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`} reportKey="translation" reportOverflow={props.reportOverflow} />
        )}
        <div className="mt-10">
          <MetaLines props={props} className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
