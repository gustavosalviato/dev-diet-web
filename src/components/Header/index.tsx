import { parseCookies } from 'nookies'
import { Salad } from 'lucide-react'
import Link from 'next/link'

import { MenuMobile } from '../DropDownMenu'
import { UseUser } from '@/hooks/auth/useUser'
import { Avatar } from '../Avatar'
import { useEffect, useState } from 'react'

export function Header() {
  const [isClient, setIsClient] = useState(false)
  const { '@devDiet': token } = parseCookies()

  const user = UseUser()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

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
            href="/"
            className="text-lg transition-all duration-300 hover:text-zinc-300"
          >
            Home
          </Link>

          <Link
            href="/panel"
            className="text-lg transition-all duration-300 hover:text-zinc-300"
          >
            Panel
          </Link>

          <Link
            href={`/overview/${user?.sub}`}
            className="text-lg transition-all duration-300 hover:text-zinc-300"
          >
            Overview
          </Link>
        </nav>

        {token && (
          <div className="flex ml-auto gap-2 items-center">
            <Avatar href={user?.avatarUrl!!} />
            <div className="flex flex-col">
              <p>{user?.name}</p>
              <a
                href="/api/auth/logout"
                className="hover:underline inline-block text-zinc-200 duration-300 transition-all mr-1 hover:text-red-300"
              >
                logout
              </a>
            </div>
          </div>
        )}

        {!token && (
          <div className="flex ml-auto gap-2 items-center">
            <Avatar href="" />
            <p className="text-sm">
              <Link
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_ID}`}
                className="inline-block text-zinc-200 duration-300 transition-all mr-1 hover:underline"
              >
                Create
              </Link>
              your account
            </p>
          </div>
        )}

        <MenuMobile />
      </header>
    </div>
  )
}
