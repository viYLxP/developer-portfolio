import { useEffect } from 'react'
import { gsap, ScrollTrigger } from './gsap'

/**
 * Scroll-driven motion for the whole page, created once:
 * - section headings rise in, titles unmask from the bottom
 * - cards fade up in small staggered batches
 * - the experience timeline line fills as you scroll past it
 * - a thin progress bar tracks how far down the page you are
 * Only opacity, transforms and clip-path are animated, so content stays in
 * the accessibility tree. Nothing runs with prefers-reduced-motion.
 */
export function useScrollReveal(refreshKey: unknown) {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.section__header').forEach((header) => {
        const trigger = { trigger: header, start: 'top 88%', once: true }
        gsap.from(header.querySelectorAll('.eyebrow, .section__subtitle'), {
          opacity: 0,
          y: 18,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: trigger,
        })
        gsap.from(header.querySelector('.section__title'), {
          clipPath: 'inset(0 0 100% 0)',
          y: 30,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: trigger,
        })
      })

      const cards = gsap.utils.toArray<HTMLElement>('.section .card')
      gsap.set(cards, { opacity: 0, y: 36 })
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, overwrite: true }),
      })

      gsap.utils.toArray<HTMLElement>('.timeline__progress').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: line.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
          },
        )
      })

      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      })
    })

    return () => mm.revert()
  }, [])

  // Text length changes with the language, which moves every trigger point.
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [refreshKey])
}
