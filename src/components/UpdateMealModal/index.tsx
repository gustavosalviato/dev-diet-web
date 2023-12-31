'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Button } from '../Button'
import { Edit, X } from 'lucide-react'
import { TextInput } from '../TextInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ErrorMessage } from '../ErrorMessage'
import { useMutation } from 'react-query'
import { api } from '@/services/axios'
import { queryClient } from '@/services/react-query'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'

interface RadioOptions {
  value: string
  label: string
}

const MealFormValidationSchema = zod.object({
  name: zod.string().min(5, {
    message: 'name must contain at least 5 characters',
  }),
  description: zod.string().min(5, {
    message: 'description must contain at least 5 characters',
  }),
  createdAt: zod.string(),
  hour: zod.string(),
  mealType: zod.string({
    required_error: 'inform if the meal is within the diet or not',
  }),
})

const radioOptions: RadioOptions[] = [
  {
    label: 'Yes',
    value: 'ondiet',
  },
  {
    label: 'No',
    value: 'offdiet',
  },
]

type MealFormData = zod.infer<typeof MealFormValidationSchema>

interface UpdateMealModalProps {
  mealId: string
  name: string
  description: string
  createdAt: string
  hour: string
}

export function UpdateMealModal({
  mealId,
  createdAt,
  description,
  hour,
  name,
}: UpdateMealModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<MealFormData>({
    resolver: zodResolver(MealFormValidationSchema),
  })

  const updateMeal = useMutation(
    async (meal: MealFormData) => {
      const response = await api.put(`/meals/${mealId}`, {
        name: meal.name,
        description: meal.description,
        createdAt: new Date(meal.createdAt).toISOString(),
        hour: meal.hour,
        isOnDiet: meal.mealType === 'ondiet',
      })

      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('meals')
        queryClient.invalidateQueries(['meal', mealId])
      },
    },
  )

  async function handleCreateMeal(data: MealFormData) {
    try {
      await updateMeal.mutateAsync(data)

      toast('Meal successfully updated', {
        type: 'success',
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message, {
          type: 'error',
        })
      }
    } finally {
      setIsModalOpen(false)
      reset()
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        theme="dark"
      />

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>
          <Button
            text="Edit meal"
            size="large"
            variant="secondary"
            icon={<Edit size={18} />}
            className="mr-5"
          />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="inset-0 w-screen h-screen bg-black/75 z-20 fixed data-[state=open]:animate-fade-in" />

          <Dialog.Content asChild>
            <motion.div
              initial={{ opacity: 0, y: '-100%', x: '-60%' }}
              animate={{ opacity: 1, y: '-50%', x: '-60%' }}
              exit={{ opacity: 0, y: '-100%', x: '-60%' }}
              className="bg-zinc-800 p-6 rounded-sm border border-zinc-700 z-[21] fixed translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] max-w-lg w-full flex flex-col data-[state=open]:animate-fade-in"
            >
              <form
                className="flex flex-col relative"
                onSubmit={handleSubmit(handleCreateMeal)}
              >
                <Dialog.Title className="text-2xl font-bold leading-tight">
                  Update Meal
                </Dialog.Title>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="flex items-center justify-center absolute top-0 right-0 w-7 h-7 rounded-md border-2 border-transparent hover:border-zinc-700 transition-all duration-300 text-zinc-100 hover:text-zinc-100/60"
                  >
                    <X />
                  </button>
                </Dialog.Close>

                <label htmlFor="name" className="mt-5 mb-2 font-medium">
                  Name
                </label>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Your meal"
                  {...register('name')}
                  defaultValue={name}
                />

                {errors.name && <ErrorMessage error={errors.name.message} />}

                <label htmlFor="description" className="mt-5 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  className="bg-zinc-900 rounded min-h-[7.5rem] resize-none font-medium py-2 px-3 flex items-center border-2 border-transparent outline-0 focus:border-zinc-100 duration-300 transition-colors placeholder:text-zinc-700"
                  placeholder="Describe your meal"
                  {...register('description')}
                  defaultValue={description}
                />

                {errors.description && (
                  <ErrorMessage error={errors.description.message} />
                )}

                <div className="flex items-center gap-5">
                  <div className="mt-5 w-1/2">
                    <label htmlFor="name" className="mb-2 font-medium">
                      Date
                    </label>
                    <TextInput
                      id="name"
                      type="date"
                      placeholder="Your meal"
                      {...register('createdAt')}
                      defaultValue={createdAt}
                    />

                    {errors.createdAt && (
                      <ErrorMessage error={errors.createdAt.message} />
                    )}
                  </div>

                  <div className="mt-5 w-1/2">
                    <label htmlFor="name" className="mb-2 font-medium">
                      Time
                    </label>
                    <TextInput
                      id="name"
                      type="time"
                      {...register('hour')}
                      defaultValue={hour}
                    />

                    {errors.hour && (
                      <ErrorMessage error={errors.hour.message} />
                    )}
                  </div>
                </div>

                <label htmlFor="mealType" className="mt-5 mb-1 font-medium">
                  Are you on a diet?
                </label>

                {errors.mealType && (
                  <ErrorMessage error={errors.mealType.message} />
                )}

                <RadioGroup.Root
                  className="flex items-center gap-5 mt-1"
                  onValueChange={(value) => setValue('mealType', value)}
                >
                  {radioOptions.map((item) => {
                    return (
                      <RadioGroup.Item
                        value={item.value}
                        key={item.value}
                        className="duration-300 transition-colors flex items-center gap-2 px-4 py-3 font-bold rounded bg-zinc-900 border-2 border-zinc-700 w-1/2 justify-center data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-900 data-[state=checked]:border-indigo-500"
                      >
                        {item.label}
                      </RadioGroup.Item>
                    )
                  })}
                </RadioGroup.Root>

                <Button
                  size="large"
                  variant="primary"
                  text="Send"
                  type="submit"
                  className="mt-3"
                  disabled={isSubmitting}
                />
              </form>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
