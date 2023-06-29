import { Github, Salad } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../Button'

export function Header() {
  return (
    <div className="bg-zinc-800 w-full">
      <header className="max-w-7xl w-full mx-auto h-20 flex items-center px-4">
        <div className='flex items-center gap-2'>
          <Salad size={24} fontWeight={'bold'} />
          <strong className='text-2xl font-bold leading-tight tracking-tighter'>Dev Diet</strong>
        </div>

        <nav className='flex items-center ml-16 gap-6'>
          <Link href="home" className='text-lg transition-all duration-300 hover:text-zinc-300'>
            Home
          </Link>

          <Link href="home" className='text-lg transition-all duration-300 hover:text-zinc-300'>
            Metrics
          </Link>

          <Link href="home" className='text-lg transition-all duration-300 hover:text-zinc-300'>
            Quick access
          </Link>
        </nav>

        <Button text='Sign in with Github' variant='secondary' size='large' className='ml-auto' icon={<Github />} />
      </header>
    </div>
  )
}