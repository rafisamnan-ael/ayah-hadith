"use client";

import {
  FitText,
  ImageLayer,
  MetaLines,
  Shell,
  resolveContent,
  themeOf,
  translationFontClass,
  typeLabel,
  type TemplateRenderProps,
} from "../shared";

/** Template 04 — Image Overlay. */
export function Template04(props: TemplateRenderProps) {
  const { format, content, language, image } = props;
  const pad = format.id === "story" ? 128 : 96;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette } = themeOf(props.options);

  return (
    <Shell
      width={format.width}
      height={format.height}
      palette={palette}
      options={props.options}
      image={props.image}
    >
      {image?.src && props.options.imageMode !== "background" ? (
        <ImageLayer image={image} width={format.width} height={format.height} scrim="bottom" />
      ) : (
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1d2128 0%, #0b0d11 100%)" }}>
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end text-white" style={{ padding: pad }}>
        <span
          className="mb-6 text-[15px] font-semibold uppercase text-white/70"
          style={{ letterSpacing: "0.34em" }}
        >
          {typeLabel(content.type, language)}
        </span>

        <div className="flex min-h-0 max-w-[86%] flex-1 flex-col justify-end">
          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="left"
              min={22}
              max={100}
              lineHeight={1.85}
              className="w-full"
              innerClassName="font-arabic text-white"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
          {arabic && translation && <div className="my-6 h-px w-16 bg-white/40" />}
          {translation && (
            <FitText
              text={translation}
              align="left"
              min={16}
              max={60}
              lineHeight={1.6}
              className="w-full"
              innerClassName={`${translationFontClass(lang)} text-white/90`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <span className="h-px w-8 bg-white/40" />
          <MetaLines props={props} className="font-serif text-[15px] uppercase text-white/75" />
        </div>
      </div>
    </Shell>
  );
}
