import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
  /** Decorative layer behind the content, e.g. an animated background. */
  background?: ReactNode
  children: ReactNode
}

export function Section({ id, eyebrow, title, subtitle, className, background, children }: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section id={id} className={['section', className].filter(Boolean).join(' ')} aria-labelledby={headingId}>
      {background && (
        <div className="section__background" aria-hidden="true">
          {background}
        </div>
      )}
      <div className="container">
        <header className="section__header">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="section__title">
            {title}
          </h2>
          {subtitle && <p className="section__subtitle">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
