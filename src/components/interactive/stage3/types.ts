export const STAGE3_INFO_TYPE = {
  HERO_ABOUT: 'hero_about',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EDUCATION_CERTIFICATES: 'education_certificates',
  CONTACT: 'contact',
} as const;

export type Stage3InfoType = (typeof STAGE3_INFO_TYPE)[keyof typeof STAGE3_INFO_TYPE];
