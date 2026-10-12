/**
 * Reads a user-selected image file, downscales it to a sensible maximum edge
 * length and returns a data URL. Data URLs keep html-to-image export reliable
 * (no cross-origin taint) and keep memory bounded for very large uploads.
 */
export async function fileToDataUrl(
  file: File,
  maxEdge = 2000,
): Promise<string> {
  const original = await readAsDataUrl(file);
  if (!file.type.startsWith("image/")) {
    throw new Error("Unsupported file type");
  }
  try {
    return await resizeDataUrl(original, maxEdge);
  } catch {
    return original;
  }
}

function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

/** Converts a Blob (e.g. an AI-generated image) to a data URL. */
export async function blobToDataUrl(blob: Blob): Promise<string> {
  return readAsDataUrl(blob);
}

/**
 * Some free text-to-image providers stamp a small logo in the bottom corner.
 * This crops that strip off and re-encodes the image so exported cards stay
 * clean.
 */
export async function cropBottom(blob: Blob, ratio = 0.06): Promise<string> {
  const objectUrl = URL.createObjectURL(blob);
  try {
    const img = await loadImage(objectUrl);
    const w = img.naturalWidth || 1;
    const h = img.naturalHeight || 1;
    const keep = Math.max(0.5, 1 - ratio);
    const ch = Math.round(h * keep);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) return await blobToDataUrl(blob);
    ctx.drawImage(img, 0, 0, w, ch, 0, 0, w, ch);
    return canvas.toDataURL("image/jpeg", 0.92);
  } catch {
    return await blobToDataUrl(blob);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image decode failed"));
    img.src = src;
  });
}

async function resizeDataUrl(src: string, maxEdge: number): Promise<string> {
  const img = await loadImage(src);
  const longest = Math.max(img.width, img.height);
  if (longest <= maxEdge) return src;
  const ratio = maxEdge / longest;
  const w = Math.round(img.width * ratio);
  const h = Math.round(img.height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return src;
  ctx.drawImage(img, 0, 0, w, h);
  const type = src.startsWith("data:image/png") ? "image/png" : "image/jpeg";
  return canvas.toDataURL(type, 0.92);
}
