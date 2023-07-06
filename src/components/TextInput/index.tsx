import { InputHTMLAttributes, forwardRef } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string | undefined
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, ...props }: TextInputProps, ref) => {
    return (
      <div className="bg-zinc-900 border-2 border-transparent transition-colors duration-300 focus-within:border-zinc-100 rounded py-2 px-3 flex items-center text-zinc-100">
        <input
          id={id}
          ref={ref}
          {...props}
          className="bg-transparent w-full focus:outline-none placeholder:text-zinc-700"
        />
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'
