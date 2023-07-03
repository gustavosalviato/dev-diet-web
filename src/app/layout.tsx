'use client'

import './globals.css'

import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import { Header } from '@/components/Header'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/react-query'
import { makeServer } from '@/services/mirage'
import { ReactQueryDevtools } from 'react-query/devtools'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <QueryClientProvider client={queryClient}>
        <body className="bg-zinc-900 text-zinc-50">
          <Header />
          {children}
        </body>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </html>
  )
}
