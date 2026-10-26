import { useLanguage } from '../../i18n'
import { Icon, type IconName } from '../ui/Icon'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

const serviceIcons: IconName[] = ['monitor', 'phone', 'database', 'languages']

export function Services() {
  const { t } = useLanguage()

  return (
    <Section id="services" eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} className="section--alt">
      <div className="card-grid card-grid--4">
        {t.services.items.map((service, index) => (
          <Card key={service.title} className="service">
            <span className="card__icon">
              <Icon name={serviceIcons[index % serviceIcons.length]} />
            </span>
            <h3 className="card__title">{service.title}</h3>
            <p className="card__text">{service.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
