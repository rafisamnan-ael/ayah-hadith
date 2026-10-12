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

/** Template 27 — Kawthar (flowing waves). */
export function Template27(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const W = format.width;
  const H = format.height;

  const wave = (y: number, amp: number, phase: number) => {
    const pts: string[] = [];
    for (let x = -20; x <= W + 20; x += 14) {
      const yy = y + Math.sin((x / W) * Math.PI * 2.6 + phase) * amp;
      pts.push(`${x},${yy.toFixed(1)}`);
    }
    return `M ${pts.join(" L ")}`;
  };

  return (
    <Shell width={W} height={H} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <svg aria-hidden="true" width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" style={{ color: palette.accent }}>
        <path d={wave(H * 0.74, H * 0.012, 0)} fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
        <path d={wave(H * 0.79, H * 0.016, 0.8)} fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.38" />
        <path d={wave(H * 0.84, H * 0.02, 1.6)} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.26" />
        <path d={wave(H * 0.89, H * 0.024, 2.4)} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.16" />
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
