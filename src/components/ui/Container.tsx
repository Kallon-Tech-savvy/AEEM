import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean
}

export function Container({ className, narrow = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        narrow ? 'max-w-4xl' : 'max-w-7xl',
        className,
      )}
      {...props}
    />
  )
}
