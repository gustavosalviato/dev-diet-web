'use client'

import { DeleteMealModal } from '@/components/DeleteMealModal'
import { ArrowLeft, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { api } from '@/services/axios'
import { UpdateMealModal } from '@/components/UpdateMealModal'
import { PageWrapper } from '@/components/PageWrapper'
import { AxiosError } from 'axios'

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

  const mealId = params.slug

  async function fetchMeal(mealId: string): Promise<Meal | undefined> {
    try {
      const mealResponse = await api.get(`/meals/user/${mealId}`)

      return mealResponse.data.meal
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data.message === 'Unauthorized.') {
          window.location.replace('/login')
        }
      }
    }
  }

  const { data } = useQuery(
    ['meal', mealId],
    () => fetchMeal(mealId as string),
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <PageWrapper>
      <main className="max-w-7xl px-4 mx-auto w-full">
        <title>Dev Diet | Meal</title>
        <div className="flex flex-col mt-12 items-start">
          <Link
            href="/panel"
            className="w-8 h-8 border-2 border-transparent rounded flex items-center justify-center hover:border-zinc-700 duration-300 transition-colors"
          >
            <ArrowLeft />
          </Link>

          <h2 className="font-bold leading-tight text-2xl mt-12">
            {data?.name}
          </h2>

          <p className="mt-3 leading-relaxed text-lg">{data?.description}</p>

          <h3 className="leading-tight text-xl font-bold mt-4">
            Date and time
          </h3>
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

          <div className="flex items-center mt-5">
            <UpdateMealModal
              mealId={mealId as string}
              name={data?.name!}
              description={data?.description!}
              createdAt={data?.createdAt!}
              hour={data?.hour!}
            />
            <DeleteMealModal slug={params?.slug as string} />
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
