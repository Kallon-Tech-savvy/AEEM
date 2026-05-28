import React from 'react';
type ButtonProps = {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  icon?: React.ReactNode;
  as?: 'button' | 'a';
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  icon,
  className = '',
  as = 'button',
  ...props
}) => {
  const baseStyles = 'button';
  const variants = {
    primary: 'button-primary',
    secondary: 'button-secondary',
  };
  const isDisabled = disabled || isLoading;
  const Component = as === 'a' ? 'a' : 'button';

  return (
    <Component
      {...props}
      disabled={Component === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled ? 'true' : undefined}
      className={`${baseStyles} ${variants[variant]} ${isDisabled ? 'button-disabled' : ''} ${className}`}
    >
      {isLoading ? (
        <svg className='button-loader' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <circle className='loader-ring' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
          <path fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
        </svg>
      ) : icon}
      <span>{isLoading ? 'Processing...' : children}</span>
    </Component>
  );
};
