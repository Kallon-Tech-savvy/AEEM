import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-aeem-border bg-aeem-surface dark:border-aeem-dark-border dark:bg-aeem-dark-surface',
        interactive && 'transition-colors duration-150 hover:border-aeem-forest/50 hover:bg-aeem-forest-light dark:hover:border-aeem-gold/60 dark:hover:bg-white/[0.05]',
        className,
      )}
      {...props}
    />
  )
}
