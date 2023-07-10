/* eslint-disable no-unused-vars */
'use client'

import 'react-toastify/dist/ReactToastify.css'

import './globals.css'

import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import { Header } from '@/components/Header'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

const metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [
    { name: 'Gustavo Salviato', url: 'https://gustavosalviatoz.vercel.app/' },
  ],
  colorScheme: 'dark',
  creator: 'Gustavo Salviato',
  publisher: 'Gustavo Salviato',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
