import type { HTMLAttributes } from 'react'
import SpotlightCard from '../reactbits/SpotlightCard'

/** Glass card with the React Bits cursor spotlight, in the site's mint. */
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <SpotlightCard
      theme="dark"
      spotlightColor="#2fc4a6"
      intensity={0.16}
      spotlightSize={320}
      borderGlow={0.7}
      className={['card', className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}
