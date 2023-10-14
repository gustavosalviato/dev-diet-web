import * as RadixAvatar from '@radix-ui/react-avatar'
import { User } from 'lucide-react'

export function Avatar() {
  return (
    <RadixAvatar.Root className="rounded-full w-10 h-10 overflow-hidden">
      <RadixAvatar.AvatarFallback
        className="flex justify-center items-center rounded bg-zinc-900
        w-10 h-10"
      >
        <User />
      </RadixAvatar.AvatarFallback>
    </RadixAvatar.Root>
  )
}
