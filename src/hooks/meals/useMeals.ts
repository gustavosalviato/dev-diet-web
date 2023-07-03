import { api } from '@/services/axios'
import { useQuery } from 'react-query'

interface Meal {
  id: string
  name: string
  description: string
  date: string
  time: string
  isOnDiet: boolean
}

export async function getMeals(): Promise<Meal[]> {
  const { data } = await api.get('/meals')

  const meals = data.meals.map((meal: any) => ({
    ...meal,
    date: new Date(meal.date).toLocaleDateString('en-US', {
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
