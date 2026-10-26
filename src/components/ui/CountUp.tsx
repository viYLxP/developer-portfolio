import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../animation/gsap'

interface CountUpProps {
  to: number
  /** Formats the value, so Arabic shows Arabic-Indic digits while counting. */
  format: (value: number) => string
  duration?: number
}

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, format, duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Starts at the final value: correct without animation and for reduced motion.
  const [value, setValue] = useState(to)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const counter = { value: 0 }
    setValue(0)
    const tween = gsap.to(counter, {
      value: to,
      duration,
      ease: 'power2.out',
      delay: 0.3,
      onUpdate: () => setValue(Math.round(counter.value)),
      scrollTrigger: { trigger: element, start: 'top bottom', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      setValue(to)
    }
  }, [to, duration])

  // Screen readers and crawlers get the final number, not the moving one.
  return (
    <span ref={ref}>
      <span aria-hidden="true">{format(value)}</span>
      <span className="visually-hidden">{format(to)}</span>
    </span>
  )
}
