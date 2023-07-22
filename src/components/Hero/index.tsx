'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function HeroSection() {
  return (
    <motion.div
      className="md:grid-cols-2 grid grid-cols-1 gap-32"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      exit={{ opacity: 0, x: 20 }}
    >
      <Image
        src="/meditating.svg"
        alt="Girl meditating"
        width={500}
        height={180}
      />

      <div className="flex flex-col">
        <strong className="text-2xl">🎉hey, welcome</strong>

        <h2 className="text-7xl font-bold leading-tight mt-5 tracking-tight">
          Embark on your journey to well-being{' '}
          <span className="text-indigo-500">well-being</span>
        </h2>

        <strong className="mt-4 text-2xl leading-relaxed">
          Uncover the power of{' '}
          <span className="textindigf">balanced nutrition</span>
        </strong>
      </div>
    </motion.div>
  )
}
