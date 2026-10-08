import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 dark:focus-visible:ring-offset-aeem-charcoal disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' && 'min-h-9 px-3.5 text-sm',
        size === 'md' && 'min-h-11 px-5 text-sm',
        size === 'lg' && 'min-h-12 px-6 text-base',
        variant === 'primary' &&
          'border-aeem-forest bg-aeem-forest text-white hover:border-aeem-forest-dark hover:bg-aeem-forest-dark dark:border-aeem-gold dark:bg-aeem-gold dark:text-aeem-charcoal dark:hover:border-amber-400 dark:hover:bg-amber-400',
        variant === 'secondary' &&
          'border-aeem-forest bg-transparent text-aeem-forest hover:bg-aeem-forest/5 dark:border-aeem-gold-light dark:text-aeem-gold-light dark:hover:bg-aeem-gold/10',
        variant === 'ghost' &&
          'border-transparent bg-transparent text-aeem-ink hover:bg-black/5 dark:text-white dark:hover:bg-white/10',
        className,
      )}
      {...props}
    />
  )
}
