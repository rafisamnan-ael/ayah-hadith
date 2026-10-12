import type { Dua, DuaCategory } from "@/types";

/**
 * Curated Qur'anic supplications, grouped by theme. Only the category/title and
 * the transliteration (a reading aid) are supplied here — the Arabic, English
 * and Bangla text always come live from the Qur'an API via the reference, so
 * nothing is fabricated.
 */
export const DUA_CATEGORIES: DuaCategory[] = [
  { id: "impossible", en: "Du'a for the Impossible", bn: "অসম্ভবের জন্য দুআ" },
  { id: "hardship", en: "Du'a for Hardship and Distress", bn: "কষ্ট ও বিপদের জন্য দুআ" },
  { id: "anxiety", en: "Du'a for Anxiety and Sorrow", bn: "দুশ্চিন্তা ও দুঃখের জন্য দুআ" },
  { id: "forgiveness", en: "Du'a for Forgiveness", bn: "ক্ষমার জন্য দুআ" },
  { id: "guidance", en: "Du'a for Guidance", bn: "হেদায়েতের জন্য দুআ" },
  { id: "protection", en: "Du'a for Protection", bn: "সুরক্ষার জন্য দুআ" },
  { id: "healing", en: "Du'a for Healing and Relief", bn: "শিফা ও আরোগ্যের জন্য দুআ" },
  { id: "provision", en: "Du'a for Provision (Rizq)", bn: "রিযিকের জন্য দুআ" },
  { id: "family", en: "Du'a for Family and Children", bn: "পরিবার ও সন্তানের জন্য দুআ" },
  { id: "parents", en: "Du'a for Parents", bn: "পিতা-মাতার জন্য দুআ" },
  { id: "knowledge", en: "Du'a for Knowledge", bn: "জ্ঞানের জন্য দুআ" },
  { id: "both-worlds", en: "Du'a for Good in Both Worlds", bn: "দুনিয়া ও আখিরাতের কল্যাণের জন্য দুআ" },
  { id: "acceptance", en: "Du'a for Acceptance of Deeds", bn: "আমলের কবুলের জন্য দুআ" },
  { id: "hereafter", en: "Du'a for the Hereafter and Light", bn: "আখিরাত ও নূরের জন্য দুআ" },
  { id: "believers", en: "Du'a for the Believers", bn: "মুমিনদের জন্য দুআ" },
  { id: "gratitude", en: "Du'a for Gratitude", bn: "কৃতজ্ঞতার জন্য দুআ" },
  { id: "reliance", en: "Du'a for Trust and Reliance", bn: "ভরসা ও তাওয়াক্কুলের জন্য দুআ" },
  { id: "honour", en: "Du'a for Honour and Sovereignty", bn: "সম্মান ও কর্তৃত্বের জন্য দুআ" },
  { id: "danger", en: "Du'a in Danger", bn: "বিপদে পড়লে দুআ" },
  { id: "enemy", en: "Du'a Against Oppression", bn: "নিপীড়নের বিরুদ্ধে দুআ" },
  { id: "exam", en: "Du'a for Exams and Study", bn: "পরীক্ষা ও পড়াশোনার জন্য দুআ" },
  { id: "job", en: "Du'a for Job and Livelihood", bn: "চাকরি ও জীবিকার জন্য দুআ" },
  { id: "speech", en: "Du'a for Speaking and Interviews", bn: "কথা বলা ও ইন্টারভিউয়ের জন্য দুআ" },
  { id: "travel", en: "Du'a for Travel", bn: "সফরের দুআ" },
  { id: "rain", en: "Du'a for Rain and Drought", bn: "বৃষ্টি ও খরার জন্য দুআ" },
  { id: "debt", en: "Du'a for Debt and Poverty", bn: "ঋণ ও দারিদ্র্যের জন্য দুআ" },
  { id: "victory", en: "Du'a for Success and Victory", bn: "সাফল্য ও বিজয়ের জন্য দুআ" },
  { id: "morning-evening", en: "Du'a for Morning and Evening", bn: "সকাল ও সন্ধ্যার দুআ" },
];

/** Looks up a Qur'anic du'a category by its id. */
export function getDuaCategory(id: string): DuaCategory | undefined {
  return DUA_CATEGORIES.find((c) => c.id === id);
}

export const DUAS: Dua[] = [
  {
    id: "impossible-1",
    category: "impossible",
    title: { en: "Du'a for the Impossible", bn: "অসম্ভবের জন্য দুআ" },
    transliteration:
      "Hasbiyallahu la ilaha illa Huwa, 'alayhi tawakkaltu, wa Huwa Rabbul-'Arshil-'Azim",
    surah: 9,
    ayah: 129,
  },
  {
    id: "impossible-2",
    category: "impossible",
    title: { en: "Allah is Sufficient", bn: "আল্লাহই যথেষ্ট" },
    transliteration: "Hasbunallahu wa ni'mal-wakil",
    surah: 3,
    ayah: 173,
  },
  {
    id: "hardship-1",
    category: "hardship",
    title: { en: "Du'a of Yunus (a.s.)", bn: "ইউনুস (আ.)-এর দুআ" },
    transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
    surah: 21,
    ayah: 87,
  },
  {
    id: "hardship-2",
    category: "hardship",
    title: { en: "For Patience & Victory", bn: "ধৈর্য ও বিজয়ের জন্য" },
    transliteration:
      "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    surah: 2,
    ayah: 250,
  },
  {
    id: "anxiety-1",
    category: "anxiety",
    title: { en: "To Open the Heart", bn: "হৃদয় প্রশস্ত করার জন্য" },
    transliteration: "Rabbi ishrah li sadri",
    surah: 20,
    ayah: 25,
  },
  {
    id: "anxiety-2",
    category: "anxiety",
    title: { en: "For Mercy & Forgiveness", bn: "দয়া ও ক্ষমার জন্য" },
    transliteration: "Rabbi ighfir warham wa anta khayrur-rahimin",
    surah: 23,
    ayah: 118,
  },
  {
    id: "forgiveness-1",
    category: "forgiveness",
    title: { en: "Du'a of Adam (a.s.)", bn: "আদম (আ.)-এর দুআ" },
    transliteration:
      "Rabbana zalamna anfusana wa il-lam taghfir lana wa tarhamna lanakunanna minal-khasirin",
    surah: 7,
    ayah: 23,
  },
  {
    id: "forgiveness-2",
    category: "forgiveness",
    title: { en: "Forgive Us Our Sins", bn: "আমাদের গুনাহ ক্ষমা করুন" },
    transliteration: "Rabbana innana amanna faghfir lana dhunubana wa qina 'adhaban-nar",
    surah: 3,
    ayah: 16,
  },
  {
    id: "forgiveness-3",
    category: "forgiveness",
    title: { en: "Forgive Our Sins & Excesses", bn: "গুনাহ ও বাড়াবাড়ি ক্ষমা করুন" },
    transliteration:
      "Rabbana ighfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    surah: 3,
    ayah: 147,
  },
  {
    id: "forgiveness-4",
    category: "forgiveness",
    title: { en: "Cover Our Faults", bn: "আমাদের দোষ ঢেকে দিন" },
    transliteration:
      "Rabbana innana sami'na munadiyan yunadi lil-imani an aminu birabbikum fa-amanna, Rabbana faghfir lana dhunubana wa kaffir 'anna sayyi'atina wa tawaffana ma'al-abrar",
    surah: 3,
    ayah: 193,
  },
  {
    id: "guidance-1",
    category: "guidance",
    title: { en: "Keep Our Hearts Firm", bn: "হৃদয়কে অবিচল রাখুন" },
    transliteration:
      "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmah, innaka antal-Wahhab",
    surah: 3,
    ayah: 8,
  },
  {
    id: "guidance-2",
    category: "guidance",
    title: { en: "Mercy & Right Guidance", bn: "দয়া ও সঠিক পথ" },
    transliteration:
      "Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada",
    surah: 18,
    ayah: 10,
  },
  {
    id: "guidance-3",
    category: "guidance",
    title: { en: "A Sound Entrance & Exit", bn: "শুভ প্রবেশ ও শুভ প্রস্থান" },
    transliteration:
      "Rabbi adkhilni mudkhala sidqin wa akhrijni mukhraja sidqin waj'al li min ladunka sultanan nasira",
    surah: 17,
    ayah: 80,
  },
  {
    id: "protection-1",
    category: "protection",
    title: { en: "Refuge from the Devils", bn: "শয়তানের কুমন্ত্রণা থেকে আশ্রয়" },
    transliteration: "Rabbi a'udhu bika min hamazatish-shayatin",
    surah: 23,
    ayah: 97,
  },
  {
    id: "healing-1",
    category: "healing",
    title: { en: "Du'a of Ayyub (a.s.)", bn: "আইয়ুব (আ.)-এর দুআ" },
    transliteration: "Rabbi inni massaniyad-durru wa anta arhamur-rahimin",
    surah: 21,
    ayah: 83,
  },
  {
    id: "provision-1",
    category: "provision",
    title: { en: "Du'a of Musa (a.s.)", bn: "মূসা (আ.)-এর দুআ" },
    transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir",
    surah: 28,
    ayah: 24,
  },
  {
    id: "family-1",
    category: "family",
    title: { en: "Righteous Family", bn: "সৎ পরিবার" },
    transliteration:
      "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    surah: 25,
    ayah: 74,
  },
  {
    id: "family-2",
    category: "family",
    title: { en: "Righteous Children", bn: "সৎ সন্তান" },
    transliteration: "Rabbi hab li minas-salihin",
    surah: 37,
    ayah: 100,
  },
  {
    id: "parents-1",
    category: "parents",
    title: { en: "For Parents & Believers", bn: "পিতা-মাতা ও মুমিনদের জন্য" },
    transliteration:
      "Rabbanaghfir li wa liwalidayya wa lil-mu'minina yawma yaqumul-hisab",
    surah: 14,
    ayah: 41,
  },
  {
    id: "parents-2",
    category: "parents",
    title: { en: "Forgive Me & My Parents", bn: "আমাকে ও আমার পিতা-মাতাকে ক্ষমা করুন" },
    transliteration:
      "Rabbighfir li wa liwalidayya wa liman dakhala baytiya mu'minan wa lil-mu'minina wal-mu'minat",
    surah: 71,
    ayah: 28,
  },
  {
    id: "knowledge-1",
    category: "knowledge",
    title: { en: "Increase Me in Knowledge", bn: "জ্ঞান বাড়িয়ে দিন" },
    transliteration: "Rabbi zidni 'ilma",
    surah: 20,
    ayah: 114,
  },
  {
    id: "both-worlds-1",
    category: "both-worlds",
    title: { en: "Good in Both Worlds", bn: "উভয় জগতের কল্যাণ" },
    transliteration:
      "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    surah: 2,
    ayah: 201,
  },
  {
    id: "acceptance-1",
    category: "acceptance",
    title: { en: "Accept From Us", bn: "আমাদের থেকে কবুল করুন" },
    transliteration: "Rabbana taqabbal minna innaka antas-Sami'ul-'Alim",
    surah: 2,
    ayah: 127,
  },
  {
    id: "acceptance-2",
    category: "acceptance",
    title: { en: "Make Me Steadfast in Prayer", bn: "নামাজে অবিচল করুন" },
    transliteration:
      "Rabbij-'alni muqimas-salati wa min dhurriyyati, Rabbana wa taqabbal du'a'",
    surah: 14,
    ayah: 40,
  },
  {
    id: "hereafter-1",
    category: "hereafter",
    title: { en: "Perfect Our Light", bn: "আমাদের নূর পূর্ণ করুন" },
    transliteration: "Rabbana atmim lana nurana waghfir lana, innaka 'ala kulli shay'in qadir",
    surah: 66,
    ayah: 8,
  },
  {
    id: "hereafter-2",
    category: "hereafter",
    title: { en: "Gardens of Eternity", bn: "স্থায়ী জান্নাত" },
    transliteration:
      "Rabbana wa adkhilhum jannati 'adnin allati wa'adtahum wa man salaha min aba'ihim wa azwajihim wa dhurriyyatihim, innaka antal-'Azizul-Hakim",
    surah: 40,
    ayah: 8,
  },
  {
    id: "believers-1",
    category: "believers",
    title: { en: "For Those Who Came Before", bn: "পূর্ববর্তীদের জন্য" },
    transliteration:
      "Rabbana ighfir lana wa li-ikhwanina alladhina sabaquna bil-imani wa la taj'al fi qulubina ghillan lilladhina amanu, Rabbana innaka Ra'ufur-Rahim",
    surah: 59,
    ayah: 10,
  },
  {
    id: "believers-2",
    category: "believers",
    title: { en: "Register Us Among the Witnesses", bn: "সাক্ষীদের অন্তর্ভুক্ত করুন" },
    transliteration:
      "Rabbana amanna bima anzalta wattaba'nar-rasula faktubna ma'ash-shahidin",
    surah: 3,
    ayah: 53,
  },
  {
    id: "believers-3",
    category: "believers",
    title: { en: "Forgive & Have Mercy", bn: "ক্ষমা করুন ও দয়া করুন" },
    transliteration:
      "Rabbana amanna faghfir lana warhamna wa anta khayrur-rahimin",
    surah: 23,
    ayah: 109,
  },
  {
    id: "hardship-3",
    category: "hardship",
    title: { en: "Beyond Our Capacity", bn: "আমাদের সামর্থ্যের বাইরে নয়" },
    transliteration:
      "Rabbana la tu'akhidhna in-nasina aw akhta'na, Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina, Rabbana wa la tuhammilna ma la taqata lana bih, wa'fu 'anna, waghfir lana, warhamna, anta mawlana fansurna 'alal-qawmil-kafirin",
    surah: 2,
    ayah: 286,
  },
  {
    id: "hardship-4",
    category: "hardship",
    title: { en: "Let Us Die as Muslims", bn: "মুসলিম হিসেবে মৃত্যু দিন" },
    transliteration: "Rabbana afrigh 'alayna sabran wa tawaffana muslimin",
    surah: 7,
    ayah: 126,
  },
  {
    id: "hardship-5",
    category: "hardship",
    title: { en: "My Bones Have Weakened", bn: "আমার হাড় দুর্বল হয়ে গেছে" },
    transliteration:
      "Rabbi inni wahanal-'azmu minni wash-ta'alar-ra'su shayban wa lam akun bidu'a'ika Rabbi shaqiyya",
    surah: 19,
    ayah: 4,
  },
  {
    id: "hardship-6",
    category: "hardship",
    title: { en: "Support Me Against Deniers", bn: "অস্বীকারকারীদের বিরুদ্ধে সাহায্য করুন" },
    transliteration: "Rabbi insurni bima kadhdhabun",
    surah: 23,
    ayah: 26,
  },
  {
    id: "forgiveness-5",
    category: "forgiveness",
    title: { en: "Du'a of Nuh (a.s.)", bn: "নূহ (আ.)-এর দুআ" },
    transliteration:
      "Rabbi inni a'udhu bika an as'alaka ma laysa li bihi 'ilm, wa illa taghfir li wa tarhamni akun minal-khasirin",
    surah: 11,
    ayah: 47,
  },
  {
    id: "guidance-4",
    category: "guidance",
    title: { en: "Reflection on Creation", bn: "সৃষ্টি নিয়ে চিন্তা" },
    transliteration:
      "Rabbana ma khalaqta hadha batilan, subhanaka faqina 'adhaban-nar",
    surah: 3,
    ayah: 191,
  },
  {
    id: "protection-3",
    category: "protection",
    title: { en: "Not With the Wrongdoers", bn: "জালিমদের সাথে নয়" },
    transliteration: "Rabbana la taj'alna ma'al-qawmiz-zalimin",
    surah: 7,
    ayah: 47,
  },
  {
    id: "protection-4",
    category: "protection",
    title: { en: "A House in Paradise", bn: "জান্নাতে একটি ঘর" },
    transliteration:
      "Rabbi ibni li 'indaka baytan fil-jannati wa najjini min Fir'awna wa 'amalihi wa najjini minal-qawmiz-zalimin",
    surah: 66,
    ayah: 11,
  },
  {
    id: "protection-5",
    category: "protection",
    title: { en: "Make This City Secure", bn: "এই নগরীকে নিরাপদ করুন" },
    transliteration:
      "Rabbi ij'al hadhal-balada aminan wajnubni wa baniyya an na'budal-asnam",
    surah: 14,
    ayah: 35,
  },
  {
    id: "family-3",
    category: "family",
    title: { en: "Good Offspring", bn: "সৎ সন্তান" },
    transliteration:
      "Rabbi hab li min ladunka dhurriyyatan tayyibah, innaka Sami'ud-du'a'",
    surah: 3,
    ayah: 38,
  },
  {
    id: "family-4",
    category: "family",
    title: { en: "Do Not Leave Me Alone", bn: "আমাকে একা রাখবেন না" },
    transliteration: "Rabbi la tadharni fardan wa anta khayrul-warithin",
    surah: 21,
    ayah: 89,
  },
  {
    id: "parents-3",
    category: "parents",
    title: { en: "Mercy for My Parents", bn: "পিতা-মাতার প্রতি দয়া" },
    transliteration: "Rabbirhamhuma kama rabbayani saghira",
    surah: 17,
    ayah: 24,
  },
  {
    id: "knowledge-2",
    category: "knowledge",
    title: { en: "We Have No Knowledge But Yours", bn: "আপনার দেওয়া জ্ঞান ছাড়া কিছু জানি না" },
    transliteration:
      "Subhanaka la 'ilma lana illa ma 'allamtana, innaka antal-'Alimul-Hakim",
    surah: 2,
    ayah: 32,
  },
  {
    id: "both-worlds-2",
    category: "both-worlds",
    title: { en: "Do Not Disgrace Us", bn: "আমাদের অপমানিত করবেন না" },
    transliteration:
      "Rabbana wa atina ma wa'adtana 'ala rusulika wa la tukhzina yawmal-qiyamah, innaka la tukhliful-mi'ad",
    surah: 3,
    ayah: 194,
  },
  {
    id: "both-worlds-3",
    category: "both-worlds",
    title: { en: "Du'a of Yusuf (a.s.)", bn: "ইউসুফ (আ.)-এর দুআ" },
    transliteration:
      "Rabbi qad ataytani minal-mulki wa 'allamtani min ta'wilil-ahadith, fatiras-samawati wal-ardi anta waliyyi fid-dunya wal-akhirah, tawaffani musliman wa alhiqni bis-salihin",
    surah: 12,
    ayah: 101,
  },
  {
    id: "acceptance-3",
    category: "acceptance",
    title: { en: "Make Us Submissive to You", bn: "আমাদের আত্মসমর্পণকারী বানান" },
    transliteration:
      "Rabbana waj'alna muslimayni laka wa min dhurriyyatina ummatan muslimatan laka, wa arina manasikana wa tub 'alayna, innaka antat-Tawwabur-Rahim",
    surah: 2,
    ayah: 128,
  },
  {
    id: "hereafter-3",
    category: "hereafter",
    title: { en: "Avert From Us the Fire", bn: "জাহান্নামের আযাব দূর করুন" },
    transliteration:
      "Rabbana isrif 'anna 'adhaba Jahannam, inna 'adhabaha kana gharama",
    surah: 25,
    ayah: 65,
  },
  {
    id: "reliance-1",
    category: "reliance",
    title: { en: "Do Not Make Us a Trial", bn: "আমাদের পরীক্ষার পাত্র বানাবেন না" },
    transliteration: "Rabbana la taj'alna fitnatan lil-qawmiz-zalimin",
    surah: 10,
    ayah: 85,
  },
  {
    id: "reliance-2",
    category: "reliance",
    title: { en: "Upon You We Rely", bn: "আপনার উপরই ভরসা" },
    transliteration:
      "Rabbana 'alayka tawakkalna wa ilayka anabna wa ilaykal-masir",
    surah: 60,
    ayah: 4,
  },
  {
    id: "gratitude-1",
    category: "gratitude",
    title: { en: "Du'a of Sulayman (a.s.)", bn: "সুলাইমান (আ.)-এর দুআ" },
    transliteration:
      "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa adkhilni birahmatika fi 'ibadikas-salihin",
    surah: 27,
    ayah: 19,
  },
  {
    id: "gratitude-2",
    category: "gratitude",
    title: { en: "Gratitude at Forty", bn: "চল্লিশে কৃতজ্ঞতা" },
    transliteration:
      "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa aslih li fi dhurriyyati, inni tubtu ilayka wa inni minal-muslimin",
    surah: 46,
    ayah: 15,
  },
  {
    id: "honour-1",
    category: "honour",
    title: { en: "Owner of All Sovereignty", bn: "সকল কর্তৃত্বের মালিক" },
    transliteration:
      "Qul Allahumma malikal-mulki tu'til-mulka man tasha'u wa tanzi'ul-mulka mimman tasha', wa tu'izzu man tasha'u wa tudhillu man tasha', biyadikal-khayr, innaka 'ala kulli shay'in qadir",
    surah: 3,
    ayah: 26,
  },
  {
    id: "danger-1",
    category: "danger",
    title: { en: "Du'a of Yunus (a.s.)", bn: "ইউনুস (আ.)-এর দুআ" },
    transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
    surah: 21,
    ayah: 87,
  },
  {
    id: "danger-2",
    category: "danger",
    title: { en: "Upon Allah We Rely", bn: "আল্লাহর উপরই ভরসা" },
    transliteration: "Rabbana la taj'alna fitnatan lil-qawmiz-zalimin",
    surah: 10,
    ayah: 85,
  },
  {
    id: "danger-3",
    category: "danger",
    title: { en: "Fear Not, I Am With You", bn: "ভয় করো না, আমি তোমাদের সাথে" },
    transliteration: "La takhafa innani ma'akuma asma'u wa ara",
    surah: 20,
    ayah: 46,
  },
  {
    id: "danger-4",
    category: "danger",
    title: { en: "Allah is Sufficient", bn: "আল্লাহই যথেষ্ট" },
    transliteration: "Hasbunallahu wa ni'mal-wakil",
    surah: 3,
    ayah: 173,
  },
  {
    id: "enemy-1",
    category: "enemy",
    title: { en: "Patience & Victory", bn: "ধৈর্য ও বিজয়" },
    transliteration:
      "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    surah: 2,
    ayah: 250,
  },
  {
    id: "enemy-2",
    category: "enemy",
    title: { en: "Support Me", bn: "আমাকে সাহায্য করুন" },
    transliteration: "Rabbi insurni bima kadhdhabun",
    surah: 23,
    ayah: 26,
  },
  {
    id: "enemy-3",
    category: "enemy",
    title: { en: "Not With the Wrongdoers", bn: "জালিমদের সাথে নয়" },
    transliteration: "Rabbana la taj'alna ma'al-qawmiz-zalimin",
    surah: 7,
    ayah: 47,
  },
  {
    id: "enemy-4",
    category: "enemy",
    title: { en: "Forgive & Steady Our Feet", bn: "ক্ষমা ও অবিচলতা" },
    transliteration:
      "Rabbana ighfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    surah: 3,
    ayah: 147,
  },
  {
    id: "exam-1",
    category: "exam",
    title: { en: "Increase Me in Knowledge", bn: "জ্ঞান বাড়িয়ে দিন" },
    transliteration: "Rabbi zidni 'ilma",
    surah: 20,
    ayah: 114,
  },
  {
    id: "exam-2",
    category: "exam",
    title: { en: "Expand My Chest", bn: "আমার বক্ষ প্রশস্ত করুন" },
    transliteration: "Rabbi ishrah li sadri",
    surah: 20,
    ayah: 25,
  },
  {
    id: "exam-3",
    category: "exam",
    title: { en: "Untie the Knot", bn: "জিহ্বার জড়তা দূর করুন" },
    transliteration: "Wahlul 'uqdatam min lisani",
    surah: 20,
    ayah: 27,
  },
  {
    id: "exam-4",
    category: "exam",
    title: { en: "Knowledge Comes From You", bn: "জ্ঞান আপনারই দেওয়া" },
    transliteration:
      "Subhanaka la 'ilma lana illa ma 'allamtana, innaka antal-'Alimul-Hakim",
    surah: 2,
    ayah: 32,
  },
  {
    id: "job-1",
    category: "job",
    title: { en: "In Need of Your Good", bn: "আপনার কল্যাণের মুখাপেক্ষী" },
    transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir",
    surah: 28,
    ayah: 24,
  },
  {
    id: "job-2",
    category: "job",
    title: { en: "He Will Provide", bn: "তিনিই রিযিক দেবেন" },
    transliteration:
      "Wa man yatawakkal 'alallahi fahuwa hasbuh, innallaha balighu amrih, qad ja'alallahu likulli shay'in qadra",
    surah: 65,
    ayah: 3,
  },
  {
    id: "job-3",
    category: "job",
    title: { en: "Owner of All Sovereignty", bn: "সকল কর্তৃত্বের মালিক" },
    transliteration:
      "Qul Allahumma malikal-mulki tu'til-mulka man tasha'u wa tanzi'ul-mulka mimman tasha', wa tu'izzu man tasha'u wa tudhillu man tasha', biyadikal-khayr, innaka 'ala kulli shay'in qadir",
    surah: 3,
    ayah: 26,
  },
  {
    id: "speech-1",
    category: "speech",
    title: { en: "Expand My Chest", bn: "আমার বক্ষ প্রশস্ত করুন" },
    transliteration: "Rabbi ishrah li sadri",
    surah: 20,
    ayah: 25,
  },
  {
    id: "speech-2",
    category: "speech",
    title: { en: "Untie the Knot", bn: "জিহ্বার জড়তা দূর করুন" },
    transliteration: "Wahlul 'uqdatam min lisani",
    surah: 20,
    ayah: 27,
  },
  {
    id: "speech-3",
    category: "speech",
    title: { en: "That They May Understand", bn: "যাতে তারা বুঝতে পারে" },
    transliteration: "Yafqahu qawli",
    surah: 20,
    ayah: 28,
  },
  {
    id: "travel-1",
    category: "travel",
    title: { en: "Upon Settling to Ride", bn: "যানে আরোহণের সময়" },
    transliteration:
      "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin",
    surah: 43,
    ayah: 13,
  },
  {
    id: "travel-2",
    category: "travel",
    title: { en: "To Our Lord We Return", bn: "আমরা প্রত্যাবর্তনকারী" },
    transliteration: "Wa inna ila Rabbina lamunqalibun",
    surah: 43,
    ayah: 14,
  },
  {
    id: "rain-1",
    category: "rain",
    title: { en: "Ask Forgiveness", bn: "ক্ষমা প্রার্থনা করুন" },
    transliteration: "Istaghfiru Rabbakum innahu kana ghaffara",
    surah: 71,
    ayah: 10,
  },
  {
    id: "rain-2",
    category: "rain",
    title: { en: "He Will Send Rain", bn: "তিনি বৃষ্টি পাঠাবেন" },
    transliteration: "Yursilis-sama'a 'alaykum midrara",
    surah: 71,
    ayah: 11,
  },
  {
    id: "rain-3",
    category: "rain",
    title: { en: "Wealth, Children & Gardens", bn: "ধন, সন্তান ও বাগান" },
    transliteration:
      "Wa yumdidkum bi-amwalin wa banina wa yaj'al lakum jannatin wa yaj'al lakum anhara",
    surah: 71,
    ayah: 12,
  },
  {
    id: "debt-1",
    category: "debt",
    title: { en: "Provide From Where Unexpected", bn: "অকল্পনীয় উৎস থেকে রিযিক" },
    transliteration:
      "Wa man yatawakkal 'alallahi fahuwa hasbuh, innallaha balighu amrih, qad ja'alallahu likulli shay'in qadra",
    surah: 65,
    ayah: 3,
  },
  {
    id: "debt-2",
    category: "debt",
    title: { en: "In Need of Your Good", bn: "আপনার কল্যাণের মুখাপেক্ষী" },
    transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir",
    surah: 28,
    ayah: 24,
  },
  {
    id: "debt-3",
    category: "debt",
    title: { en: "Beyond Our Capacity", bn: "সামর্থ্যের বাইরে নয়" },
    transliteration:
      "Rabbana la tu'akhidhna in-nasina aw akhta'na, Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina, Rabbana wa la tuhammilna ma la taqata lana bih, wa'fu 'anna, waghfir lana, warhamna, anta mawlana fansurna 'alal-qawmil-kafirin",
    surah: 2,
    ayah: 286,
  },
  {
    id: "victory-1",
    category: "victory",
    title: { en: "Patience & Firm Feet", bn: "ধৈর্য ও অবিচল পদ" },
    transliteration:
      "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    surah: 2,
    ayah: 250,
  },
  {
    id: "victory-2",
    category: "victory",
    title: { en: "Forgive & Grant Victory", bn: "ক্ষমা করুন ও বিজয় দিন" },
    transliteration:
      "Rabbana ighfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    surah: 3,
    ayah: 147,
  },
  {
    id: "victory-3",
    category: "victory",
    title: { en: "Persevere & Endure", bn: "ধৈর্য ধারণ করুন" },
    transliteration:
      "Ya ayyuhal-ladhina amanusbiru wa sabiru wa rabitu wattaqullaha la'allakum tuflihun",
    surah: 3,
    ayah: 200,
  },
  {
    id: "morning-evening-1",
    category: "morning-evening",
    title: { en: "Glorify at Evening & Morning", bn: "সন্ধ্যা ও সকালে পবিত্রতা" },
    transliteration: "Fa subhanallahi hina tumsuna wa hina tusbihun",
    surah: 30,
    ayah: 17,
  },
  {
    id: "morning-evening-2",
    category: "morning-evening",
    title: { en: "Praise at Night & Noon", bn: "রাত ও দুপুরে প্রশংসা" },
    transliteration:
      "Wa lahul-hamdu fis-samawati wal-ardi wa 'ashiyyan wa hina tuzhirun",
    surah: 30,
    ayah: 18,
  },
  {
    id: "morning-evening-3",
    category: "morning-evening",
    title: { en: "Hearts Find Rest", bn: "হৃদয় প্রশান্তি পায়" },
    transliteration: "Ala bi dhikrillahi tatma'innul-qulub",
    surah: 13,
    ayah: 28,
  },
];

export function findDuaCategory(id?: string | null): DuaCategory | undefined {
  if (!id) return undefined;
  return DUA_CATEGORIES.find((c) => c.id === id);
}

export function duasInCategory(id: string): Dua[] {
  return DUAS.filter((d) => d.category === id);
}
