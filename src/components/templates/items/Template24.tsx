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

/** Template 24 — Jannah (garden arch). */
export function Template24(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  const W = format.width;
  const H = format.height;
  const padX = W * 0.1;
  const bottom = H * 0.9;
  const peak = H * 0.17;
  const shoulder = H * 0.44;
  const d =
    `M ${padX} ${bottom} L ${padX} ${shoulder} ` +
    `Q ${padX} ${H * 0.22} ${W * 0.5} ${peak} ` +
    `Q ${W - padX} ${H * 0.22} ${W - padX} ${shoulder} ` +
    `L ${W - padX} ${bottom}`;

  return (
    <Shell width={W} height={H} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <svg
        aria-hidden="true"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0"
        style={{ color: palette.accent }}
      >
        <path d={d} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.55" />
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" transform={`translate(${W * 0.03}, ${H * 0.02}) scale(0.94)`} />
        <rect x={W * 0.5 - 7} y={peak - 4} width="14" height="14" transform={`rotate(45 ${W * 0.5} ${peak + 3})`} fill="currentColor" opacity="0.75" />
      </svg>

      <div
        className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center"
        style={{ padding: W * 0.17 }}
      >
        <span className="mb-8 text-[14px] font-semibold uppercase text-[color:var(--c-accent)]" style={{ letterSpacing: "0.4em" }}>
          {typeLabel(content.type, language)}
        </span>
        {arabic && (
          <FitText text={arabic} rtl align="center" min={20} max={104} lineHeight={1.9} className="w-full" innerClassName="font-arabic text-[color:var(--c-text)]" reportKey="arabic" reportOverflow={props.reportOverflow} />
        )}
        {arabic && translation && <div className="my-8 h-px w-16 bg-[var(--c-line)]" />}
        {translation && (
          <FitText text={translation} align="center" min={16} max={66} lineHeight={1.55} className="w-[94%]" innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`} reportKey="translation" reportOverflow={props.reportOverflow} />
        )}
        <div className="mt-10">
          <MetaLines props={props} className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]" />
        </div>
      </div>
    </Shell>
  );
}
