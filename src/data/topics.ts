export interface Topic {
  id: string;
  en: string;
  bn: string;
  keywords: string[];
}

/**
 * Topic discovery is implemented as keyword search over the source hadith
 * text — the results are narrations that *mention* the topic, never a
 * fabricated authenticity classification. Keywords are matched against the
 * active translation language.
 */
export const TOPICS: Topic[] = [
  { id: "prayer", en: "Prayer", bn: "নামাজ", keywords: ["prayer", "salah", "salat", "pray"] },
  { id: "patience", en: "Patience", bn: "ধৈর্য", keywords: ["patience", "patient", "sabr", "persevere"] },
  { id: "dua", en: "Dua", bn: "দুআ", keywords: ["supplication", "invocation", "dua", "call upon"] },
  { id: "parents", en: "Parents", bn: "পিতা-মাতা", keywords: ["parents", "mother", "father", "kindness to parents"] },
  { id: "charity", en: "Charity", bn: "দান", keywords: ["charity", "charitable", "alms", "sadaqah"] },
  { id: "knowledge", en: "Knowledge", bn: "জ্ঞান", keywords: ["knowledge", "learn", "seeking knowledge", "scholar"] },
  { id: "forgiveness", en: "Forgiveness", bn: "ক্ষমা", keywords: ["forgive", "forgiveness", "pardon", "merciful"] },
  { id: "good-character", en: "Good Character", bn: "উত্তম চরিত্র", keywords: ["character", "manners", "good conduct", "best of you"] },
  { id: "gratitude", en: "Gratitude", bn: "কৃতজ্ঞতা", keywords: ["grateful", "gratitude", "thankful", "thanks"] },
  { id: "faith", en: "Faith", bn: "ঈমান", keywords: ["faith", "belief", "iman", "believe"] },
  { id: "honesty", en: "Honesty", bn: "সততা", keywords: ["honesty", "truthful", "truthfulness", "lying"] },
  { id: "kindness", en: "Kindness", bn: "সদাচরণ", keywords: ["kindness", "kind", "mercy", "compassion"] },
  { id: "neighbors", en: "Neighbors", bn: "প্রতিবেশী", keywords: ["neighbour", "neighbor", "neighbours", "neighbors"] },
  { id: "trade", en: "Trade", bn: "ব্যবসা", keywords: ["trade", "business", "buying", "selling", "debt"] },
];

export function findTopic(id: string | null | undefined): Topic | undefined {
  if (!id) return undefined;
  return TOPICS.find((t) => t.id === id);
}

export function matchHadithToTopic(text: string, topic: Topic): boolean {
  const lower = text.toLowerCase();
  return topic.keywords.some((k) => lower.includes(k.toLowerCase()));
}
