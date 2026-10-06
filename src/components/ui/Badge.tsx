import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none',
        variant === 'default' && 'border-aeem-gold/50 bg-aeem-gold/10 text-aeem-gold-deep dark:text-aeem-gold-light',
        variant === 'success' && 'border-emerald-700/20 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-950/40 dark:text-emerald-300',
        variant === 'warning' && 'border-amber-700/20 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-950/40 dark:text-amber-300',
        variant === 'error' && 'border-red-700/20 bg-red-50 text-red-800 dark:border-red-400/30 dark:bg-red-950/40 dark:text-red-300',
        className,
      )}
      {...props}
    />
  )
}
