import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MealFormValidationSchema = z.object({
  name: z.string().min(5, {
    message: 'name must contain at least 5 characters',
  }),
  description: z.string().min(5, {
    message: 'description must contain at least 5 characters',
  }),
  createdAt: z.string().min(1, {
    message: 'date is a required field',
  }),
  hour: z.string().min(1, {
    message: 'hour is a required field',
  }),
  mealType: z.string({
    required_error: 'inform if the meal is within the diet or not',
  }),
})

export type MealFormData = z.infer<typeof MealFormValidationSchema>

export function useCreateMeal() {
  const { handleSubmit, register, formState, setValue, reset } =
    useForm<MealFormData>({
      resolver: zodResolver(MealFormValidationSchema),
    })

  return {
    handleSubmit,
    register,
    formState,
    setValue,
    reset,
  }
}
