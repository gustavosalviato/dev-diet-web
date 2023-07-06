'use client'

import { useEffect, useState } from 'react'
import { UseUser } from '@/hooks/auth/useUser'
import { api } from '@/services/axios'
import { useQuery } from 'react-query'

interface Metrics {
  totalMeals: string
  totalMealOnDiet: string
  totalMealOffDiet: string
}

export default function OverViewPage() {
  const [isClient, setIsClient] = useState(false)

  const user = UseUser()

  async function getUserMetrics(): Promise<Metrics> {
    const metricsResponse = await api.get(`/user/metrics/${user?.sub}`)

    return metricsResponse.data.metrics
  }

  const { data } = useQuery('metrics', getUserMetrics)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main className="max-w-6xl w-full px-4 mx-auto">
      <div className="flex flex-col my-8">
        <h2 className="text-2xl font-bold leading-tight">
          Hey, <strong className="text-indigo-400">{user?.name}</strong>
        </h2>

        <p className="mt-1 text-lg text-zinc-300 leading-relaxed">
          Here is what is happening with yout journey
        </p>
      </div>

      <div className="flex flex-col p-6 border border-zinc-700 bg-zinc-800 rounded justify-center items-center">
        <h3 className="leading-tight text-lg font-bold text-zinc-300">
          Registered meal
        </h3>

        <strong className="block mt-3 text-2xl">{data?.totalMeals}</strong>
      </div>

      <div className="flex w-full gap-2 mt-3">
        <div className="flex flex-col p-6 border border-zinc-700 bg-zinc-800 rounded justify-center items-center w-1/2">
          <h3 className="leading-tight text-lg font-bold text-zinc-300">
            meals within the diet
          </h3>

          <strong className="block mt-3 text-2xl">
            {data?.totalMealOnDiet}
          </strong>
        </div>

        <div className="flex flex-col p-6 border border-zinc-700 bg-zinc-800 rounded justify-center items-center w-1/2">
          <h3 className="leading-tight text-lg font-bold text-zinc-300">
            off-diet meals
          </h3>

          <strong className="block mt-3 text-2xl">
            {data?.totalMealOffDiet}
          </strong>
        </div>
      </div>
    </main>
  )
}
