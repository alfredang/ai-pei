/** Original editorial artwork for the current journal. Custom CMS images take precedence. */
export const POST_HERO_IMAGES: Record<string, string> = {
  "higher-education-landscape-singapore": "/images/journal/higher-education-landscape-singapore.webp",
  "why-take-ai-certificate-course-singapore": "/images/journal/why-take-ai-certificate-course-singapore.webp",
  "new-cyber-security-threats-era-of-ai": "/images/journal/new-cyber-security-threats-era-of-ai.webp",
  "what-are-pei-courses-singapore": "/images/journal/what-are-pei-courses-singapore.webp",
  "private-education-institutions-adult-learning-singapore": "/images/journal/private-education-institutions-adult-learning-singapore.webp",
  "pei-diploma-vs-degree-pathways-singapore": "/images/journal/pei-diploma-vs-degree-pathways-singapore.webp",
  "working-adults-skills-based-courses-singapore": "/images/journal/working-adults-skills-based-courses-singapore.webp",
  "choose-right-pei-course-singapore": "/images/journal/choose-right-pei-course-singapore.webp",
  "wsq-professional-certificates-career-growth-singapore": "/images/journal/wsq-professional-certificates-career-growth-singapore.webp",
  "study-in-singapore-education-pathways": "/images/journal/study-in-singapore-education-pathways.webp",
};

export function postHeroImage(slug: string, storedImage?: string | null): string | null {
  // Replace legacy generated title cards while preserving custom editorial uploads.
  if (storedImage && !/\/blog\/ai-\d+-|^data:image\/svg/i.test(storedImage)) return storedImage;
  return POST_HERO_IMAGES[slug] ?? storedImage ?? null;
}
