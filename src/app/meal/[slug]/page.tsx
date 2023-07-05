'use client'

import { Button } from '@/components/Button'
import { DeleteMealModal } from '@/components/DeleteMealModal'
import { ArrowLeft, Edit, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { api } from '@/services/axios'

interface Meal {
  id: string
  name: string
  description: string
  createdAt: string
  hour: string
  isOnDiet: boolean
}

export default function MealSlugPage() {
  const params = useParams()

  async function fetchMeal(): Promise<Meal> {
    const mealResponse = await api.get(`/meals/user/${params.slug}`)

    return mealResponse.data.meal
  }

  const { data } = useQuery('meal', fetchMeal)

  return (
    <main className="max-w-7xl px-4 mx-auto w-full">
      <div className="flex flex-col mt-12 items-start">
        <Link
          href="/panel"
          className="w-8 h-8 border-2 border-transparent rounded flex items-center justify-center hover:border-zinc-700 duration-300 transition-colors"
        >
          <ArrowLeft />
        </Link>

        <h2 className="font-bold leading-tight text-2xl mt-12">{data?.name}</h2>

        <p className="mt-3 leading-relaxed text-lg">{data?.description}</p>

        <h3 className="leading-tight text-xl font-bold mt-4">Date and time</h3>
        <p className="text-lg mt-3">
          {new Date(data?.createdAt!).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>

        <p className="text-lg mt-2">at {data?.hour}</p>

        <div className="flex items-center justify-center mt-6 font-semibold gap-2 min-w-[7.5rem] px-4 h-12 bg-zinc-800 rounded select-none">
          {data?.isOnDiet ? (
            <ThumbsUp size={18} className="text-indigo-500" />
          ) : (
            <ThumbsDown size={18} className="text-red-400" />
          )}
          {data?.isOnDiet ? 'within diet' : 'off diet'}
        </div>

        <div className="flex items-center gap-5 mt-12">
          <Button
            text="Edit meal"
            size="large"
            variant="secondary"
            icon={<Edit size={18} />}
          />
          <DeleteMealModal />
        </div>
      </div>
    </main>
  )
}
