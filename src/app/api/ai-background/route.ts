import { NextRequest } from "next/server";
import { AI_NEGATIVE, AI_STYLE, screenPrompt } from "@/lib/ai-safety";

/**
 * Server-side proxy for AI background generation.
 *
 * Defaults to Pollinations (keyless). The provider can be swapped via
 * `AI_IMAGE_API_URL` and an optional server-only `AI_IMAGE_API_KEY`. Proxying
 * through the server keeps the image same-origin, so canvas export stays
 * untainted and no key is ever shipped to the browser.
 */
export const runtime = "nodejs";
// Allow headroom for slower image models on plans that permit it.
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt")?.trim();
  if (!prompt) {
    return Response.json({ error: "Missing prompt" }, { status: 400 });
  }

  const screen = screenPrompt(prompt);
  if (!screen.ok) {
    return Response.json({ error: "blocked" }, { status: 422 });
  }

  const width = clampInt(searchParams.get("width"), 512, 1600, 1080);
  const height = clampInt(searchParams.get("height"), 512, 1920, 1350);
  const seed =
    searchParams.get("seed")?.replace(/[^0-9]/g, "") ||
    String(Math.floor(Math.random() * 1_000_000));

  const base =
    process.env.AI_IMAGE_API_URL?.replace(/\/$/, "") ||
    "https://image.pollinations.ai/prompt";

  const style = AI_STYLE;
  const url = `${base}/${encodeURIComponent(`${prompt}, ${style}`)}?width=${width}&height=${height}&seed=${seed}&nologo=true&referrer=ayah-hadith&negative=${encodeURIComponent(AI_NEGATIVE)}`;

  try {
    const key = process.env.AI_IMAGE_API_KEY;
    const upstream = await fetch(url, {
      headers: key ? { Authorization: `Bearer ${key}` } : {},
      signal: AbortSignal.timeout(55000),
    });
    if (!upstream.ok) {
      return Response.json({ error: "Generation failed" }, { status: 502 });
    }
    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return Response.json({ error: "Invalid image response" }, { status: 502 });
    }
    const buffer = await upstream.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return Response.json({ error: "Generation timed out" }, { status: 504 });
  }
}

function clampInt(
  value: string | null,
  min: number,
  max: number,
  fallback: number,
): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(Math.round(n), min), max);
}
