import { motion, type HTMLMotionProps } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { type ReactNode } from 'react'
import { useReducedMotion } from '../../services/hooks'

type FieldProps = {
  label: string
  id: string
  error?: string
  children: ReactNode
}

export function FormField({ label, id, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  )
}

type FloatingInputProps = Omit<HTMLMotionProps<'input'>, 'onAnimationStart' | 'onAnimationEnd'> & {
  label: string
  id: string
  error?: string
}

export function FloatingInput({ label, id, error, className = '', ...props }: FloatingInputProps) {
  return (
    <FormField label={label} id={id} error={error}>
      <motion.input
        id={id}
        whileFocus={{ scale: 1.01, y: -1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`w-full text-aeem-charcoal dark:text-white bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 shadow-inner focus:outline-none focus:bg-white dark:focus:bg-black focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/30 transition-all placeholder:text-gray-400 font-medium ${className}`}
        {...props}
      />
    </FormField>
  )
}

type FloatingTextareaProps = Omit<HTMLMotionProps<'textarea'>, 'onAnimationStart' | 'onAnimationEnd'> & {
  label: string
  id: string
  error?: string
}

export function FloatingTextarea({ label, id, error, className = '', ...props }: FloatingTextareaProps) {
  return (
    <FormField label={label} id={id} error={error}>
      <motion.textarea
        id={id}
        whileFocus={{ scale: 1.01, y: -1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`w-full text-aeem-charcoal dark:text-white bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 shadow-inner focus:outline-none focus:bg-white dark:focus:bg-black focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/30 transition-all placeholder:text-gray-400 font-medium resize-none ${className}`}
        {...props}
      />
    </FormField>
  )
}

type SubmitButtonProps = {
  isSubmitting?: boolean
  submitted?: boolean
  children: ReactNode
  className?: string
}

export function SubmitButton({ isSubmitting = false, submitted = false, children, className = '' }: SubmitButtonProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.button
      type="submit"
      whileHover={reducedMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      disabled={isSubmitting}
      className={`w-full bg-gradient-to-r from-aeem-charcoal to-[#2a2d35] dark:from-aeem-gold dark:to-yellow-500 text-white py-5 rounded-2xl font-black text-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {isSubmitting ? <Loader2 className="animate-spin" /> : submitted ? <CheckCircle2 size={20} /> : null}
      {children}
    </motion.button>
  )
}
