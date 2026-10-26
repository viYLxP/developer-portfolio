import { projects, type ProjectId } from '../../config/profile'
import { useLanguage } from '../../i18n'
import { ExternalLink } from '../ui/ExternalLink'
import { Icon, type IconName } from '../ui/Icon'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

const projectIcons: Record<ProjectId, IconName> = {
  portfolio: 'monitor',
  serviceCompany: 'briefcase',
  clientflow: 'layout',
  stockmate: 'database',
}

function ProjectLink({ href, label, icon }: { href: string | null; label: string; icon: 'external' | 'github' }) {
  const { t } = useLanguage()
  if (!href) {
    return (
      <span className="button button--ghost button--disabled" aria-disabled="true">
        <Icon name={icon} size={16} />
        {label}
        <span className="badge">{t.projects.linkNotConfigured}</span>
      </span>
    )
  }
  return (
    <ExternalLink href={href} className="button button--ghost">
      <Icon name={icon} size={16} />
      {label}
    </ExternalLink>
  )
}

export function Projects() {
  const { t, formatNumber } = useLanguage()

  return (
    <Section id="projects" eyebrow={t.projects.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle}>
      <div className="card-grid card-grid--2">
        {projects.map((project, index) => {
          const copy = t.projects.items[project.id]
          const headingId = `project-${project.id}`
          return (
            <Card key={project.id} className="project" role="article" aria-labelledby={headingId}>
              <div className="project__preview" aria-hidden="true">
                <span className="project__number">{formatNumber(index + 1, { minimumIntegerDigits: 2 })}</span>
                <Icon name={projectIcons[project.id]} size={40} />
              </div>
              <p className="project__category">{copy.category}</p>
              <h3 id={headingId} className="card__title">
                {copy.name}
              </h3>
              <p className="card__text">{copy.summary}</p>

              <h4 className="project__label">{t.projects.featuresLabel}</h4>
              <ul className="check-list">
                {copy.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

              <h4 className="project__label">{t.projects.techLabel}</h4>
              <ul className="tag-list">
                {project.tech.map((tech) => (
                  <li key={tech} className="tag tag--mono">
                    <bdi>{tech}</bdi>
                  </li>
                ))}
              </ul>

              <div className="project__links">
                <ProjectLink href={project.demoUrl} label={t.projects.liveDemo} icon="external" />
                <ProjectLink href={project.repoUrl} label={t.projects.sourceCode} icon="github" />
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
