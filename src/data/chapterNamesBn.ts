/**
 * Best-effort Bangla names for hadith chapter titles.
 *
 * The hadith source only provides chapter titles in English, so this maps the
 * common chapter themes to Bangla. It is bibliographic metadata (not scripture)
 * and always falls back to the original English title when unmatched.
 */
const TERMS: Array<[RegExp, string]> = [
  [/^revelation/i, "ওহি"],
  [/belief|faith\b|iimaan|iman/i, "ঈমান"],
  [/knowledge/i, "জ্ঞান"],
  [/wudu|ablution|purification|purity/i, "পবিত্রতা ও ওজু"],
  [/ghusl|bathing/i, "গোসল"],
  [/menstrual|menses|period/i, "হায়েজ"],
  [/tayammum|dust/i, "তায়াম্মুম"],
  [/times of the prayer|prayer times/i, "নামাজের সময়"],
  [/call to prayer|adhan|azan/i, "আজান"],
  [/friday/i, "জুমা"],
  [/fear prayer|prayer of fear/i, "ভয়ের নামাজ"],
  [/eid|two 'ids|'ids/i, "ঈদ"],
  [/eclipse/i, "সূর্যগ্রহণ ও চন্দ্রগ্রহণ"],
  [/rain|istisqa/i, "বৃষ্টির নামাজ"],
  [/qibla/i, "কিবলা"],
  [/qur'?an/i, "কুরআন"],
  [/funeral|burial|janazah|deceased|dead/i, "জানাজা"],
  [/zakat|alms|charity/i, "যাকাত"],
  [/fasting|fast|ramadan|saum/i, "রোজা"],
  [/i'?tikaf/i, "ইতিকাফ"],
  [/hajj|pilgrimage/i, "হজ্জ"],
  [/jihad|fighting|war|battle|combat/i, "জিহাদ"],
  [/vows|oaths|oath/i, "মানত ও শপথ"],
  [/sacrific|aqiqa|'aqiqa|slaughter/i, "কুরবানি"],
  [/hunting|game/i, "শিকার"],
  [/marriage|nikah|wedding|spouse/i, "বিবাহ"],
  [/divorce|talaq|li'?an|dhihar/i, "তালাক"],
  [/trade|sales|business|buying|selling/i, "ব্যবসা"],
  [/debt|loan/i, "ঋণ"],
  [/gift|gifts|hiba/i, "উপহার"],
  [/witness|testimony/i, "সাক্ষ্য"],
  [/peace|reconciliation/i, "শান্তি ও মীমাংসা"],
  [/inheritance|fara'?id/i, "উত্তরাধিকার"],
  [/will|wills|wasiyya|wills and testaments/i, "অছিয়ত"],
  [/jizya/i, "জিজিয়া"],
  [/water|irrigation/i, "পানি"],
  [/rent|hiring|wages|employees/i, "ভাড়া ও মজুরি"],
  [/medicine|patients|sick|illness/i, "চিকিৎসা ও রোগী"],
  [/invocation|supplication|du'?a|da'?wat/i, "দুআ"],
  [/manners|etiquette|behaviour|behavior|adab/i, "আদব"],
  [/clothing|dress/i, "পোশাক"],
  [/food|drink|meals|eating/i, "খাদ্য ও পানীয়"],
  [/virtues|merits|excellence/i, "মর্যাদা"],
  [/creation|creating/i, "সৃষ্টি"],
  [/prophets|prophet/i, "নবীগণ"],
  [/angels/i, "ফেরেশতা"],
  [/predestination|qadar|fate/i, "তাকদির"],
  [/heart|softening/i, "হৃদয়"],
  [/kindness|dutifulness|parents/i, "সদাচরণ ও পিতা-মাতা"],
  [/slaves|freedom|manumission/i, "দাস ও মুক্তি"],
  [/narrators|chain|mufarradun/i, "বর্ণনাকারী"],
  [/interpretation|tafsir|exegesis/i, "তাফসির"],
  [/afflictions|trials|fitan|tribulations/i, "ফিতনা ও পরীক্ষা"],
  [/judgments|rulings|ahkam/i, "বিচার-আহকাম"],
  [/wishes|desires|invocations/i, "কামনা"],
  [/news|information/i, "সংবাদ"],
  [/tricks|deceit|fraud/i, "প্রতারণা"],
  [/crimes|hudud|punishment/i, "অপরাধ ও শাস্তি"],
  [/apostates/i, "মুরতাদ"],
  [/blood money|diyat/i, "দিয়াত"],
  [/features of the prophet|description of the prophet/i, "নবীর বৈশিষ্ট্য"],
  [/conditions|contracts|terms/i, "চুক্তি ও শর্ত"],
  [/jokes|jest/i, "রসিকতা"],
  [/repentance/i, "তওবা"],
  [/patience/i, "ধৈর্য"],
  [/gratitude/i, "কৃতজ্ঞতা"],
  [/mercy/i, "দয়া"],
  [/prayer|salah|salat|prostration/i, "নামাজ"],
];

export function chapterNameBn(title?: string): string | undefined {
  if (!title) return undefined;
  for (const [re, bn] of TERMS) {
    if (re.test(title)) return bn;
  }
  return undefined;
}
