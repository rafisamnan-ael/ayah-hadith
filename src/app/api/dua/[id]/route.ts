import { NextRequest } from "next/server";
import { GENERAL_DUA_RANGES, sliceDuaRange } from "@/data/generalDuaRanges";

/**
 * Server-side proxy for general (Sunnah) du'as, sourced from the Hadith
 * Encyclopedia (hadeethenc.com). Returns Arabic + English + Bangla + grading
 * for one narration. Proxying keeps the browser CORS-free and lets the API
 * provider be swapped later.
 */
export const runtime = "nodejs";

const BASE = process.env.HADEETHENC_API_URL || "https://hadeethenc.com/api/v1";

interface HetOne {
  id?: string;
  title?: string;
  hadeeth?: string;
  hadeeth_ar?: string;
  hadeeth_intro?: string;
  hadeeth_intro_ar?: string;
  attribution?: string;
  grade?: string;
}

const BANGLA_SCRIPT = /[\u0980-\u09FF]/;
const LATIN_SCRIPT = /[A-Za-z\u00C0-\u024F]/;

/**
 * The provider falls back to Arabic when a translation is unavailable, which
 * would otherwise surface Arabic text as the "Bangla" or "English" translation.
 * Keep a value only when it is really written in the requested script.
 */
function inScript(text: string | null, lang: "en" | "bn"): string | null {
  if (!text) return null;
  return (lang === "bn" ? BANGLA_SCRIPT : LATIN_SCRIPT).test(text) ? text : null;
}

/** Drops the reported-by intro the provider prefixes (when it gives one). */
function stripIntro(
  text: string | null | undefined,
  intro?: string | null,
): string | null {
  if (!text) return null;
  let body = text.replace(/\s+/g, " ").trim();
  if (intro) {
    const prefix = intro.replace(/\s+/g, " ").trim();
    if (prefix && body.startsWith(prefix)) body = body.slice(prefix.length).trim();
  }
  return body || null;
}

/** The supplication quoted inside "…" (English texts). */
function quotedDua(text: string | null | undefined, intro?: string | null): string | null {
  if (!text) return null;
  let body = text.replace(/\s+/g, " ").trim();
  const pairs: Array<[string, string]> = [
    ["'", "'"],
    ["‘", "’"],
    ["«", "»"],
    ["“", "”"],
    ['"', '"'],
  ];
  outer: for (const [open, close] of pairs) {
    let idx = -1;
    while ((idx = body.indexOf(open, idx + 1)) !== -1) {
      const prev = idx > 0 ? body[idx - 1] : " ";
      if (/[\p{L}\p{N}]/u.test(prev)) continue; // apostrophe inside a word
      const end = body.indexOf(close, idx + 1);
      if (end === -1) continue;
      const inner = body.slice(idx + 1, end).trim();
      if (inner.length >= 12) {
        body = inner;
        break outer;
      }
    }
  }
  if (intro) {
    const prefix = intro.replace(/\s+/g, " ").trim();
    if (body.startsWith(prefix)) body = body.slice(prefix.length).trim();
  }
  return body.replace(/[«»“”]/g, "").replace(/^[:"'\s]+|[:"'\s]+$/g, "").trim() || null;
}

async function getOne(id: string, lang: "en" | "bn"): Promise<HetOne | null> {
  try {
    const res = await fetch(
      `${BASE}/hadeeths/one/?language=${lang}&id=${encodeURIComponent(id)}`,
      {
        headers: {
          "User-Agent": "AyahHadith/1.0 (+https://ayah-hadith.vercel.app)",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(20000),
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as HetOne;
  } catch {
    return null;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return Response.json({ error: "invalid id" }, { status: 400 });
  }

  const [en, bn] = await Promise.all([getOne(id, "en"), getOne(id, "bn")]);
  if (!en && !bn) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  const arabicFull = bn?.hadeeth_ar ?? en?.hadeeth_ar ?? null;
  const englishFull = en?.hadeeth ?? null;
  const banglaFull = bn?.hadeeth ?? null;
  const range = GENERAL_DUA_RANGES[id];

  const data = {
    id,
    // Each language shows the *same* supplication. Arabic and Bangla are sliced
    // verbatim using curated, diacritic-insensitive anchors (so the Arabic can
    // never surface the wrong fragment); English uses the quoted supplication.
    arabic:
      sliceDuaRange(arabicFull, range?.ar) ??
      stripIntro(arabicFull, bn?.hadeeth_intro_ar ?? en?.hadeeth_intro_ar),
    english: inScript(quotedDua(englishFull, en?.hadeeth_intro), "en"),
    bangla:
      sliceDuaRange(banglaFull, range?.bn) ??
      stripIntro(banglaFull, bn?.hadeeth_intro),
    // The untouched narration (for the "whole hadith" option).
    arabicFull,
    englishFull: inScript(englishFull, "en"),
    banglaFull: inScript(banglaFull, "bn"),
    titleEn: en?.title ?? null,
    titleBn: bn?.title ?? null,
    attributionEn: en?.attribution ?? null,
    attributionBn: bn?.attribution ?? null,
    gradeEn: en?.grade ?? null,
    gradeBn: bn?.grade ?? null,
  };

  return Response.json(data, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=604800" },
  });
}
