import { sliceFromLocator } from "@/lib/textLocate";

/**
 * Du'a-only locators for Qur'anic supplications.
 *
 * Several curated du'as are quoted from an ayah that also contains a narrative
 * lead-in (e.g. "And when they went forth…, they said, …"). The transliteration
 * in `data/duas.ts` already covers only the supplication, so on the photocard we
 * start the Arabic / English / Bangla at the supplication too — keeping the card
 * focused on the du'a instead of mixing in narration.
 *
 * Each entry stores the opening words of the supplication in each language; the
 * shown text is a verbatim slice of the authoritative source cut at that point
 * (matched diacritic-insensitively, see `lib/textLocate`). Nothing is rewritten,
 * and if a locator is ever not found the full text is kept.
 *
 * Used only when a Qur'anic du'a is opened in the photocard editor; the reading
 * pages continue to show the complete ayah.
 *
 * Key format: "<surah>:<ayah>".
 */
export interface DuaOnlyLocators {
  ar?: string;
  en?: string;
  bn?: string;
}

export const DUA_ONLY_LOCATORS: Record<string, DuaOnlyLocators> = {
  "9:129": { ar: "حَسْبِىَ ٱللَّهُ", en: "Sufficient for me is Allah", bn: "আল্লাহই আমার জন্য যথেষ্ট" },
  "3:173": { ar: "حَسْبُنَا ٱللَّهُ", en: "Sufficient for us is Allah", bn: "আমাদের জন্য আল্লাহই যথেষ্ট" },
  "2:250": {
    ar: "رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْرًۭا",
    en: "Our Lord, pour upon us patience",
    bn: "হে আমাদের পালনকর্তা, আমাদের মনে ধৈর্য্য",
  },
  "7:126": {
    ar: "رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْرًۭا وَتَوَفَّنَا مُسْلِمِينَ",
    en: "Our Lord, pour upon us patience and let us die as Muslims",
    bn: "হে আমাদের পরওয়ারদেগার আমাদের জন্য ধৈর্য্যের দ্বার খুলে দাও",
  },
  "20:25": { ar: "رَبِّ ٱشْرَحْ لِى صَدْرِى", en: "My Lord, expand for me", bn: "হে আমার পালনকর্তা আমার বক্ষ প্রশস্ত" },
  "3:16": { ar: "رَبَّنَآ إِنَّنَآ ءَامَنَّا", en: "Our Lord, indeed we have believed", bn: "হে আমাদের পালনকর্তা, আমরা ঈমান এনেছি" },
  "3:147": {
    ar: "رَبَّنَا ٱغْفِرْ لَنَا ذُنُوبَنَا",
    en: "Our Lord, forgive us our sins",
    bn: "হে আমাদের পালনকর্তা! মোচন করে দাও আমাদের পাপ",
  },
  "23:118": { ar: "رَبِّ ٱغْفِرْ وَٱرْحَمْ", en: "My Lord, forgive and have mercy", bn: "হে আমার পালনকর্তা, ক্ষমা করুন ও রহম করুন" },
  "7:23": { ar: "رَبَّنَا ظَلَمْنَآ أَنفُسَنَا", en: "Our Lord, we have wronged ourselves", bn: "হে আমাদের পালনকর্তা আমরা নিজেদের প্রতি জুলম করেছি" },
  "3:8": { en: "Our Lord, let not our hearts deviate" },
  "18:10": {
    ar: "رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ",
    en: "Our Lord, grant us from Yourself mercy",
    bn: "হে আমাদের পালনকর্তা, আমাদেরকে নিজের কাছ থেকে রহমত দান করুন",
  },
  "23:97": {
    ar: "رَّبِّ أَعُوذُ بِكَ",
    en: "My Lord, I seek refuge in You from the incitements",
    bn: "হে আমার পালনকর্তা! আমি শয়তানের প্ররোচনা থেকে আপনার আশ্রয় প্রার্থনা করি",
  },
  "17:80": { ar: "رَّبِّ أَدْخِلْنِى مُدْخَلَ صِدْقٍ", en: "My Lord, cause me to enter a sound entrance", bn: "হে পালনকর্তা! আমাকে দাখিল করুন সত্যরূপে" },
  "21:83": { ar: "أَنِّى مَسَّنِىَ ٱلضُّرُّ", en: "Indeed, adversity has touched me", bn: "আমি দুঃখকষ্টে পতিত হয়েছি" },
  "28:24": { ar: "رَبِّ إِنِّى لِمَآ أَنزَلْتَ", en: "My Lord, indeed I am, for whatever good", bn: "হে আমার পালনকর্তা, তুমি আমার প্রতি যে অনুগ্রহ নাযিল করবে" },
  "25:74": {
    ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا",
    en: "Our Lord, grant us from among our wives",
    bn: "হে আমাদের পালনকর্তা, আমাদের স্ত্রীদের পক্ষ থেকে",
  },
  "20:114": { ar: "رَّبِّ زِدْنِى عِلْمًۭا", en: "My Lord, increase me in knowledge", bn: "হে আমার পালনকর্তা, আমার জ্ঞান বৃদ্ধি করুন" },
  "2:201": { ar: "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا", en: "Our Lord, give us in this world", bn: "হে পরওয়ারদেগার! আমাদিগকে দুনয়াতেও কল্যাণ দান কর" },
  "66:8": { ar: "رَبَّنَآ أَتْمِمْ لَنَا نُورَنَا", en: "Our Lord, perfect for us our light", bn: "হে আমাদের পালনকর্তা, আমাদের নূরকে পূর্ণ করে দিন" },
  "2:127": { ar: "رَبَّنَا تَقَبَّلْ مِنَّآ", en: "Our Lord, accept [this] from us", bn: "পরওয়ারদেগার! আমাদের থেকে কবুল কর" },
  "59:10": {
    ar: "رَبَّنَا ٱغْفِرْ لَنَا وَلِإِخْوَٰنِنَا",
    en: "Our Lord, forgive us and our brothers",
    bn: "হে আমাদের পালনকর্তা, আমাদেরকে এবং ঈমানে আগ্রহী",
  },
  "23:109": { ar: "رَبَّنَآ ءَامَنَّا فَٱغْفِرْ لَنَا", en: "Our Lord, we have believed, so forgive us", bn: "হে আমাদের পালনকর্তা! আমরা বিশ্বাস স্থাপন করেছি" },
  "2:286": { ar: "رَبَّنَا لَا تُؤَاخِذْنَآ", en: "Our Lord, do not impose blame upon us", bn: "হে আমাদের পালনকর্তা, যদি আমরা ভুলে যাই" },
  "19:4": { ar: "رَبِّ إِنِّى وَهَنَ ٱلْعَظْمُ", en: "My Lord, indeed my bones have weakened", bn: "হে আমার পালনকর্তা আমার অস্থি বয়স-ভারাবনত হয়েছে" },
  "23:26": { ar: "رَبِّ ٱنصُرْنِى بِمَا كَذَّبُونِ", en: "My Lord, support me because they have denied me", bn: "হে আমার পালনকর্তা, আমাকে সাহায্য কর" },
  "3:191": { ar: "رَبَّنَا مَا خَلَقْتَ هَٰذَا", en: "Our Lord, You did not create this aimlessly", bn: "পরওয়ারদেগার! এসব তুমি অনর্থক সৃষ্টি করনি" },
  "11:47": { ar: "رَبِّ إِنِّىٓ أَعُوذُ بِكَ", en: "My Lord, I seek refuge in You from asking", bn: "হে আমার পালনকর্তা আমার যা জানা নেই" },
  "66:11": { ar: "رَبِّ ٱبْنِ لِى عِندَكَ بَيْتًۭا", en: "My Lord, build for me near You a house", bn: "হে আমার পালনকর্তা! আপনার সন্নিকটে জান্নাতে" },
  "7:47": {
    ar: "رَبَّنَا لَا تَجْعَلْنَا مَعَ ٱلْقَوْمِ ٱلظَّٰلِمِينَ",
    en: "Our Lord, do not place us with the wrongdoing people",
    bn: "হে আমাদের প্রতিপালক, আমাদেরকে এ জালেমদের সাথী করো না",
  },
  "14:35": { ar: "رَبِّ ٱجْعَلْ هَٰذَا ٱلْبَلَدَ", en: "My Lord, make this city [Makkah] secure", bn: "হে পালনকর্তা, এ শহরকে শান্তিময় করে দিন" },
  "3:38": { ar: "رَبِّ هَبْ لِى مِن لَّدُنكَ ذُرِّيَّةًۭ", en: "My Lord, grant me from Yourself a good offspring", bn: "হে, আমার পালনকর্তা! তোমার নিকট থেকে আমাকে পুত-পবিত্র সন্তান দান কর" },
  "21:89": { ar: "رَبِّ لَا تَذَرْنِى فَرْدًۭا", en: "My Lord, do not leave me alone", bn: "হে আমার পালনকর্তা আমাকে একা রেখো না" },
  "2:32": { ar: "سُبْحَٰنَكَ لَا عِلْمَ لَنَآ", en: "Exalted are You; we have no knowledge", bn: "তুমি পবিত্র! আমরা কোন কিছুই জানি না" },
  "17:24": { ar: "رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى", en: "My Lord, have mercy upon them", bn: "হে পালনকর্তা, তাদের উভয়ের প্রতি রহম কর" },
  "25:65": {
    ar: "رَبَّنَا ٱصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ",
    en: "Our Lord, avert from us the punishment of Hell",
    bn: "হে আমার পালনকর্তা, আমাদের কাছথেকে জাহান্নামের শাস্তি হটিয়ে দাও",
  },
  "10:85": { ar: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةًۭ", en: "Our Lord, make us not [objects of] trial", bn: "হে আমাদের পালনকর্তা, আমাদের উপর এ জালেম কওমের শক্তি পরীক্ষা করিও না" },
  "60:4": { ar: "رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا", en: "Our Lord, upon You we have relied", bn: "হে আমাদের পালনকর্তা! আমরা তোমারই উপর ভরসা করেছি" },
  "27:19": { ar: "رَبِّ أَوْزِعْنِىٓ أَنْ أَشْكُرَ نِعْمَتَكَ", en: "My Lord, enable me to be grateful for Your favor", bn: "হে আমার পালনকর্তা, তুমি আমাকে" },
  "46:15": { ar: "رَبِّ أَوْزِعْنِىٓ أَنْ أَشْكُرَ نِعْمَتَكَ", en: "My Lord, enable me to be grateful for Your favor", bn: "হে আমার পালনকর্তা, আমাকে এরূপ ভাগ্য দান কর" },
  "43:13": { ar: "سُبْحَٰنَ ٱلَّذِى سَخَّرَ لَنَا هَٰذَا", en: "Exalted is He who has subjected this to us", bn: "পবিত্র তিনি, যিনি এদেরকে" },
  "13:28": { ar: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ", en: "Unquestionably, by the remembrance of Allah", bn: "জেনে রাখ, আল্লাহর যিকির দ্বারাই" },
  "20:46": { ar: "لَا تَخَافَآ", en: "Fear not. Indeed, I am with you both", bn: "তোমরা ভয় করো না" },
  "71:10": { ar: "ٱسْتَغْفِرُوا۟ رَبَّكُمْ", en: "Ask forgiveness of your Lord", bn: "তোমরা তোমাদের পালনকর্তার ক্ষমা প্রার্থনা কর" },
};

export function sliceDuaFrom(
  ref: string,
  fields: { arabic?: string; english?: string; bangla?: string },
): { arabic?: string; english?: string; bangla?: string } {
  const loc = DUA_ONLY_LOCATORS[ref];
  if (!loc) return fields;
  return {
    arabic: sliceFromLocator(fields.arabic, loc.ar),
    english: sliceFromLocator(fields.english, loc.en),
    bangla: sliceFromLocator(fields.bangla, loc.bn),
  };
}
