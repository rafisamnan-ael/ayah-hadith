export interface GeneralDuaCategory {
  id: string;
  en: string;
  bn: string;
}

export interface GeneralDua {
  id: string;
  category: string;
  /** Hadith Encyclopedia (hadeethenc.com) narration id. */
  ref: string;
  title: { en: string };
  /** English pronunciation (transliteration) of the supplication. */
  transliteration: string;
}

export const GENERAL_DUA_CATEGORIES: GeneralDuaCategory[] = [
  { id: "morning-evening", en: "Du'a for Morning and Evening", bn: "সকাল ও সন্ধ্যার দুআ" },
  { id: "timeless", en: "Du'a and Dhikr", bn: "দুআ ও যিকির" },
  { id: "daily-life", en: "Du'a for Daily Life", bn: "দৈনন্দিন জীবনের দুআ" },
  { id: "home-mosque", en: "Du'a for Home and Mosque", bn: "ঘর ও মসজিদের দুআ" },
  { id: "hard-times", en: "Du'a for Hard Times", bn: "কঠিন সময়ের দুআ" },
  { id: "occasions", en: "Du'a for Special Occasions", bn: "বিশেষ উপলক্ষের দুআ" },
  { id: "reported", en: "Reported Du'as", bn: "বর্ণিত দুআ" },
];

/** Looks up a general du'a category by its id. */
export function getGeneralDuaCategory(id: string): GeneralDuaCategory | undefined {
  return GENERAL_DUA_CATEGORIES.find((c) => c.id === id);
}

/**
 * Well-known supplications from the Sunnah. The reference id and English
 * pronunciation are supplied here; the Arabic, English and Bangla text,
 * attribution and grading are fetched live from the source API.
 */
export const GENERAL_DUAS: GeneralDua[] = [
  // Morning & Evening
  {
    id: "me-1",
    category: "morning-evening",
    ref: "5490",
    title: { en: "By You we reached the morning" },
    transliteration:
      "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur",
  },
  {
    id: "me-2",
    category: "morning-evening",
    ref: "6093",
    title: { en: "In the name of Allah, nothing harms" },
    transliteration:
      "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama', wa Huwas-Sami'ul-'Alim",
  },
  {
    id: "me-3",
    category: "morning-evening",
    ref: "5503",
    title: { en: "Sayyid al-Istighfar" },
    transliteration:
      "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta",
  },
  {
    id: "me-6",
    category: "morning-evening",
    ref: "3008",
    title: { en: "Evening remembrance" },
    transliteration:
      "Amsayna wa amsal-mulku lillah, wal-hamdulillah, la ilaha illallahu wahdahu la sharika lah",
  },

  // Timeless Dhikr
  {
    id: "tl-1",
    category: "timeless",
    ref: "3567",
    title: { en: "Best of dhikr & du'a" },
    transliteration:
      "Afdhaludh-dhikri la ilaha illallah, wa afdhalud-du'a'i alhamdulillah",
  },
  {
    id: "tl-2",
    category: "timeless",
    ref: "5475",
    title: { en: "Most beloved speech to Allah" },
    transliteration:
      "Ahabbul-kalami ilallahi arba': Subhanallah, wal-hamdulillah, wa la ilaha illallah, wallahu akbar",
  },
  {
    id: "tl-3",
    category: "timeless",
    ref: "5507",
    title: { en: "Two words light on the tongue" },
    transliteration:
      "Kalimatani khafifatani 'alal-lisan, thaqilatani fil-mizan, habibatani ir-Rahman: Subhanallahi wa bihamdihi, Subhanallahil-'Azim",
  },
  {
    id: "tl-4",
    category: "timeless",
    ref: "6211",
    title: { en: "SubhanAllah, Alhamdulillah…" },
    transliteration:
      "Subhanallah, wal-hamdulillah, wa la ilaha illallah, wallahu akbar",
  },
  {
    id: "tl-5",
    category: "timeless",
    ref: "65906",
    title: { en: "I am pleased with Allah" },
    transliteration:
      "Raditu billahi Rabban, wa bil-Islami dinan, wa bi Muhammadin rasulan",
  },

  // Daily Life
  {
    id: "dl-1",
    category: "daily-life",
    ref: "3504",
    title: { en: "Upon leaving the house" },
    transliteration:
      "Bismillahi, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
  },
  {
    id: "dl-2",
    category: "daily-life",
    ref: "5431",
    title: { en: "After eating" },
    transliteration:
      "Alhamdulillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
  },
  {
    id: "dl-4",
    category: "daily-life",
    ref: "10571",
    title: { en: "Entering the bathroom" },
    transliteration: "A'udhu billahi minal-khubthi wal-khaba'ith",
  },
  {
    id: "dl-5",
    category: "daily-life",
    ref: "5882",
    title: { en: "Food & provision" },
    transliteration:
      "Alhamdulillahil-ladhi at'amana wa saqana, wa kafana wa awana",
  },

  // Home & Mosque
  {
    id: "hm-2",
    category: "home-mosque",
    ref: "65092",
    title: { en: "Entering the mosque" },
    transliteration: "Allahummaftah li abwaba rahmatik",
  },
  {
    id: "hm-3",
    category: "home-mosque",
    ref: "8294",
    title: { en: "Seeking refuge when entering" },
    transliteration:
      "A'udhu billahil-'Azimi, wa biwajhihil-karim, wa sultanihil-qadim, minash-shaytanir-rajim",
  },

  // Hard Times
  {
    id: "ht-1",
    category: "hard-times",
    ref: "5141",
    title: { en: "In times of fear" },
    transliteration:
      "La ilaha illallahul-'Azimul-Halim, la ilaha illallahu Rabbul-'Arshil-'Azim, la ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim",
  },
  {
    id: "ht-2",
    category: "hard-times",
    ref: "5024",
    title: { en: "You are my Supporter" },
    transliteration:
      "Allahumma Anta 'adudi wa nasiri, bika ahul, wa bika asul, wa bika aqatil",
  },
  {
    id: "ht-3",
    category: "hard-times",
    ref: "5473",
    title: { en: "Seeking protection" },
    transliteration:
      "Allahumma inna naj'aluka fi nuhurihim, wa na'udhu bika min shururihim",
  },

  // Special Occasions
  {
    id: "oc-3",
    category: "occasions",
    ref: "5976",
    title: { en: "When the wind blows" },
    transliteration:
      "Allahumma inna nas'aluka min khayriha, wa khayri ma fiha, wa khayri ma ursilat bih, wa na'udhu bika min sharriha, wa sharri ma fiha, wa sharri ma ursilat bih",
  },
  {
    id: "oc-5",
    category: "occasions",
    ref: "6177",
    title: { en: "Sighting the new moon" },
    transliteration:
      "Allahumma ahillahu 'alayna bil-amni wal-iman, was-salamati wal-Islam, Rabbi wa Rabbuka Allah, hilalu rushdin wa khayr",
  },

  // Reported Supplications
  {
    id: "rp-1",
    category: "reported",
    ref: "3142",
    title: { en: "O Turner of the hearts" },
    transliteration: "Ya Muqallibal-qulub, thabbit qalbi 'ala dinik",
  },
  {
    id: "rp-2",
    category: "reported",
    ref: "5485",
    title: { en: "Well-being in both worlds" },
    transliteration:
      "Allahumma inni as'alukal-'afiyata fid-dunya wal-akhirah, Allahumma inni as'alukal-'afwa wal-'afiyah",
  },
  {
    id: "rp-3",
    category: "reported",
    ref: "5329",
    title: { en: "Refuge from bad character" },
    transliteration:
      "Allahumma inni a'udhu bika min munkaratil-akhlaqi wal-a'mali wal-ahwa'",
  },
  {
    id: "rp-4",
    category: "reported",
    ref: "5915",
    title: { en: "Guide me to the straight path" },
    transliteration: "Allahumma ihdini wa saddidni",
  },
  {
    id: "rp-6",
    category: "reported",
    ref: "5482",
    title: { en: "Set right my religion" },
    transliteration:
      "Allahumma aslih li diniyal-ladhi huwa 'ismatu amri, wa aslih li dunyayal-lati fiha ma'ashi, wa aslih li akhirati",
  },
  {
    id: "tl-6",
    category: "timeless",
    ref: "5477",
    title: { en: "The lasting good deeds" },
    transliteration:
      "Al-baqiyatus-salihat: La ilaha illallah, wa Subhanallah, wallahu akbar, walhamdulillah, wa la hawla wa la quwwata illa billah",
  },
  {
    id: "tl-7",
    category: "timeless",
    ref: "6112",
    title: { en: "There is no god but Allah, alone" },
    transliteration:
      "La ilaha illallahu wahdahu la sharika lah, Allahu akbar kabira, wal-hamdulillahi kathira, subhanallahi Rabbil-'alamin, la hawla wa la quwwata illa billahil-'Azizil-Hakim",
  },
  {
    id: "tl-8",
    category: "timeless",
    ref: "3167",
    title: { en: "O Possessor of Majesty and Bounty" },
    transliteration: "Ya Dhal-Jalali wal-Ikram",
  },
  {
    id: "dl-6",
    category: "daily-life",
    ref: "6034",
    title: { en: "Before sleeping" },
    transliteration:
      "Bismika Rabbi wada'tu janbi, wa bika arfa'uhu, in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-salihin",
  },
  {
    id: "dl-7",
    category: "daily-life",
    ref: "4828",
    title: { en: "Praise after eating" },
    transliteration:
      "Alhamdulillahi hamdan kathiran tayyiban mubarakan fihi, ghayra makfiyyin wa la muwadda'in wa la mustaghnan 'anhu Rabbana",
  },
  {
    id: "ht-4",
    category: "hard-times",
    ref: "5489",
    title: { en: "Refuge from debt & enemies" },
    transliteration:
      "Allahumma inni a'udhu bika min ghalabatid-dayni, wa ghalabatil-'aduwwi, wa shamatatil-a'da'",
  },
  {
    id: "rp-7",
    category: "reported",
    ref: "5483",
    title: { en: "Forgive my every sin" },
    transliteration:
      "Rabbi-ghfir li khati'ati wa jahli wa israfi fi amri kullihi, wa ma anta a'lamu bihi minni. Allahummaghfir li khata yaya wa 'amdi wa jahli wa hazli, wa kulla dhalika 'indi. Allahummaghfir li ma qaddamtu wa ma akhkhartu, wa ma asrartu wa ma a'lantu, antal-Muqaddimu wa antal-Mu'akhkhiru, wa anta 'ala kulli shay'in qadir",
  },
  {
    id: "rp-8",
    category: "reported",
    ref: "5487",
    title: { en: "All that is good" },
    transliteration:
      "Allahumma inni as'aluka minal-khayri kullihi, 'ajilihi wa ajilihi, ma 'alimtu minhu wa ma lam a'lam, wa a'udhu bika minash-sharri kullihi, 'ajilihi wa ajilihi, ma 'alimtu minhu wa ma lam a'lam. Allahumma inni as'aluka minal-khayri ma sa'alaka 'abduka wa nabiyyuka, wa a'udhu bika min sharri ma 'adha bihi 'abduka wa nabiyyuka. Allahumma inni as'alukal-jannata wa ma qarraba ilayha min qawlin aw 'amal, wa a'udhu bika minan-nari wa ma qarraba ilayha min qawlin aw 'amal, wa as'aluka an taj'ala kulla qada'in qadaytahu li khayra",
  },
  {
    id: "rp-9",
    category: "reported",
    ref: "5488",
    title: { en: "Steadfast blessings" },
    transliteration:
      "Allahumma inni a'udhu bika min zawali ni'matika, wa tahawwuli 'afiyatika, wa fuja'ati niqmatika, wa jami'i sakhatik",
  },
  {
    id: "rp-10",
    category: "reported",
    ref: "5491",
    title: { en: "Beautify my character" },
    transliteration:
      "Allahumma kama hassanta khalqi fahassin khuluqi",
  },
  {
    id: "rp-11",
    category: "reported",
    ref: "5878",
    title: { en: "Refuge from weakness & laziness" },
    transliteration:
      "Allahumma inni a'udhu bika minal-'ajzi wal-kasali wal-jubni wal-bukhli wal-harami wa 'adhabil-qabr. Allahumma ati nafsi taqwaha, wa zakkiha anta khayru man zakkaha, anta waliyyuha wa mawlaha. Allahumma inni a'udhu bika min 'ilmin la yanfa', wa min qalbin la yakhsha', wa min nafsin la tashba', wa min da'watin la yustajabu laha",
  },
  {
    id: "rp-12",
    category: "reported",
    ref: "5883",
    title: { en: "Refuge from hunger & treachery" },
    transliteration:
      "Allahumma inni a'udhu bika minal-ju', fa innahu bi'sad-daji', wa a'udhu bika minal-khiyanati, fa innaha bi'satil-bitana",
  },
  {
    id: "rp-13",
    category: "reported",
    ref: "5884",
    title: { en: "Suffice me with the lawful" },
    transliteration:
      "Allahumma-kfini bihalalika 'an haramik, wa aghnini bifadlika 'amman siwak",
  },
  {
    id: "rp-14",
    category: "reported",
    ref: "6047",
    title: { en: "Refuge from evil diseases" },
    transliteration:
      "Allahumma inni a'udhu bika minal-barasi, wal-jununi, wal-judhami, wa sayyi'il-asqam",
  },
  {
    id: "rp-15",
    category: "reported",
    ref: "6335",
    title: { en: "Lord of the Magnificent Throne" },
    transliteration:
      "Allahumma Rabba-samawati wa Rabbal-ardi wa Rabbal-'Arshil-'Azim, Rabbana wa Rabba kulli shay', faliqal-habbi wan-nawa, munzilat-Tawrati wal-Injili wal-Furqan, a'udhu bika min sharri kulli shay'in anta akhidhun binasiyatih. Allahumma antal-Awwalu fa laysa qablaka shay', wa antal-Akhiru fa laysa ba'daka shay', wa antaz-Zahiru fa laysa fawqaka shay', wa antal-Batinu fa laysa dunaka shay', iqdi 'annad-dayna wa aghnina minal-faqr",
  },
];

export function findGeneralDuaCategory(id?: string | null) {
  if (!id) return undefined;
  return GENERAL_DUA_CATEGORIES.find((c) => c.id === id);
}

export function generalDuasInCategory(id: string): GeneralDua[] {
  return GENERAL_DUAS.filter((d) => d.category === id);
}
