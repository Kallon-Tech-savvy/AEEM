import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  detail?: string
  source?: string
  tone?: 'default' | 'inverse'
}

export function Stat({ value, label, detail, source, tone = 'default', className, ...props }: StatProps) {
  const inverse = tone === 'inverse'

  return (
    <div className={cn('min-w-0', className)} {...props}>
      <div className={cn(
        'text-4xl font-bold tracking-tight sm:text-5xl',
        inverse ? 'text-white' : 'text-aeem-ink dark:text-white',
      )}>
        {value}
      </div>
      <div className={cn(
        'mt-2 text-sm font-semibold',
        inverse ? 'text-white/85' : 'text-aeem-ink dark:text-white',
      )}>
        {label}
      </div>
      {detail ? (
        <p className={cn(
          'mt-1 text-sm leading-6',
          inverse ? 'text-white/70' : 'text-gray-600 dark:text-gray-300',
        )}>
          {detail}
        </p>
      ) : null}
      {source ? (
        <p className={cn(
          'mt-3 text-xs',
          inverse ? 'text-white/55' : 'text-gray-500 dark:text-gray-400',
        )}>
          {source}
        </p>
      ) : null}
    </div>
  )
}
