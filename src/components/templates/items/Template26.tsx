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

/** Template 26 — Dua (rising rays). */
export function Template26(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const W = format.width;
  const H = format.height;
  const cx = W / 2;
  const cy = H * 0.98;
  const rays = Array.from({ length: 9 }, (_, i) => {
    const spread = (i - 4) * (W * 0.11);
    return `M ${cx} ${cy} L ${cx + spread} ${H * 0.2}`;
  });

  return (
    <Shell width={W} height={H} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <svg aria-hidden="true" width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" style={{ color: palette.accent }}>
        {rays.map((d, i) => (
          <line key={i} x1={cx} y1={cy} x2={cx + (i - 4) * (W * 0.11)} y2={H * 0.2} stroke="currentColor" strokeWidth="1.2" opacity={0.22 - Math.abs(i - 4) * 0.03} />
        ))}
        <ellipse cx={cx} cy={cy} rx={W * 0.5} ry={W * 0.28} fill="currentColor" opacity={palette.isDark ? 0.16 : 0.1} />
      </svg>

      <div className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center" style={{ padding: pad }}>
        <span className="mb-8 text-[14px] font-semibold uppercase text-[color:var(--c-accent)]" style={{ letterSpacing: "0.4em" }}>
          {typeLabel(content.type, language)}
        </span>
        {arabic && (
          <FitText text={arabic} rtl align="center" min={20} max={108} lineHeight={1.9} className="w-[88%]" innerClassName="font-arabic text-[color:var(--c-text)]" reportKey="arabic" reportOverflow={props.reportOverflow} />
        )}
        {arabic && translation && <div className="my-8 h-px w-16 bg-[var(--c-line)]" />}
        {translation && (
          <FitText text={translation} align="center" min={16} max={66} lineHeight={1.55} className="w-[86%]" innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`} reportKey="translation" reportOverflow={props.reportOverflow} />
        )}
        <div className="mt-10">
          <MetaLines props={props} className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
