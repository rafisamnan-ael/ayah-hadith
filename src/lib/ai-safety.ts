/**
 * Lightweight safety layer for AI background generation.
 *
 * The goal is thematic, non-figurative imagery: no people, no faces, no
 * depictions of sacred figures or texts, and nothing explicit or violent.
 * Prompts that clearly ask for those are refused before any request is made,
 * and a strong negative prompt is always appended to discourage them.
 */

const BLOCKED_TERMS = [
  // sexual / explicit
  "nude", "nudity", "naked", "nsfw", "porn", "pornographic", "sexual", "erotic",
  "lingerie", "bikini", "topless", "sensual",
  // violence / gore
  "gore", "gory", "blood", "bloody", "corpse", "behead", "decapitate", "torture",
  "execution", "violence", "violent", "weapon", "gun", "rifle", "pistol",
  // drugs
  "drug", "drugs", "cocaine", "heroin", "marijuana", "cannabis", "alcohol",
  "beer", "wine", "whiskey",
  // sacred figures / texts
  "prophet", "muhammad", "mohammed", "muhammed", "jesus", "christ", "buddha",
  "idol", "deity", "god", "goddess", "allah", "quran", "qur'an", "koran",
  "kaaba", "angel", "saint", "messiah",
  // people / faces / portraits (discouraged — refused when explicit)
  "face", "faces", "portrait", "portraits", "selfie", "headshot", "profile photo",
  "human", "humans", "person", "persons", "people", "man", "men", "woman",
  "women", "boy", "boys", "girl", "girls", "child", "children", "baby", "babies",
  "model", "actor", "actress", "crowd", "family photo", "group of people",
];

export const AI_STYLE =
  "empty scene, no people, no humans, no faces, no figures, no silhouettes, " +
  "thematic background only, abstract or natural scenery, architecture, " +
  "textures, calm minimal editorial photography, soft natural light, muted " +
  "tones, high detail, no text, no writing";

export const AI_NEGATIVE =
  "person, people, human, humans, face, faces, portrait, portrait photo, " +
  "selfie, headshot, figure, figures, silhouette, silhouettes, crowd, crowd " +
  "of people, man, men, woman, women, boy, boys, girl, girls, child, children, " +
  "baby, babies, hands, skin, body, bodies, eyes, head, hair, lips, nose, ear, " +
  "torso, limbs, statue, sculpture, deity, idol, religious figure, cartoon " +
  "character, anime character, text, letters, watermark, logo, signature, " +
  "nudity, nsfw, violence, gore";

export function screenPrompt(prompt: string): { ok: boolean; term?: string } {
  const normalized = prompt.toLowerCase();
  for (const term of BLOCKED_TERMS) {
    const re = new RegExp(`(^|[^a-z])${escapeRegExp(term)}([^a-z]|$)`, "i");
    if (re.test(normalized)) return { ok: false, term };
  }
  return { ok: true };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
