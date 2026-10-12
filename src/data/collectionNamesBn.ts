/** Bengali titles for hadith collections (bibliographic, supplied by us). */
export const COLLECTION_NAMES_BN: Record<string, string> = {
  bukhari: "সহিহ বুখারি",
  muslim: "সহিহ মুসলিম",
  abudawud: "সুনান আবু দাউদ",
  tirmidhi: "জামে' আত-তিরমিজি",
  nasai: "সুনান আন-নাসাই",
  ibnmajah: "সুনান ইবনে মাজাহ",
  malik: "মুয়াত্তা মালিক",
  nawawi: "আল-আরবাইন আন-নববী",
  qudsi: "আল-আহাদিস আল-কুদসি",
  dehlawi: "হুজ্জাতুল্লাহিল বালিগা",
};

export function collectionNameBn(id?: string): string | undefined {
  return id ? COLLECTION_NAMES_BN[id] : undefined;
}
