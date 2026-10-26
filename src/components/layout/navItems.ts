import type { Dictionary } from '../../i18n'

export type SectionId = keyof Dictionary['nav']

/** Page sections in display order; ids match the section elements. */
export const NAV_ITEMS: SectionId[] = ['about', 'skills', 'projects', 'services', 'experience', 'cv', 'contact']
