"use client";

import {
  FitText,
  GeometricPattern,
  ImageLayer,
  MetaLines,
  Shell,
  resolveContent,
  themeOf,
  translationFontClass,
  typeLabel,
  type TemplateRenderProps,
} from "../shared";

/** Template 06 — Split Layout. */
export function Template06(props: TemplateRenderProps) {
  const { format, content, language, image } = props;
  const { arabic, translation, lang } = resolveContent(props);
  const { palette, background, customBg } = themeOf(props.options);
  const isStory = format.id === "story";
  const textPad = 84;

  return (
    <Shell width={format.width} height={format.height} palette={palette} background={background} customBg={customBg} options={props.options} image={props.image}>
      <div className={isStory ? "absolute inset-0 flex flex-col" : "absolute inset-0 flex"}>
        <div className={`relative overflow-hidden ${isStory ? "h-[42%] w-full" : "h-full w-[42%]"}`}>
          {image?.src && props.options.imageMode !== "background" ? (
            <ImageLayer image={image} width={format.width} height={format.height} />
          ) : (
            <div className="absolute inset-0" style={{ backgroundColor: palette.bg2 }}>
              <GeometricPattern color={palette.accent} opacity={palette.isDark ? 0.16 : 0.12} />
            </div>
          )}
        </div>

        <div
          className={`relative flex min-h-0 flex-1 flex-col justify-center ${isStory ? "w-full" : ""}`}
          style={{ padding: textPad }}
        >
          <span
            className="mb-7 text-[15px] font-semibold uppercase text-[color:var(--c-accent)]"
            style={{ letterSpacing: "0.3em" }}
          >
            {typeLabel(content.type, language)}
          </span>

          {arabic && (
            <FitText
              text={arabic}
              rtl
              align="left"
              min={20}
              max={80}
              lineHeight={1.85}
              className="w-full"
              innerClassName="font-arabic text-[color:var(--c-text)]"
              reportKey="arabic"
              reportOverflow={props.reportOverflow}
            />
          )}
          {arabic && translation && <div className="my-7 h-px w-14 bg-[var(--c-line)]" />}
          {translation && (
            <FitText
              text={translation}
              align="left"
              min={16}
              max={58}
              lineHeight={1.55}
              className="w-full"
              innerClassName={`${translationFontClass(lang)} text-[color:var(--c-body)]`}
              reportKey="translation"
              reportOverflow={props.reportOverflow}
            />
          )}

          <div className="mt-8">
            <MetaLines props={props} className="font-serif text-[15px] uppercase text-[color:var(--c-muted)]" />
          </div>
        </div>
      </div>
    </Shell>
  );
}
