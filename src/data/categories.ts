export interface Category {
  id: string;
  en: string;
  bn: string;
  group: CategoryGroupId;
  /** Keywords used for keyword-based discovery per language. */
  keywords: { en: string[]; bn: string[] };
  /** Curated, well-known references (surah:ayah) shown as "Featured". */
  verses?: string[];
}

export type CategoryGroupId =
  | "worship"
  | "heart"
  | "character"
  | "life"
  | "trials"
  | "hereafter";

export const CATEGORY_GROUPS: Array<{ id: CategoryGroupId; en: string; bn: string }> = [
  { id: "worship", en: "Worship & Practice", bn: "ইবাদত ও আমল" },
  { id: "heart", en: "Heart & Faith", bn: "হৃদয় ও ঈমান" },
  { id: "character", en: "Character & Manners", bn: "চরিত্র ও আদব" },
  { id: "life", en: "Life & Relationships", bn: "জীবন ও সম্পর্ক" },
  { id: "trials", en: "Trials & Comfort", bn: "পরীক্ষা ও সান্ত্বনা" },
  { id: "hereafter", en: "Hereafter", bn: "আখিরাত" },
];

export const CATEGORIES: Category[] = [
  {
    id: "patience",
    en: "Patience",
    bn: "ধৈর্য",
    group: "trials",
    keywords: {
      en: ["patience", "patient", "persevere"],
      bn: ["ধৈর্য", "সবর", "অধৈর্য"],
    },
    verses: ["2:153", "2:155", "94:5", "39:10"],
  },
  {
    id: "gratitude",
    en: "Gratitude",
    bn: "কৃতজ্ঞতা",
    group: "heart",
    keywords: {
      en: ["grateful", "gratitude", "thankful"],
      bn: ["কৃতজ্ঞ", "শোকর", "ধন্যবাদ"],
    },
    verses: ["14:7", "2:152", "16:18"],
  },
  {
    id: "mercy",
    en: "Mercy",
    bn: "দয়া ও করুণা",
    group: "heart",
    keywords: {
      en: ["mercy", "merciful", "compassion"],
      bn: ["দয়া", "রহম", "করুণা"],
    },
    verses: ["21:107", "7:156", "39:53"],
  },
  {
    id: "forgiveness",
    en: "Forgiveness",
    bn: "ক্ষমা",
    group: "heart",
    keywords: {
      en: ["forgive", "forgiveness", "pardon"],
      bn: ["ক্ষমা", "মাফ", "তওবা"],
    },
    verses: ["39:53", "3:135", "25:70"],
  },
  {
    id: "trust",
    en: "Trust in Allah",
    bn: "আল্লাহর উপর ভরসা",
    group: "heart",
    keywords: {
      en: ["trust", "rely upon", "put your trust"],
      bn: ["ভরসা", "তাওয়াক্কুল", "নির্ভর"],
    },
    verses: ["65:3", "3:159", "8:2"],
  },
  {
    id: "repentance",
    en: "Repentance",
    bn: "তওবা",
    group: "heart",
    keywords: {
      en: ["repent", "repentance", "return to Allah"],
      bn: ["তওবা", "ফিরে আসা", "ক্ষমা"],
    },
    verses: ["66:8", "39:53", "24:31"],
  },
  {
    id: "dua",
    en: "Dua",
    bn: "দুআ",
    group: "worship",
    keywords: {
      en: ["supplication", "invocation", "call upon"],
      bn: ["দুআ", "প্রার্থনা", "ডাক"],
    },
    verses: ["2:186", "40:60", "7:55"],
  },
  {
    id: "prayer",
    en: "Prayer",
    bn: "নামাজ",
    group: "worship",
    keywords: {
      en: ["prayer", "salah", "establish prayer"],
      bn: ["নামাজ", "সালাত", "নামায"],
    },
    verses: ["2:45", "20:14", "29:45"],
  },
  {
    id: "fasting",
    en: "Fasting & Ramadan",
    bn: "রোজা ও রমজান",
    group: "worship",
    keywords: {
      en: ["fasting", "ramadan", "night of decree"],
      bn: ["রোজা", "সিয়াম", "রমজান", "লাইলাতুল কদর"],
    },
    verses: ["2:183", "2:185", "97:1", "2:187"],
  },
  {
    id: "quran",
    en: "The Qur'an",
    bn: "আল-কুরআন",
    group: "worship",
    keywords: {
      en: ["quran", "revelation", "book", "recite"],
      bn: ["কুরআন", "কিতাব", "তিলাওয়াত", "ওহি"],
    },
    verses: ["2:2", "17:82", "54:17", "15:9"],
  },
  {
    id: "knowledge",
    en: "Knowledge",
    bn: "জ্ঞান",
    group: "worship",
    keywords: {
      en: ["knowledge", "learn", "seeking knowledge"],
      bn: ["জ্ঞান", "ইলম", "শেখা"],
    },
    verses: ["20:114", "58:11", "96:1"],
  },
  {
    id: "charity",
    en: "Charity",
    bn: "দান-সদকা",
    group: "life",
    keywords: {
      en: ["charity", "charitable", "spend in the way"],
      bn: ["দান", "সদকা", "যাকাত", "দান করা"],
    },
    verses: ["2:261", "2:274", "57:18"],
  },
  {
    id: "parents",
    en: "Parents",
    bn: "পিতা-মাতা",
    group: "life",
    keywords: {
      en: ["parents", "mother", "father"],
      bn: ["পিতা", "মাতা", "মা-বাবা"],
    },
    verses: ["17:23", "31:14", "46:15"],
  },
  {
    id: "family",
    en: "Family & Marriage",
    bn: "পরিবার ও বিবাহ",
    group: "life",
    keywords: {
      en: ["family", "marriage", "spouse", "wife"],
      bn: ["পরিবার", "বিবাহ", "স্ত্রী", "স্বামী"],
    },
    verses: ["30:21", "25:74", "24:32", "66:6"],
  },
  {
    id: "children",
    en: "Children",
    bn: "সন্তান",
    group: "life",
    keywords: {
      en: ["children", "offspring", "son", "daughter"],
      bn: ["সন্তান", "ছেলে", "মেয়ে", "কন্যা"],
    },
    verses: ["17:24", "25:74", "66:6"],
  },
  {
    id: "neighbors",
    en: "Neighbors",
    bn: "প্রতিবেশী",
    group: "life",
    keywords: {
      en: ["neighbour", "neighbor", "neighbours"],
      bn: ["প্রতিবেশী", "পাশের"],
    },
    verses: ["4:36"],
  },
  {
    id: "provision",
    en: "Provision (Rizq)",
    bn: "রিযিক",
    group: "life",
    keywords: {
      en: ["provision", "sustenance", "sustains", "wealth"],
      bn: ["রিযিক", "জীবিকা", "ধন", "সচ্ছলতা"],
    },
    verses: ["11:6", "65:3", "29:60"],
  },
  {
    id: "kindness",
    en: "Kindness",
    bn: "সদাচরণ",
    group: "character",
    keywords: {
      en: ["kindness", "kind", "good conduct"],
      bn: ["সদাচরণ", "ভালো", "নম্র"],
    },
    verses: ["3:159", "16:90", "41:34"],
  },
  {
    id: "honesty",
    en: "Honesty",
    bn: "সততা",
    group: "character",
    keywords: {
      en: ["honesty", "truthful", "truthfulness", "lie"],
      bn: ["সততা", "সত্য", "মিথ্যা"],
    },
    verses: ["33:70", "9:119", "22:30"],
  },
  {
    id: "justice",
    en: "Justice",
    bn: "ন্যায়বিচার",
    group: "character",
    keywords: {
      en: ["justice", "just", "fair"],
      bn: ["ন্যায়", "ইনসাফ", "বিচার"],
    },
    verses: ["4:58", "5:8", "16:90"],
  },
  {
    id: "humility",
    en: "Humility",
    bn: "বিনয়",
    group: "character",
    keywords: {
      en: ["humble", "humility", "arrogance"],
      bn: ["বিনয়", "অহংকার", "নম্র"],
    },
    verses: ["25:63", "17:37", "31:18"],
  },
  {
    id: "anger",
    en: "Controlling Anger",
    bn: "ক্রোধ নিয়ন্ত্রণ",
    group: "character",
    keywords: {
      en: ["anger", "angry", "restrain"],
      bn: ["রাগ", "ক্রোধ", "নিয়ন্ত্রণ"],
    },
    verses: ["3:134", "42:37", "41:34"],
  },
  {
    id: "tongue",
    en: "Guarding the Tongue",
    bn: "জিহ্বা সংযত রাখা",
    group: "character",
    keywords: {
      en: ["tongue", "speech", "backbiting", "gossip"],
      bn: ["জিহ্বা", "কথা", "গীবত", "পরনিন্দা"],
    },
    verses: ["33:70", "49:12", "17:53"],
  },
  {
    id: "anxiety",
    en: "Anxiety & Grief",
    bn: "দুশ্চিন্তা ও দুঃখ",
    group: "trials",
    keywords: {
      en: ["grief", "anxiety", "sadness", "distress"],
      bn: ["দুশ্চিন্তা", "দুঃখ", "শোক", "বিষণ্নতা"],
    },
    verses: ["9:40", "3:139", "13:28", "94:5"],
  },
  {
    id: "hardship",
    en: "Hardship & Ease",
    bn: "কষ্ট ও স্বস্তি",
    group: "trials",
    keywords: {
      en: ["hardship", "difficulty", "trial", "test"],
      bn: ["কষ্ট", "পরীক্ষা", "বিপদ", "কঠিন"],
    },
    verses: ["2:286", "94:5", "65:7", "2:216"],
  },
  {
    id: "hope",
    en: "Hope",
    bn: "আশা",
    group: "trials",
    keywords: {
      en: ["hope", "despair", "mercy of Allah"],
      bn: ["আশা", "নিরাশা", "আশ্বাস"],
    },
    verses: ["39:53", "12:87", "15:56"],
  },
  {
    id: "healing",
    en: "Healing (Shifa)",
    bn: "শিফা ও আরোগ্য",
    group: "trials",
    keywords: {
      en: ["healing", "sickness", "cure", "pain"],
      bn: ["শিফা", "রোগ", "নিরাময়", "আরোগ্য"],
    },
    verses: ["17:82", "26:80", "21:83"],
  },
  {
    id: "protection",
    en: "Protection",
    bn: "সুরক্ষা",
    group: "trials",
    keywords: {
      en: ["protection", "refuge", "evil", "harm"],
      bn: ["সুরক্ষা", "আশ্রয়", "রক্ষা", "মন্দ"],
    },
    verses: ["2:255", "113:1", "114:1"],
  },
  {
    id: "time",
    en: "Time & Reflection",
    bn: "সময় ও চিন্তা",
    group: "trials",
    keywords: {
      en: ["time", "night", "morning", "day"],
      bn: ["সময়", "রাত", "সকাল", "দিন"],
    },
    verses: ["103:1", "93:1", "3:190"],
  },
  {
    id: "hereafter",
    en: "Hereafter",
    bn: "আখিরাত",
    group: "hereafter",
    keywords: {
      en: ["hereafter", "paradise", "day of judgment"],
      bn: ["আখিরাত", "জান্নাত", "কিয়ামত", "জাহান্নাম"],
    },
    verses: ["3:185", "99:7", "2:25"],
  },
  {
    id: "death",
    en: "Death",
    bn: "মৃত্যু",
    group: "hereafter",
    keywords: {
      en: ["death", "die", "grave", "soul"],
      bn: ["মৃত্যু", "মরণ", "কবর", "রূহ"],
    },
    verses: ["3:185", "21:35", "39:30"],
  },
  {
    id: "good-behaviour",
    en: "Good Behaviour",
    bn: "সদাচরণ ও আদব",
    group: "character",
    keywords: {
      en: ["manners", "good conduct", "behaviour", "behavior", "respect", "character"],
      bn: ["আদব", "সদাচরণ", "ভদ্রতা", "সম্মান"],
    },
    verses: ["41:34", "23:96", "3:159", "13:22"],
  },
  {
    id: "trustworthiness",
    en: "Trustworthiness",
    bn: "আমানতদারিতা",
    group: "character",
    keywords: {
      en: ["trust", "trustworthy", "betray", "pledge", "promise"],
      bn: ["আমানত", "বিশ্বাস", "প্রতিশ্রুতি"],
    },
    verses: ["4:58", "8:27", "23:8"],
  },
  {
    id: "modesty",
    en: "Modesty",
    bn: "শালীনতা ও লজ্জা",
    group: "character",
    keywords: {
      en: ["modesty", "modest", "chastity", "guard their gaze"],
      bn: ["শালীনতা", "লজ্জা", "দৃষ্টি সংযত"],
    },
    verses: ["24:30", "24:31", "7:26"],
  },
  {
    id: "envy",
    en: "Envy",
    bn: "হিংসা",
    group: "character",
    keywords: {
      en: ["envy", "envier", "jealousy"],
      bn: ["হিংসা", "ঈর্ষা"],
    },
    verses: ["4:54", "113:5"],
  },
  {
    id: "moderation",
    en: "Moderation",
    bn: "পরিমিতি",
    group: "character",
    keywords: {
      en: ["moderation", "moderate", "excessive", "extravagance", "waste"],
      bn: ["পরিমিতি", "অপচয়", "সীমালঙ্ঘন"],
    },
    verses: ["7:31", "17:26", "25:67"],
  },
  {
    id: "contentment",
    en: "Contentment",
    bn: "সন্তুষ্টি",
    group: "heart",
    keywords: {
      en: ["contentment", "content", "satisfied", "worldly life"],
      bn: ["সন্তুষ্টি", "তৃপ্তি", "দুনিয়া"],
    },
    verses: ["20:131", "13:26", "28:60"],
  },
  {
    id: "brotherhood",
    en: "Brotherhood",
    bn: "ভ্রাতৃত্ব",
    group: "life",
    keywords: {
      en: ["brother", "brotherhood", "unity", "divided"],
      bn: ["ভ্রাতৃত্ব", "ঐক্য", "ভাই"],
    },
    verses: ["49:10", "3:103", "8:63"],
  },
  {
    id: "greeting",
    en: "Greetings (Salaam)",
    bn: "সালাম ও সম্ভাষণ",
    group: "life",
    keywords: {
      en: ["greeting", "greetings", "peace be upon you", "salaam"],
      bn: ["সালাম", "সম্ভাষণ", "অভিবাদন"],
    },
    verses: ["4:86", "24:61", "6:54"],
  },
  {
    id: "generosity",
    en: "Generosity",
    bn: "দানশীলতা",
    group: "life",
    keywords: {
      en: ["generous", "generosity", "spend in the way", "open-handed"],
      bn: ["দানশীলতা", "ব্যয়", "উদার"],
    },
    verses: ["3:92", "57:18", "2:274"],
  },
  {
    id: "relatives",
    en: "Relatives",
    bn: "আত্মীয়স্বজন",
    group: "life",
    keywords: {
      en: ["relatives", "kinship", "kindred", "family ties"],
      bn: ["আত্মীয়", "আত্মীয়তা", "জ্ঞাতি"],
    },
    verses: ["4:36", "2:83"],
  },
  {
    id: "animals",
    en: "Kindness to Animals",
    bn: "প্রাণীদের প্রতি দয়া",
    group: "life",
    keywords: {
      en: ["animal", "animals", "bird", "birds", "creature", "livestock"],
      bn: ["প্রাণী", "পাখি", "জীব"],
    },
    verses: ["6:38", "24:41", "16:5"],
  },
  {
    id: "cleanliness",
    en: "Cleanliness",
    bn: "পবিত্রতা ও পরিচ্ছন্নতা",
    group: "worship",
    keywords: {
      en: ["purity", "purify", "clean", "cleanliness"],
      bn: ["পবিত্রতা", "পরিচ্ছন্নতা", "পবিত্র"],
    },
    verses: ["2:222", "9:108", "74:4"],
  },
];

export function findCategory(id?: string | null): Category | undefined {
  if (!id) return undefined;
  return CATEGORIES.find((c) => c.id === id);
}

export function categoriesInGroup(group: CategoryGroupId): Category[] {
  return CATEGORIES.filter((c) => c.group === group);
}
