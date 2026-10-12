import type { AppLanguage, ReligiousContent } from "@/types";

/**
 * Derives a safe, thematic background prompt ("gist") from the selected
 * content. It is keyword-based (no external model call) and deliberately
 * produces empty, non-figurative scenes — never people, faces or sacred
 * imagery — so it is safe to send to the image provider.
 */
interface Theme {
  keys: string[];
  scene: string;
}

const THEMES: Theme[] = [
  { keys: ["patience", "patient", "sabr", "hardship", "difficulty", "trial", "test"], scene: "vast calm desert dunes under a soft dawn sky, empty landscape" },
  { keys: ["mercy", "merciful", "forgive", "forgiveness", "kindness", "compassion", "pardon"], scene: "soft sunlit clouds drifting over a calm sea, gentle golden light" },
  { keys: ["paradise", "jannah", "garden", "rivers", "green", "flower"], scene: "lush green garden with a quiet stream and morning light" },
  { keys: ["prayer", "salah", "prostrate", "mosque", "worship", "mihrab"], scene: "peaceful empty mosque interior with soft light beams through arches" },
  { keys: ["night", "dark", "layl", "stars", "star"], scene: "deep night sky full of stars above distant hills, empty and calm" },
  { keys: ["light", "nur", "guidance", "dawn", "fajr", "morning", "sunrise"], scene: "sunlight rays breaking through soft clouds at dawn, minimal" },
  { keys: ["water", "sea", "ocean", "rain", "river", "wave"], scene: "calm blue water surface with gentle ripples and soft horizon" },
  { keys: ["mountain", "earth", "land", "hill"], scene: "misty layered mountain ridges at sunrise, minimal and empty" },
  { keys: ["gratitude", "thanks", "thankful", "blessing", "provision", "rizq", "wealth"], scene: "golden field of grain glowing at sunset, empty landscape" },
  { keys: ["knowledge", "book", "learn", "pen", "write", "wisdom"], scene: "open old book on a wooden desk with soft window light, empty room" },
  { keys: ["time", "day", "age", "hour"], scene: "long empty road through a minimal landscape at dusk" },
  { keys: ["charity", "give", "spend", "alms", "sadaqah"], scene: "cluster of warm traditional lanterns glowing at dusk, no people" },
  { keys: ["justice", "truth", "honest", "fair"], scene: "balanced minimal composition of light and shadow over stone texture" },
  { keys: ["death", "hereafter", "judgment", "grave", "akhirah"], scene: "solitary tree on a vast plain under a soft overcast sky, sombre" },
  { keys: ["fear", "hope", "sadness", "anxiety", "grief", "distress"], scene: "quiet misty valley at first light, calming and empty" },
  { keys: ["family", "parents", "children", "marriage", "home", "wife", "husband"], scene: "warm minimal home interior with soft daylight, empty room" },
  { keys: ["food", "eat", "drink", "dates"], scene: "simple still life of dates and water on linen cloth, no people" },
  { keys: ["peace", "calm", "rest", "heart"], scene: "still mountain lake reflecting a soft sky at dawn, empty" },
];

const FALLBACK = "minimal abstract texture with soft natural light, calm and serene";

export function deriveGist(
  content: ReligiousContent | undefined,
  language: AppLanguage,
): string {
  if (!content) return FALLBACK;
  const text = (
    (language === "bn" ? content.bangla : content.english) ||
    content.english ||
    content.bangla ||
    ""
  ).toLowerCase();
  const hay = `${content.topic ?? ""} ${text}`;
  for (const theme of THEMES) {
    if (theme.keys.some((k) => hay.includes(k))) return theme.scene;
  }
  return FALLBACK;
}
