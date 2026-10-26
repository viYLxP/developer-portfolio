import { useLanguage } from '../../i18n'
import { Icon, type IconName } from '../ui/Icon'
import { Section } from '../ui/Section'

export function About() {
  const { t } = useLanguage()

  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: 'mapPin', label: t.about.facts.location, value: t.profile.location },
    { icon: 'languages', label: t.about.facts.languages, value: t.about.factValues.languages },
    { icon: 'target', label: t.about.facts.focus, value: t.about.factValues.focus },
  ]

  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title} className="about">
      <div className="about__grid">
        <div className="about__text">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className="facts" aria-label={t.about.factsLabel}>
          {facts.map((fact) => (
            <div key={fact.label} className="facts__item">
              <Icon name={fact.icon} className="facts__icon" />
              <div>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
