import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from './gsap'

/**
 * Smooth scrolling with Lenis, driven by GSAP's ticker so Lenis and
 * ScrollTrigger update in the same frame. Skipped for reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.1,
      // Smooth-scroll in-page links (#about, #contact…) and stop below the sticky header.
      anchors: { offset: -80 },
    })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
