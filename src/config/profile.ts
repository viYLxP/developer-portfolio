/**
 * Personal details and links that are the same in every language.
 * Translated text (name, role, descriptions) lives in src/i18n/locales.
 *
 * Every value set to `null` is shown on the site as "not configured".
 */
export const profile = {
  /** Used by the contact form (mailto:) and the email card. Example: 'you@example.com' */
  email: 'mtmtaswh77@gmail.com' as string | null,
  /** International format, digits only after '+'. Example: '+966500000000' */
  phone: '+966582878578' as string | null,
  linkedinUrl: 'https://www.linkedin.com/in/mahmoud-al-ahmadi-494526283' as string | null,
  githubUrl: 'https://github.com/viYLxP' as string | null,
  /**
   * Your CV as a PDF. Put the file in public/ (for example public/cv.pdf)
   * and set this to './cv.pdf'. null shows "CV coming soon".
   */
  cvUrl: './Mahmoud-Saeed-CV.pdf' as string | null,
}

export type ProjectId = 'portfolio' | 'serviceCompany' | 'clientflow' | 'stockmate'

export interface ProjectConfig {
  id: ProjectId
  tech: string[]
  /** Deployed URL, or null until it is published. */
  demoUrl: string | null
  /** Repository URL, or null until it is published. */
  repoUrl: string | null
}

export const projects: ProjectConfig[] = [
  {
    id: 'portfolio',
    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    demoUrl: 'https://developer-portfolio-two-omega.vercel.app',
    repoUrl: 'https://github.com/viYLxP/developer-portfolio',
  },
  { id: 'serviceCompany', tech: ['React', 'TypeScript', 'Vite'], demoUrl: null, repoUrl: null },
  { id: 'clientflow', tech: ['React', 'TypeScript', 'Vite', 'localStorage'], demoUrl: null, repoUrl: null },
  { id: 'stockmate', tech: ['React', 'TypeScript', 'Vite', 'localStorage'], demoUrl: null, repoUrl: null },
]

export type ExperienceId =
  | 'alRajhi'
  | 'ntg'
  | 'gulfInstitute'
  | 'khaleejInstitute'
  | 'reactNativeCourse'
  | 'javaCertificate'
  | 'bachelor'
  | 'diploma'

export interface ExperienceConfig {
  id: ExperienceId
  group: 'work' | 'education'
  /** ISO date (YYYY-MM-DD). */
  start: string
  /** ISO date, or null for "Present". */
  end: string | null
  /** 'year' when the CV gives only years, so months are not shown. */
  precision: 'month' | 'year'
}

/** Newest first within each group. Text lives in experience.items. */
export const experience: ExperienceConfig[] = [
  { id: 'alRajhi', group: 'work', start: '2025-02-01', end: '2026-01-31', precision: 'month' },
  { id: 'ntg', group: 'work', start: '2024-05-01', end: null, precision: 'month' },
  { id: 'gulfInstitute', group: 'work', start: '2021-01-01', end: '2022-01-01', precision: 'year' },
  { id: 'khaleejInstitute', group: 'work', start: '2020-01-01', end: '2020-01-01', precision: 'year' },
  { id: 'reactNativeCourse', group: 'education', start: '2025-04-22', end: '2025-04-22', precision: 'month' },
  { id: 'javaCertificate', group: 'education', start: '2024-10-01', end: '2024-11-30', precision: 'month' },
  { id: 'bachelor', group: 'education', start: '2024-01-01', end: '2024-01-01', precision: 'year' },
  { id: 'diploma', group: 'education', start: '2017-01-01', end: '2017-01-01', precision: 'year' },
]

/** Contact form limits, shared by validation and the character counter. */
export const contactLimits = {
  nameMin: 2,
  messageMin: 20,
  messageMax: 1000,
}
