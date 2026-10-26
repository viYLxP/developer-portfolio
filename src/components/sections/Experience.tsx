import { experience, type ExperienceConfig } from '../../config/profile'
import { useLanguage } from '../../i18n'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

const GROUPS: ExperienceConfig['group'][] = ['work', 'education']

export function Experience() {
  const { t, formatDate } = useLanguage()

  const period = ({ start, end, precision }: ExperienceConfig) => {
    const options = precision === 'year' ? ({ year: 'numeric' } as const) : ({ year: 'numeric', month: 'long' } as const)
    const from = formatDate(start, options)
    if (end === null) return `${from} – ${t.experience.present}`
    const to = formatDate(end, options)
    // Single dates (a graduation year, a one-day course) show once.
    return from === to ? from : `${from} – ${to}`
  }

  return (
    <Section id="experience" eyebrow={t.experience.eyebrow} title={t.experience.title}>
      <div className="experience__groups">
        {GROUPS.map((group) => (
          <div key={group} className="experience__group">
            <h3 className="experience__group-title">{t.experience.groups[group]}</h3>
            <ol className="timeline">
              <span className="timeline__progress" aria-hidden="true" />
              {experience
                .filter((entry) => entry.group === group)
                .map((entry) => {
                  const copy = t.experience.items[entry.id]
                  return (
                    <li key={entry.id} className="timeline__item">
                      <span className="timeline__dot" aria-hidden="true" />
                      <Card className="timeline__card">
                        <p className="timeline__period">
                          <time dateTime={entry.start}>{period(entry)}</time>
                        </p>
                        <h4 className="card__title">
                          <bdi>{copy.role}</bdi>
                        </h4>
                        <p className="timeline__organization">
                          <bdi>{copy.organization}</bdi>
                        </p>
                        <p className="card__text">{copy.description}</p>
                      </Card>
                    </li>
                  )
                })}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  )
}
