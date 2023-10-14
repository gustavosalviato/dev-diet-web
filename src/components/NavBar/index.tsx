import Link from 'next/link'

interface NavBarProps {
  links: {
    path: string
    label: string
  }[]
}

export function NavBar({ links }: NavBarProps) {
  return (
    <nav className="items-center ml-16 gap-6 hidden md:flex">
      {links.map((item) => {
        return (
          <Link
            key={item.path}
            href={item.path}
            className="text-lg transition-all duration-300 hover:text-zinc-300"
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
