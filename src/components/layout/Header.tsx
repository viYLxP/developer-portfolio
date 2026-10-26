import { useEffect, useRef, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLanguage } from '../../i18n'
import { Icon } from '../ui/Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NAV_ITEMS } from './navItems'

export function Header() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const activeSection = useActiveSection(NAV_ITEMS)

  // Close the mobile menu with Escape and return focus to its button.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Close the mobile menu when the viewport grows to the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)')
    const onChange = () => desktop.matches && setMenuOpen(false)
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            {t.profile.initials}
          </span>
          <span className="brand__name">{t.profile.name}</span>
        </a>

        <nav id="site-nav" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label={t.a11y.mainNavigation}>
          <ul className="site-nav__list">
            {NAV_ITEMS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="site-nav__link"
                  aria-current={activeSection === id ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
            <span className="visually-hidden">{menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
