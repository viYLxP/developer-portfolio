import { profile } from '../../config/profile'
import { useLanguage } from '../../i18n'
import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

export function Cv() {
  const { t } = useLanguage()

  return (
    <Section
      id="cv"
      eyebrow={t.cv.eyebrow}
      title={t.cv.title}
      subtitle={t.cv.subtitle}
      className="section--aurora"
      background={
        // CSS-only aurora: the WebGL React Bits Aurora rendered white in Brave.
        <div className="aurora-glow">
          <span />
          <span />
          <span />
        </div>
      }
    >
      <Card className="cv-card">
        <span className="card__icon cv-card__icon">
          <Icon name="fileText" />
        </span>
        <div className="cv-card__body">
          <h3 className="card__title">{t.profile.name}</h3>
          <p className="card__text">
            {t.profile.role} · {t.cv.fileLabel}
          </p>
        </div>
        {profile.cvUrl ? (
          <a href={profile.cvUrl} download className="button button--primary">
            <Icon name="download" size={18} />
            {t.cv.download}
          </a>
        ) : (
          <span className="button button--secondary button--disabled" aria-disabled="true">
            <Icon name="download" size={18} />
            {t.cv.notConfigured}
          </span>
        )}
      </Card>
    </Section>
  )
}
