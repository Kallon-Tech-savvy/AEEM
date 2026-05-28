import type { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import '../../assets/styles/Forms.css'

type FormFieldProps = {
  label: string
  id: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  hint?: string
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  multiline?: boolean
  rows?: number
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'value' | 'onChange' | 'onBlur'> &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'value' | 'onChange' | 'onBlur'>
}

export function FormField({
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
  hint,
  type = 'text',
  placeholder,
  multiline = false,
  rows = 4,
  inputProps,
}: FormFieldProps) {
  const hasError = Boolean(error)
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = hasError ? `${id}-error` : undefined

  return (
    <label htmlFor={id} className='form-field'>
      <span className='form-field__label'>{label}</span>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-describedby={`${hintId ?? ''} ${errorId ?? ''}`.trim() || undefined}
          aria-invalid={hasError}
          className={`form-input ${hasError ? 'form-input--error' : 'form-input--valid'}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...(value !== undefined ? { value } : {})}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-describedby={`${hintId ?? ''} ${errorId ?? ''}`.trim() || undefined}
          aria-invalid={hasError}
          className={`form-input ${hasError ? 'form-input--error' : 'form-input--valid'}`}
          {...inputProps}
        />
      )}
      {hint ? <span id={hintId} className='input-hint'>{hint}</span> : null}
      {hasError ? <span id={errorId} className='error-message'>{error}</span> : null}
    </label>
  )
}
