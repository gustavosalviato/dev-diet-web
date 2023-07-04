import { api } from '@/services/axios'
import { useQuery } from 'react-query'
import { UseUser } from '@/hooks/auth/useUser'
interface Meal {
  id: string
  name: string
  description: string
  createdAt: string
  hour: string
  isOnDiet: boolean
}

export async function getMeals(): Promise<Meal[]> {
  const user = UseUser()

  const { data } = await api.get(`/meals/${user?.sub}`)

  const meals = data.meals.map((meal: any) => ({
    ...meal,
    createdAt: new Date(meal.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  }))

  return meals
}

export function useMeals() {
  return useQuery('meals', getMeals, {
    staleTime: 1000 * 5, // 5 seconds
  })
}
