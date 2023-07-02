'use client'

import { HeroSection } from '@/components/Hero'
import { makeServer } from '@/services/mirage'
import { useEffect } from 'react'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

export default function HomePage() {

  useEffect(() => {
    fetch('/api/meals').then(response => response.json()).then(data => console.log(data))
  }, [])

  return (
    <main className="max-w-7xl w-full px-4 mx-auto my-48">
      <HeroSection />
    </main>
  )
}
