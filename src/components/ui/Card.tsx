import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.03]',
        interactive && 'transition-colors duration-150 hover:border-aeem-forest/40 hover:bg-aeem-forest/[0.02] dark:hover:border-aeem-gold/40 dark:hover:bg-white/[0.05]',
        className,
      )}
      {...props}
    />
  )
}
