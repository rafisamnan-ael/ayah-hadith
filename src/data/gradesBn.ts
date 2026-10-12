/** Bengali names for hadith authenticity grades (label only — never invented). */
export function gradeNameBn(grade?: string | null): string | undefined {
  if (!grade) return undefined;
  const g = grade.toLowerCase();
  if (g.includes("mawdu") || g.includes("fabricat")) return "জাল";
  if (g.includes("hasan") && g.includes("sahih")) return "হাসান সহিহ";
  if (g.includes("hasan")) return "হাসান";
  if (g.includes("sahih")) return "সহিহ";
  if (g.includes("da'if") || g.includes("daif") || g.includes("weak")) return "দুর্বল";
  if (g.includes("muttafaq")) return "মুত্তাফাকুন আলাইহি";
  return grade;
}
