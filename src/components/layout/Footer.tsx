import { useLanguage } from '../../i18n'
import { Icon } from '../ui/Icon'
import { NAV_ITEMS } from './navItems'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const { t, format, formatNumber, formatDate } = useLanguage()
  const year = formatNumber(CURRENT_YEAR, { useGrouping: false })

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__about">
          <p className="site-footer__name">{t.profile.name}</p>
          <p className="site-footer__tagline">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.a11y.footerNavigation} className="site-footer__nav">
          <ul>
            {NAV_ITEMS.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__meta">
          <p>{format(t.footer.rights, { year, name: t.profile.name })}</p>
          <p>{t.footer.builtWith}</p>
          <p>
            {format(t.footer.lastUpdated, {
              date: formatDate(__BUILD_DATE__, { year: 'numeric', month: 'long', day: 'numeric' }),
            })}
          </p>
          <a href="#top" className="back-to-top">
            <Icon name="arrowUp" size={16} />
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
