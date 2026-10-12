import type { AppLanguage } from "@/types";

export type Dict = Record<string, { en: string; bn: string }>;

export const dict = {
  appName: { en: "Ayah & Hadith", bn: "আয়াহ ও হাদিস" },
  tagline: {
    en: "Quran & Hadith, made beautiful.",
    bn: "কুরআন ও হাদিস, সুন্দরভাবে।",
  },

  nav_home: { en: "Home", bn: "হোম" },
  nav_quran: { en: "Quran", bn: "কুরআন" },
  nav_hadith: { en: "Hadith", bn: "হাদিস" },
  nav_favorites: { en: "Favorites", bn: "প্রিয়" },
  nav_search: { en: "Search", bn: "খুঁজুন" },
  nav_create: { en: "Create", bn: "তৈরি করুন" },
  nav_explore: { en: "Explore", bn: "বিষয়" },
  nav_dua: { en: "Du'a", bn: "দুআ" },

  dua_title: { en: "Du'as from the Qur'an", bn: "কুরআনের দুআ" },
  dua_sub: {
    en: "Authentic supplications, organised by what you need.",
    bn: "প্রয়োজন অনুযায়ী সাজানো প্রামাণিক দুআ।",
  },
  transliteration: { en: "Transliteration", bn: "উচ্চারণ" },
  whole_narration: { en: "Whole narration", bn: "সম্পূর্ণ বর্ণনা" },
  show_category: { en: "Show category", bn: "বিষয় দেখান" },
  duas: { en: "Du'as", bn: "দুআ" },
  quranic_dua: { en: "Qur'anic Du'a", bn: "কুরআনিক দুআ" },
  quranic_dua_sub: {
    en: "Supplications taken directly from the Qur'an.",
    bn: "সরাসরি কুরআন থেকে নেওয়া দুআ।",
  },
  general_dua: { en: "General Du'a", bn: "সাধারণ দুআ" },
  general_dua_sub: {
    en: "Everyday supplications from the Sunnah.",
    bn: "সুন্নাহ থেকে দৈনন্দিন দুআ।",
  },

  explore_title: { en: "Explore by theme", bn: "বিষয় অনুযায়ী খুঁজুন" },
  explore_sub: {
    en: "Find verses and hadith to share by theme — patience, mercy, gratitude and more.",
    bn: "শেয়ার করার জন্য বিষয় অনুযায়ী আয়াত ও হাদিস খুঁজুন — ধৈর্য, দয়া, কৃতজ্ঞতা ইত্যাদি।",
  },
  filter_categories: { en: "Search categories…", bn: "বিষয় খুঁজুন…" },
  featured: { en: "Featured", bn: "নির্বাচিত" },
  more_on_topic: { en: "More on this topic", bn: "এই বিষয়ে আরও" },
  shortest_first: {
    en: "Shortest narrations first (text is always shown complete).",
    bn: "ছোট হাদিস আগে (টেক্সট সর্বদা সম্পূর্ণ দেখানো হয়)।",
  },
  see_more: { en: "See more", bn: "আরও দেখুন" },
  categories: { en: "Categories", bn: "বিষয়সমূহ" },
  filters: { en: "Filters", bn: "ফিল্টার" },
  all_revelation: { en: "All", bn: "সব" },
  sort_by: { en: "Sort", bn: "সাজান" },
  sort_number: { en: "Surah no.", bn: "সূরা নম্বর" },
  sort_length: { en: "Shortest first", bn: "ছোট আগে" },
  quran_themes: { en: "Browse by theme", bn: "বিষয় অনুযায়ী" },

  hero_title: {
    en: "Create beautiful Quran & Hadith cards.",
    bn: "সুন্দর কুরআন ও হাদিস কার্ড তৈরি করুন।",
  },
  hero_sub: {
    en: "Discover authentic Islamic content and turn verses and Hadith into beautiful shareable cards.",
    bn: "প্রামাণিক ইসলামিক কনটেন্ট আবিষ্কার করুন এবং আয়াত ও হাদিসকে সুন্দর শেয়ারযোগ্য কার্ডে রূপ দিন।",
  },
  browse_quran: { en: "Browse Quran", bn: "কুরআন দেখুন" },
  browse_hadith: { en: "Browse Hadith", bn: "হাদিস দেখুন" },
  recent_content: { en: "Recent content", bn: "সাম্প্রতিক কনটেন্ট" },
  popular_topics: { en: "Popular topics", bn: "জনপ্রিয় বিষয়" },
  recently_used_templates: { en: "Recently used templates", bn: "সম্প্রতি ব্যবহৃত টেমপ্লেট" },
  recently_viewed: { en: "Recently viewed", bn: "সম্প্রতি দেখা" },
  see_all: { en: "See all", bn: "সব দেখুন" },

  quran_title: { en: "The Noble Quran", bn: "আল-কুরআন" },
  quran_sub: {
    en: "Browse by surah, juz, or search by keyword.",
    bn: "সূরা, জুজ অনুযায়ী ব্রাউজ করুন বা কীওয়ার্ড দিয়ে খুঁজুন।",
  },
  surahs: { en: "Surahs", bn: "সূরা" },
  juz: { en: "Juz", bn: "জুজ" },
  verses: { en: "verses", bn: "আয়াত" },
  verse: { en: "Verse", bn: "আয়াত" },
  surah: { en: "Surah", bn: "সূরা" },
  meccan: { en: "Meccan", bn: "মাক্কী" },
  medinan: { en: "Medinan", bn: "মাদানী" },

  hadith_title: { en: "Hadith", bn: "হাদিস" },
  hadith_sub: {
    en: "Authentic narrations by collection, chapter and topic.",
    bn: "সংগ্রহ, অধ্যায় ও বিষয় অনুযায়ী প্রামাণিক হাদিস।",
  },
  collections: { en: "Collections", bn: "সংগ্রহ" },
  topics: { en: "Topics", bn: "বিষয়" },
  chapters: { en: "Chapters", bn: "অধ্যায়" },
  chapter: { en: "Chapter", bn: "অধ্যায়" },
  book: { en: "Book", bn: "বই" },
  hadith: { en: "Hadith", bn: "হাদিস" },
  source: { en: "Source", bn: "সূত্র" },
  grade: { en: "Grade", bn: "মান" },
  all_chapters: { en: "All chapters", bn: "সব অধ্যায়" },

  create_photocard: { en: "Create Photocard", bn: "ফটোকাড তৈরি করুন" },
  back: { en: "Back", bn: "পেছনে" },
  read: { en: "Read", bn: "পড়ুন" },
  open: { en: "Open", bn: "খুলুন" },
  arabic: { en: "Arabic", bn: "আরবি" },
  english: { en: "English", bn: "ইংরেজি" },
  bangla: { en: "Bangla", bn: "বাংলা" },
  translation_unavailable: {
    en: "Translation unavailable",
    bn: "অনুবাদ উপলব্ধ নেই",
  },
  fallback_english: {
    en: "Bangla unavailable — showing English",
    bn: "বাংলা অনুবাদ নেই — ইংরেজি দেখানো হচ্ছে",
  },
  fallback_bangla: {
    en: "English unavailable — showing Bangla",
    bn: "ইংরেজি অনুবাদ নেই — বাংলা দেখানো হচ্ছে",
  },
  reference: { en: "Reference", bn: "রেফারেন্স" },
  show_reference: { en: "Show reference", bn: "রেফারেন্স দেখান" },
  show_book: { en: "Show book", bn: "বই দেখান" },
  show_chapter: { en: "Show chapter", bn: "অধ্যায় দেখান" },
  show_arabic: { en: "Show Arabic", bn: "আরবি দেখান" },
  show_translation: { en: "Show translation", bn: "অনুবাদ দেখান" },
  show_source: { en: "Show source", bn: "সূত্র দেখান" },

  editor_title: { en: "Photocard editor", bn: "ফটোকাড এডিটর" },
  editor_sub: {
    en: "Pick a template, tweak the details, and export.",
    bn: "একটি টেমপ্লেট বাছুন, সাজান, তারপর এক্সপোর্ট করুন।",
  },
  template: { en: "Template", bn: "টেমপ্লেট" },
  content: { en: "Content", bn: "কনটেন্ট" },
  text_style: { en: "Text style", bn: "টেক্সট স্টাইল" },
  metadata: { en: "Metadata", bn: "মেটাডেটা" },
  image: { en: "Image", bn: "ছবি" },
  format: { en: "Format", bn: "ফরম্যাট" },
  download: { en: "Download", bn: "ডাউনলোড" },
  upload_image: { en: "Upload image", bn: "ছবি আপলোড করুন" },
  remove_image: { en: "Remove image", bn: "ছবি সরান" },
  no_image: { en: "No image", bn: "ছবি নেই" },
  zoom: { en: "Zoom", bn: "জুম" },
  overlay: { en: "Overlay", bn: "ওভারলে" },
  opacity: { en: "Transparency", bn: "ট্রান্সপারেন্সি" },
  image_photo: { en: "As photo", bn: "ছবি হিসেবে" },
  image_background: { en: "As background", bn: "ব্যাকগ্রাউন্ড হিসেবে" },
  ai_background: { en: "AI background", bn: "AI ব্যাকগ্রাউন্ড" },
  ai_placeholder: {
    en: "Thematic background — e.g. calm desert dunes, a quiet forest, soft clouds, marble texture",
    bn: "থিমভিত্তিক ব্যাকগ্রাউন্ড — যেমন শান্ত মরুভূমি, নিভৃত বন, মেঘ, মার্বেল টেক্সচার",
  },
  ai_hint: {
    en: "Thematic backgrounds only — please avoid people, faces and portraits.",
    bn: "শুধু থিমভিত্তিক ব্যাকগ্রাউন্ড — মানুষ, মুখ বা পোর্ট্রেট এড়িয়ে চলুন।",
  },
  ai_blocked: {
    en: "That prompt isn't allowed. Please describe scenery, texture or architecture instead.",
    bn: "এই প্রম্পটটি অনুমোদিত নয়। অনুগ্রহ করে দৃশ্য, টেক্সচার বা স্থাপত্য বর্ণনা করুন।",
  },
  generate: { en: "Generate", bn: "তৈরি করুন" },
  regenerating: { en: "Generating…", bn: "তৈরি হচ্ছে…" },
  ai_failed: { en: "Couldn't generate. Try again.", bn: "তৈরি করা যায়নি। আবার চেষ্টা করুন।" },
  ai_from_text: { en: "From text", bn: "টেক্সট থেকে" },
  ai_no_people: {
    en: "People, faces and figures are never generated.",
    bn: "মানুষ, মুখ বা আকৃতি কখনো তৈরি হয় না।",
  },
  decor: { en: "Corner finish", bn: "কর্নার ফিনিশ" },
  logo: { en: "Logo", bn: "লোগো" },
  brand: { en: "Signature", bn: "সিগনেচার" },
  brand_placeholder: { en: "@yourhandle", bn: "@আপনারহ্যান্ডেল" },
  drag_hint: {
    en: "Drag to reposition the image.",
    bn: "ছবি সরাতে ড্র্যাগ করুন।",
  },
  portrait: { en: "Portrait", bn: "পোর্ট্রেট" },
  square: { en: "Square", bn: "স্কয়ার" },
  story: { en: "Story", bn: "স্টোরি" },
  palette: { en: "Colour", bn: "রঙ" },
  background: { en: "Background", bn: "ব্যাকগ্রাউন্ড" },
  custom_color: { en: "Custom", bn: "কাস্টম" },
  text_size: { en: "Text size", bn: "টেক্সট সাইজ" },
  overall_size: { en: "Overall", bn: "সামগ্রিক" },
  arabic_size: { en: "Arabic size", bn: "আরবি সাইজ" },
  translation_size: { en: "Translation size", bn: "অনুবাদ সাইজ" },
  suggested_palette: { en: "Suggested colour", bn: "প্রস্তাবিত রঙ" },
  copy_image: { en: "Copy image", bn: "ছবি কপি" },
  copied: { en: "Copied to clipboard", bn: "ক্লিপবোর্ডে কপি হয়েছে" },
  copy_failed: { en: "Copy failed — downloaded instead", bn: "কপি ব্যর্থ — ডাউনলোড হয়েছে" },
  copy_short: { en: "Copy", bn: "কপি" },
  share: { en: "Share", bn: "শেয়ার" },
  preview: { en: "Preview", bn: "প্রিভিউ" },
  close: { en: "Close", bn: "বন্ধ" },
  live_preview: { en: "Live preview", bn: "লাইভ প্রিভিউ" },
  share_hint: {
    en: "Copy or share the finished card directly.",
    bn: "তৈরি হওয়া কার্ড সরাসরি কপি বা শেয়ার করুন।",
  },
  download_png: { en: "Download PNG", bn: "PNG ডাউনলোড" },
  download_jpg: { en: "Download JPG", bn: "JPG ডাউনলোড" },
  exporting: { en: "Preparing image…", bn: "ছবি তৈরি হচ্ছে…" },
  export_failed: { en: "Couldn't export. Please try again.", bn: "এক্সপোর্ট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।" },

  text_too_long: {
    en: "This text is too long for this template. Try another template.",
    bn: "এই টেক্সট এই টেমপ্লেটের জন্য বেশি লম্বা। অন্য টেমপ্লেট চেষ্টা করুন।",
  },
  suggest_long_template: {
    en: "Suggested for long text:",
    bn: "লম্বা টেক্সটের জন্য প্রস্তাবিত:",
  },

  search_placeholder: {
    en: "Search Quran, Hadith, topics…",
    bn: "কুরআন, হাদিস, বিষয় খুঁজুন…",
  },
  search_all: { en: "All", bn: "সব" },
  ayah_number: { en: "Ayah no.", bn: "আয়াত নম্বর" },
  go_to_ayah: { en: "Go to ayah (surah:ayah)", bn: "আয়াতে যান (সূরা:আয়াত)" },
  hadith_number: { en: "Hadith no.", bn: "হাদিস নম্বর" },
  go: { en: "Go", bn: "যাও" },
  number_not_in_book: {
    en: "That number isn't available in this book.",
    bn: "এই নম্বরে এই কিতাবে কোনো হাদিস নেই।",
  },
  source_starts_at: {
    en: "The source has no text for earlier narrations, so this book starts at hadith",
    bn: "সূত্রে পূর্বের বর্ণনাগুলোর টেক্সট নেই, তাই এই কিতাব শুরু হয়েছে হাদিস",
  },
  search_by_word: { en: "Search by word", bn: "শব্দ দিয়ে খুঁজুন" },
  search_word_placeholder: {
    en: "Type a word — e.g. hair — to find ayahs & hadith",
    bn: "একটি শব্দ লিখুন — যেমন চুল — আয়াত ও হাদিস খুঁজতে",
  },
  search_results: { en: "Results", bn: "ফলাফল" },
  no_results: { en: "No results found", bn: "কোনো ফলাফল নেই" },
  try_another: {
    en: "Try a different keyword, or browse the collections.",
    bn: "অন্য কীওয়ার্ড চেষ্টা করুন, বা সংগ্রহ ব্রাউজ করুন।",
  },
  results_for: { en: "Results for", bn: "ফলাফল" },

  favorites_title: { en: "Favorites", bn: "প্রিয়" },
  favorites_empty: {
    en: "Nothing saved yet. Tap the bookmark on a verse or Hadith.",
    bn: "এখনো কিছু সংরক্ষিত নেই। আয়াত বা হাদিসে বুকমার্ক চাপুন।",
  },
  add_favorite: { en: "Save", bn: "সংরক্ষণ" },
  remove_favorite: { en: "Saved", bn: "সংরক্ষিত" },

  loading: { en: "Loading…", bn: "লোড হচ্ছে…" },
  error_title: { en: "Something went wrong", bn: "কিছু ভুল হয়েছে" },
  error_body: {
    en: "We couldn't load this content. Please check your connection and try again.",
    bn: "এই কনটেন্ট লোড করা যায়নি। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
  },
  retry: { en: "Try again", bn: "আবার চেষ্টা" },
  offline_cache: {
    en: "Showing saved copy (offline).",
    bn: "সংরক্ষিত কপি দেখানো হচ্ছে (অফলাইন)।",
  },
  empty_quran: { en: "No verses to display.", bn: "প্রদর্শনের জন্য কোন আয়াত নেই।" },

  topic_mentioning: {
    en: "Hadith mentioning",
    bn: "উল্লিখিত হাদিস",
  },
  topic_note: {
    en: "Results are narrations that mention this topic — not an authoritative classification.",
    bn: "ফলাফলগুলো এই বিষয় উল্লেখ করে—এটি প্রামাণিক শ্রেণিবিন্যাস নয়।",
  },

  footer_note: {
    en: "Please verify religious content against an authoritative source before sharing.",
    bn: "শেয়ার করার আগে অনুগ্রহ করে প্রামাণিক সূত্র থেকে যাচাই করুন।",
  },

  lang_en: { en: "English", bn: "English" },
  lang_bn: { en: "বাংলা", bn: "বাংলা" },
} as const satisfies Dict;

export type DictKey = keyof typeof dict;

export function translate(key: DictKey, lang: AppLanguage): string {
  return dict[key][lang];
}
