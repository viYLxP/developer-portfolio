import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../animation/gsap'
import { projects } from '../../config/profile'
import { SUPPORTED_LANGUAGES, useLanguage } from '../../i18n'
import BlurText from '../reactbits/BlurText'
import LightRays from '../reactbits/LightRays'
import Magnet from '../reactbits/Magnet'
import ShinyText from '../reactbits/ShinyText'
import StarBorder from '../reactbits/StarBorder'
import { Card } from '../ui/Card'
import { CountUp } from '../ui/CountUp'
import { Icon } from '../ui/Icon'

// Read once: the hero background and title are static for reduced motion.
const REDUCED_MOTION = prefersReducedMotion()

export function Hero() {
  const { t, formatNumber } = useLanguage()
  const rootRef = useRef<HTMLElement>(null)

  // Entrance: hero lines rise in one after another, then the card.
  useEffect(() => {
    const root = rootRef.current
    if (!root || REDUCED_MOTION) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-line]', { opacity: 0, y: 26, duration: 0.9, stagger: 0.09 }, 0.15)
        .from('[data-hero-card]', { opacity: 0, y: 40, scale: 0.96, duration: 1.1 }, 0.35)
    }, root)
    return () => ctx.revert()
  }, [])

  const stats = [
    { id: 'projects', value: projects.length, label: t.hero.stats.projects },
    { id: 'languages', value: SUPPORTED_LANGUAGES.length, label: t.hero.stats.languages },
    { id: 'directions', value: 2, label: t.hero.stats.directions },
  ]

  return (
    <section ref={rootRef} className="hero" aria-labelledby="hero-title">
      {!REDUCED_MOTION && (
        <div className="hero__rays" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="#7ee8d1"
            raysSpeed={0.6}
            lightSpread={0.8}
            rayLength={2.4}
            intensity={0.9}
            opacity={0.7}
            followMouse
            mouseInfluence={0.08}
            cursorShadow={false}
            clickPulse={false}
          />
        </div>
      )}
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__availability" data-hero-line>
            <span className="hero__pulse" aria-hidden="true" />
            <ShinyText text={t.hero.availability} color="#c9dbd6" shineColor="#7ee8d1" speed={3} delay={1.5} />
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__greeting" data-hero-line>
              {t.hero.greeting}
            </span>{' '}
            {REDUCED_MOTION ? (
              <span className="hero__name">{t.profile.name}</span>
            ) : (
              <BlurText as="span" className="hero__name" text={t.profile.name} trigger="load" delay={140} blur={10} distance={30} />
            )}
          </h1>
          <p className="hero__role" data-hero-line>
            {t.profile.role}
          </p>
          <p className="hero__headline" data-hero-line>
            {t.hero.headline}
          </p>
          <p className="hero__intro" data-hero-line>
            {t.hero.intro}
          </p>
          <div className="hero__actions" data-hero-line>
            <Magnet padding={60} magnetStrength={4} disabled={REDUCED_MOTION}>
              <StarBorder
                as="a"
                href="#projects"
                className="button button--primary hero__cta"
                radius={999}
                thickness={1.5}
                duration={5}
                glow={0.7}
                color="#e3b453"
                backgroundColor="#2fc4a6"
                textColor="#03110e"
                borderColor="rgb(255 255 255 / 25%)"
              >
                {t.hero.primaryCta}
                <Icon name="arrowForward" size={18} />
              </StarBorder>
            </Magnet>
            <Magnet padding={60} magnetStrength={4} disabled={REDUCED_MOTION}>
              <a href="#contact" className="button button--secondary">
                {t.hero.secondaryCta}
              </a>
            </Magnet>
          </div>
        </div>

        <aside className="hero__aside" aria-label={t.hero.statsLabel} data-hero-card>
          <Card className="hero__card">
            <div className="hero__avatar" aria-hidden="true">
              {t.profile.initials}
            </div>
            <p className="hero__location">
              <Icon name="mapPin" size={16} />
              {t.profile.location}
            </p>
            <dl className="hero__stats">
              {stats.map((stat) => (
                <div key={stat.id} className="hero__stat">
                  <dt>{stat.label}</dt>
                  <dd>
                    <CountUp to={stat.value} format={formatNumber} />
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </aside>
      </div>
      <span className="hero__scroll" aria-hidden="true" />
    </section>
  )
}
