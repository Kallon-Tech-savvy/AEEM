import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold leading-none tracking-wide',
        variant === 'default' &&
          'border-aeem-gold/60 bg-aeem-gold/10 text-amber-900 dark:border-aeem-gold/40 dark:bg-aeem-gold/15 dark:text-aeem-gold-light',
        variant === 'success' &&
          'border-emerald-700/30 bg-emerald-50 text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-950/60 dark:text-emerald-200',
        variant === 'warning' &&
          'border-amber-700/30 bg-amber-50 text-amber-900 dark:border-amber-400/40 dark:bg-amber-950/60 dark:text-amber-200',
        variant === 'error' &&
          'border-red-700/30 bg-red-50 text-red-900 dark:border-red-400/40 dark:bg-red-950/60 dark:text-red-200',
        className,
      )}
      {...props}
    />
  )
}
