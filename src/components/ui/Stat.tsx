import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  detail?: string
  source?: string
}

export function Stat({ value, label, detail, source, className, ...props }: StatProps) {
  return (
    <div className={cn('min-w-0', className)} {...props}>
      <div className='text-4xl font-bold tracking-tight text-aeem-ink dark:text-white sm:text-5xl'>
        {value}
      </div>
      <div className='mt-2 text-sm font-semibold text-aeem-ink dark:text-white'>
        {label}
      </div>
      {detail ? <p className='mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300'>{detail}</p> : null}
      {source ? <p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>{source}</p> : null}
    </div>
  )
}
