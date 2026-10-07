import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Divider({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('border-0 border-t border-gray-200 dark:border-white/10', className)} {...props} />
}
