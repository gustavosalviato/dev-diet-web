import { Salad } from 'lucide-react'
import Link from 'next/link'

import { MenuMobile } from '../MenuMobile'
import { Avatar } from '../Avatar'
import { useEffect, useState } from 'react'
import { signOut, useAuthContext } from '@/context/authContext'
import { NavBar } from '../NavBar'

export function Header() {
  const [isClient, setIsClient] = useState(false)

  const { isAuthenticated, user } = useAuthContext()

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

        <NavBar
          links={[
            {
              label: 'Home',
              path: '/',
            },
            {
              label: 'Panel',
              path: '/panel',
            },

            {
              label: 'Overview',
              path: '/overview',
            },
          ]}
        />

        {isAuthenticated && (
          <div className="flex ml-auto gap-2 items-center">
            <Avatar />
            <div className="flex flex-col">
              <p>{user?.name}</p>
              <button
                onClick={() => signOut()}
                className="hover:underline inline-block text-zinc-200 duration-300 transition-all mr-1 hover:text-red-300"
              >
                logout
              </button>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex ml-auto gap-2 items-center">
            <Avatar />
            <p className="text-sm">
              <Link
                href="/login"
                className="inline-block text-zinc-200 duration-300 transition-all mr-1 hover:underline"
              >
                Create
              </Link>
              your account
            </p>
          </div>
        )}

        <MenuMobile
          links={[
            {
              label: 'Sign in with Github',
              path: '',
            },
            {
              label: 'Panel',
              path: '/panel',
            },
            {
              label: 'Overview',
              path: '/overview',
            },
            {
              label: 'Quick Access',
              path: '/quick-access',
            },
          ]}
        />
      </header>
    </div>
  )
}
