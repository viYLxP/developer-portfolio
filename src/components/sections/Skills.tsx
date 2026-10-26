import { useLanguage } from '../../i18n'
import { Icon, type IconName } from '../ui/Icon'
import { Section } from '../ui/Section'
import LogoLoop from '../reactbits/LogoLoop'
import { Card } from '../ui/Card'

const groupIcons: IconName[] = ['code', 'monitor', 'tool', 'database', 'briefcase']

export function Skills() {
  const { t, dir } = useLanguage()
  const allSkills = t.skills.groups.flatMap((group) => group.items)

  return (
    <Section id="skills" eyebrow={t.skills.eyebrow} title={t.skills.title} subtitle={t.skills.subtitle} className="section--alt">
      <LogoLoop
        className="skills-marquee"
        logos={allSkills.map((skill) => ({ node: <span className="skill-chip">{skill}</span>, title: skill }))}
        speed={40}
        direction={dir === 'rtl' ? 'right' : 'left'}
        logoHeight={44}
        gap={14}
        pauseOnHover
        fadeOut
        fadeOutColor="#081110"
        ariaLabel={t.skills.title}
        // The loop measures its track left to right; only the scroll direction follows the page.
        style={{ direction: 'ltr' }}
      />
      <div className="card-grid card-grid--4">
        {t.skills.groups.map((group, index) => (
          <Card key={group.title} className="skill-group">
            <span className="card__icon">
              <Icon name={groupIcons[index % groupIcons.length]} />
            </span>
            <h3 className="card__title">{group.title}</h3>
            <ul className="tag-list">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {/* Latin tech names inside Arabic text keep their own direction. */}
                  <bdi>{item}</bdi>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
