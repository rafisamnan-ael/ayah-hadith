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

/** Template 25 — Salah (mihrab). */
export function Template25(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  const W = format.width;
  const H = format.height;
  const padX = W * 0.16;
  const top = H * 0.16;
  const archTop = H * 0.13;
  const base = H * 0.86;
  const fill =
    `M ${padX} ${base} L ${padX} ${H * 0.46} ` +
    `Q ${padX} ${H * 0.2} ${W * 0.5} ${archTop} ` +
    `Q ${W - padX} ${H * 0.2} ${W - padX} ${H * 0.46} ` +
    `L ${W - padX} ${base} Z`;

  return (
    <Shell width={W} height={H} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <svg aria-hidden="true" width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" style={{ color: palette.accent }}>
        <path d={fill} fill="currentColor" opacity={palette.isDark ? 0.14 : 0.1} />
        <path d={fill} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <line x1={W / 2} y1={top * 0.2} x2={W / 2} y2={archTop} stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
        <rect
          x={W / 2 - 8}
          y={top * 0.2 - 4}
          width="16"
          height="16"
          transform={`rotate(45 ${W / 2} ${top * 0.2 - 4})`}
          fill="currentColor"
          opacity="0.7"
        />
      </svg>

      <div className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center" style={{ padding: W * 0.2 }}>
        <span className="mb-8 text-[14px] font-semibold uppercase text-[color:var(--c-accent)]" style={{ letterSpacing: "0.4em" }}>
          {typeLabel(content.type, language)}
        </span>
        {arabic && (
          <FitText text={arabic} rtl align="center" min={20} max={96} lineHeight={1.9} className="w-full" innerClassName="font-arabic text-[color:var(--c-text)]" reportKey="arabic" reportOverflow={props.reportOverflow} />
        )}
        {arabic && translation && <div className="my-8 h-px w-14 bg-[var(--c-line)]" />}
        {translation && (
          <FitText text={translation} align="center" min={16} max={62} lineHeight={1.55} className="w-[96%]" innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`} reportKey="translation" reportOverflow={props.reportOverflow} />
        )}
        <div className="mt-9">
          <MetaLines props={props} className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
