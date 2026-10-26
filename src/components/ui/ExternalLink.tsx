import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useLanguage } from '../../i18n'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

/** Link that opens in a new tab and tells screen reader users so. */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  const { t } = useLanguage()
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> {t.a11y.opensInNewTab}</span>
    </a>
  )
}
