'use client'

import { CreateNewMealModal } from '@/components/CreateNewMealModal'
import { GanttChart } from 'lucide-react'
import Link from 'next/link'
import CircularProgress from '@mui/joy/CircularProgress'
import { PageWrapper } from '@/components/PageWrapper'
import { useQuery } from 'react-query'
import { api } from '@/services/axios'
import { AxiosError } from 'axios'

interface Meal {
  id: string
  name: string
  description: string
  createdAt: string
  hour: string
  isOnDiet: boolean
}

export default function PanelPage() {
  async function getMeals(): Promise<Meal[] | undefined> {
    try {
      const { data } = await api.get(`/meals`)

      const meals = data.meals.map((meal: Meal) => ({
        ...meal,
        createdAt: new Date(meal.createdAt).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      }))

      return meals
    } catch (err) {
      console.log(err)
      if (err instanceof AxiosError) {
        if (err.response?.data.message === 'Unauthorized.') {
          window.location.replace('/login')
        }
      }
    }
  }

  const { data, isLoading, error, isFetching } = useQuery('meals', getMeals, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  return (
    <PageWrapper>
      <main className="max-w-7xl mx-auto px-4 w-full">
        <title>Dev Diet | Panel</title>
        <div className="flex bg-zinc-800 border border-zinc-700 p-6 my-8 rounded flex-col">
          <header className="flex items-start justify-between w-full">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-sans">Meals</h2>
              {!isLoading && isFetching && (
                <CircularProgress size="sm" variant="plain" color="info" />
              )}
            </div>

            <CreateNewMealModal />
          </header>

          {isLoading ? (
            <div className="flex justify-center my-8">
              <CircularProgress variant="plain" size="md" color="info" />
            </div>
          ) : error ? (
            <p className="leading-tight text-lg text-zinc-300 my-8 text-center">
              Failed to request meals, please try again later.
            </p>
          ) : (
            <table className="w-full my-8 border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-zinc-800 text-sm font-semibold text-gray-300 uppercase">
                    Name
                  </th>
                  <th className="p-4 text-left bg-zinc-800 text-sm font-semibold text-gray-300 uppercase">
                    Description
                  </th>

                  <th className="p-4 text-left bg-zinc-800 text-sm font-semibold text-gray-300 uppercase flex-1">
                    Date
                  </th>

                  <th className="p-4 text-left bg-zinc-800 text-sm font-semibold text-gray-300 uppercase flex-1">
                    Time
                  </th>

                  <th className="p-4 text-left bg-zinc-800 text-sm font-semibold text-gray-300 uppercase flex-1">
                    View
                  </th>

                  <th className="p-4 text-right bg-zinc-800 text-sm font-semibold text-gray-300 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="mt-2">
                {data?.map((meal) => (
                  <tr key={meal.id} className="border-b border-b-zinc-700">
                    <td className="p-4 text-sm font-semibold text-left bg-zinc-800 first:rounded-tl-md first:rounded-bl-md border-zinc-900">
                      {meal.name}
                    </td>

                    <td className="p-4 text-sm font-semibold text-left bg-zinc-800 border-zinc-900">
                      {meal.description}
                    </td>

                    <td className="p-4 text-sm font-semibold text-left flex-1 bg-zinc-800 border-zinc-900">
                      {meal.createdAt}
                    </td>

                    <td className="p-4 text-sm font-semibold text-left flex-1 bg-zinc-800 border-zinc-900">
                      {meal.hour}
                    </td>

                    <td
                      className="p-4 text-sm font-semibold text-right
               bg-zinc-800 last:rounded-tr-md last:rounded-br-md border-zinc-900"
                    >
                      <Link href={`/meal/${meal.id}`}>
                        <GanttChart
                          aria-label="View meal"
                          className="duration-300 transition-colors hover:text-indigo-400"
                        />
                      </Link>
                    </td>
                    <td
                      className="p-4 text-sm font-semibold text-right
                bg-zinc-800 last:rounded-tr-md last:rounded-br-md border-zinc-900"
                    >
                      {meal.isOnDiet === true ? 'within diet' : 'off diet'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </PageWrapper>
  )
}
