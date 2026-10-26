import { LANGUAGES, useLanguage } from '../../i18n'
import { Icon } from '../ui/Icon'

/**
 * One button that switches to the other language. The visible label is
 * written in the target language (with a matching lang attribute) so
 * speakers of that language can find it.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, t, format, toggleLanguage } = useLanguage()
  const target = language === 'en' ? 'ar' : 'en'
  const targetName = LANGUAGES[target].nativeName

  return (
    <button
      type="button"
      className={['language-switcher', className].filter(Boolean).join(' ')}
      onClick={toggleLanguage}
      aria-label={format(t.a11y.switchLanguage, { language: targetName })}
      data-testid="language-switcher"
    >
      <Icon name="globe" size={18} />
      <span lang={target} className="language-switcher__label">
        {targetName}
      </span>
    </button>
  )
}
