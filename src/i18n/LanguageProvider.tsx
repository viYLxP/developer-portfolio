import { useCallback, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { getInitialLanguage, LANGUAGES, storeLanguage, type Language } from './config'
import { LanguageContext, type LanguageContextValue } from './context'
import { interpolate } from './interpolate'
import { dictionaries } from './locales'

function toDate(value: Date | string): Date {
  // Date-only strings ("2026-10-01") are parsed as UTC; read them as local dates.
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  return new Date(value)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    storeLanguage(next)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }, [language, setLanguage])

  const { dir, locale } = LANGUAGES[language]
  const t = dictionaries[language]

  // Keep <html lang/dir>, the title and the meta description in sync.
  // Layout effect so the direction flips in the same frame as the text.
  useLayoutEffect(() => {
    const root = document.documentElement
    root.lang = language
    root.dir = dir
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [language, dir, t])

  const value = useMemo<LanguageContextValue>(() => {
    const numberFormat = new Intl.NumberFormat(locale)
    return {
      language,
      dir,
      locale,
      t,
      setLanguage,
      toggleLanguage,
      format: interpolate,
      formatNumber: (number, options) =>
        options ? new Intl.NumberFormat(locale, options).format(number) : numberFormat.format(number),
      formatDate: (date, options) =>
        new Intl.DateTimeFormat(locale, options ?? { dateStyle: 'long' }).format(toDate(date)),
    }
  }, [language, dir, locale, t, setLanguage, toggleLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
