import * as RadixAvatar from '@radix-ui/react-avatar'
import { User } from 'lucide-react'

interface AvatarProps {
  href: string
}

export function Avatar({ href }: AvatarProps) {
  return (
    <RadixAvatar.Root className="rounded-full w-10 h-10 overflow-hidden">
      <RadixAvatar.Image src={href} className="w-full h-full object-cover" />

      <RadixAvatar.AvatarFallback
        className="flex justify-center items-center rounded bg-zinc-900
        w-10 h-10"
      >
        <User />
      </RadixAvatar.AvatarFallback>
    </RadixAvatar.Root>
  )
}
