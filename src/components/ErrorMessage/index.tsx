interface ErrorMessageProps {
  error: string | undefined
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className="mt-2 text-sm text-red-500 leading-tight">{error}</p>
}
