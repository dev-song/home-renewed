export const RESUME_MODE = {
  STANDARD: 'standard',
  INTERACTIVE: 'interactive',
} as const;
export type ResumeMode = (typeof RESUME_MODE)[keyof typeof RESUME_MODE];
