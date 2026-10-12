"use client";

import {
  FitText,
  ImageLayer,
  MetaLines,
  Shell,
  resolveContent,
  themeOf,
  translationFontClass,
  type TemplateRenderProps,
} from "../shared";

/** Template 30 — Bloom. Centered, translation-led, with a highlighted ending. */
export function Template30(props: TemplateRenderProps) {
  const { format } = props;
  const pad = format.id === "story" ? 132 : 100;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const photo = !!props.image?.src && props.options.imageMode !== "background";

  return (
    <Shell
      width={format.width}
      height={format.height}
      palette={palette}
      background={background}
      customBg={customBg}
      options={props.options}
      image={props.image}
    >
      {photo && (
        <>
          <ImageLayer image={props.image} width={format.width} height={format.height} scrim="none" />
          {/* Soft wash so type stays legible over any photo. */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: palette.bg, opacity: 0.52 }}
          />
        </>
      )}

      <div
        className="absolute inset-0 flex min-h-0 flex-col items-center justify-center text-center"
        style={{ padding: pad }}
      >
        {arabic && (
          <FitText
            text={arabic}
            rtl
            align="center"
            min={18}
            max={64}
            lineHeight={1.9}
            className="w-[92%]"
            innerClassName="font-arabic text-[color:var(--c-muted)]"
            reportKey="arabic"
            reportOverflow={props.reportOverflow}
          />
        )}

        {translation && (
          <FitText
            text={translation}
            align="center"
            min={22}
            max={86}
            lineHeight={1.6}
            className={arabic ? "mt-10 w-[92%]" : "w-[92%]"}
            innerClassName={`${translationFontClass(lang)} font-bold text-[color:var(--c-text)]`}
            reportKey="translation"
            reportOverflow={props.reportOverflow}
            highlightTail
            tailColor={palette.accent}
          />
        )}

        <div className="mt-12">
          <MetaLines
            props={props}
            className="justify-center font-serif text-[15px] text-[color:var(--c-muted)]"
          />
        </div>
      </div>
    </Shell>
  );
}
