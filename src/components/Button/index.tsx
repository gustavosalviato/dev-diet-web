import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  text?: string
  variant: 'primary' | 'secondary' | 'tertiary'
  size: 'medium' | 'large'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, text, variant, size, className, ...props }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx('rounded-md font-semibold min-w-120 px-4 flex items-center justify-center gap-2 text-zinc-50 cursor-pointer transition-all duration-300', className, {
          'text-zinc-900 bg-zinc-100 hover:bg-zinc-100/80': variant === 'primary',
          'bg-zinc-900 border-2 border-zinc-700 hover:border-zinc-100': variant === 'secondary',
          'bg-transparent border-2 border-zinc-900 hover:bg-zinc-900 hover:border-gray-800 ': variant === 'tertiary',
          'h-9': size === 'medium',
          'h-12': size === 'large'
        })}
      >
        {icon}
        {text}
      </button>
    )
  },
)


Button.displayName = 'Button'