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

/** Template 19 — Emblem. */
export function Template19(props: TemplateRenderProps) {
  const { format, content, language } = props;
  const pad = format.id === "story" ? 128 : 104;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className="absolute inset-0 flex flex-col items-center" style={{ padding: pad }}>
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ border: "1px solid var(--c-line)" }}
        >
          <svg viewBox="0 0 40 40" className="h-9 w-9" style={{ color: "var(--c-accent)" }} aria-hidden="true">
            <rect x="9" y="9" width="22" height="22" transform="rotate(45 20 20)" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="20" cy="20" r="3.6" fill="currentColor" />
          </svg>
        </div>
        <div className="mt-4 h-px w-16 bg-[var(--c-line)]" />

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          <span
            className="mb-7 text-[14px] font-semibold uppercase text-[color:var(--c-accent)]"
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
              max={100}
              lineHeight={1.9}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-text)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
          {arabic && translation && <div className="my-8 h-px w-14 bg-[var(--c-line)]" />}
          {translation && (
            <FitText
              text={translation}
              align="center"
              min={16}
              max={66}
              lineHeight={1.55}
              className="w-[88%]"
              innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <MetaLines
          props={props}
          className="justify-center font-serif text-[14px] uppercase text-[color:var(--c-muted)]"
        />
      </div>
    </Shell>
  );
}
