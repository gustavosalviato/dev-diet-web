import { Github, Salad } from 'lucide-react'
import Link from 'next/link'

import { MenuMobile } from '../DropDownMenu'

export function Header() {
  return (
    <div className="bg-zinc-800 w-full">
      <header className="max-w-7xl w-full mx-auto h-20 flex items-center px-4">
        <div className="flex items-center gap-2">
          <Salad size={24} fontWeight={'bold'} />
          <strong className="text-2xl font-bold leading-tight tracking-tighter">
            Dev Diet
          </strong>
        </div>

        <nav className="items-center ml-16 gap-6 hidden md:flex">
          <Link
            href="/panel"
            className="text-lg transition-all duration-300 hover:text-zinc-300"
          >
            Panel
          </Link>

          <Link
            href="/overview"
            className="text-lg transition-all duration-300 hover:text-zinc-300"
          >
            Overview
          </Link>

          <Link
            href="/"
            className="text-lg transition-all duration-300 hover:text-zinc-300"
          >
            Quick access
          </Link>
        </nav>

        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_ID}`}
          className="hidden ml-auto md:flex gap-2 bg-zinc-900 px-4 h-12 items-center justify-center rounded focus:outline-none focus:shadow-sm hover:bg-zinc-900/60 duration-300 transition-colors"
        >
          <Github />
          Sign in with Github
        </a>

        <MenuMobile />
      </header>
    </div>
  )
}
