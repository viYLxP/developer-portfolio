export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]
export type Direction = 'ltr' | 'rtl'

/** Used when nothing is saved and the browser language is not supported. */
export const DEFAULT_LANGUAGE: Language = 'en'

/** localStorage key. Keep in sync with the inline script in index.html. */
export const LANGUAGE_STORAGE_KEY = 'portfolio.language'

export interface LanguageMeta {
  /** Name of the language written in that language, e.g. "العربية". */
  nativeName: string
  dir: Direction
  /**
   * BCP 47 locale used for Intl formatting. Arabic uses the Gregorian
   * calendar explicitly because ar-SA defaults to the Hijri calendar.
   */
  locale: string
}

export const LANGUAGES: Record<Language, LanguageMeta> = {
  en: { nativeName: 'English', dir: 'ltr', locale: 'en-US' },
  ar: { nativeName: 'العربية', dir: 'rtl', locale: 'ar-SA-u-ca-gregory' },
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
}

function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return isLanguage(stored) ? stored : null
  } catch {
    // Storage can be blocked (private mode, strict privacy settings).
    return null
  }
}

export function storeLanguage(language: Language): void {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // Ignore: the choice still applies for this visit.
  }
}

/** Saved preference, then browser language, then DEFAULT_LANGUAGE. */
export function getInitialLanguage(): Language {
  const stored = readStoredLanguage()
  if (stored) return stored

  const browserLanguages = typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language]
  for (const tag of browserLanguages) {
    const base = tag?.toLowerCase().split('-')[0]
    if (isLanguage(base)) return base
  }
  return DEFAULT_LANGUAGE
}
