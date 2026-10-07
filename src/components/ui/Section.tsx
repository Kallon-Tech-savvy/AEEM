import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Container, type ContainerProps } from './Container'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerClassName?: ContainerProps['className']
  containerNarrow?: boolean
  spacing?: 'compact' | 'default' | 'large'
}

export function Section({
  children,
  className,
  containerClassName,
  containerNarrow = false,
  spacing = 'default',
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        spacing === 'compact' && 'py-14 sm:py-20',
        spacing === 'default' && 'py-20 sm:py-24 lg:py-28',
        spacing === 'large' && 'py-24 sm:py-28 lg:py-32',
        className,
      )}
      {...props}
    >
      <Container narrow={containerNarrow} className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}
