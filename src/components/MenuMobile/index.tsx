import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Menu } from 'lucide-react'
import Link from 'next/link'

interface MenuMobileProps {
  links: {
    path: string
    label: string
  }[]
}

export function MenuMobile({ links }: MenuMobileProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="ml-auto md:hidden rounded w-10 h-10 bg-zinc-900 flex items-center justify-center focus:outline-0 focus:shadow-sm"
          type="button"
        >
          <Menu size={18} className="text-zinc-300" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-zinc-800 rounded p-6 border-2 border-zinc-700"
          sideOffset={5}
        >
          <DropdownMenu.Arrow className="fill-zinc-700" />

          <nav className="flex flex-col gap-3">
            {links.map((link) => {
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-sm transition-all duration-300 hover:text-zinc-300 flex items-center gap-2"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
