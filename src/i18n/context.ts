import { createContext } from 'react'
import type { Direction, Language } from './config'
import type { InterpolationValues } from './interpolate'
import type { Dictionary } from './locales'

export interface LanguageContextValue {
  language: Language
  dir: Direction
  /** BCP 47 locale for the active language, for use with Intl APIs. */
  locale: string
  /** Typed dictionary for the active language: `t.nav.about`. */
  t: Dictionary
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  /** Fills `{tokens}` in a translated string. */
  format: (template: string, values: InterpolationValues) => string
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  formatDate: (value: Date | string, options?: Intl.DateTimeFormatOptions) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
