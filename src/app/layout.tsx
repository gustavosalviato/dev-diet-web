import './globals.css'

import { ReactNode } from "react"
import { Roboto } from 'next/font/google'
import { Header } from '@/components/Header'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className='bg-zinc-900 text-zinc-50'>
        <Header />
        {children}
      </body>
    </html>
  )
}
