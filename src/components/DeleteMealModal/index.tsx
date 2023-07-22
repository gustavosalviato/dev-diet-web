'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from '../Button'
import { Trash } from 'lucide-react'
import { api } from '@/services/axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { queryClient } from '@/services/react-query'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'

interface DeleteMealModalProps {
  slug: string
}

export function DeleteMealModal({ slug }: DeleteMealModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const deleteMeal = useMutation(
    async () => {
      await api.delete(`/meals/${slug}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('meals')
      },
    },
  )

  async function handleDeleteMeal() {
    try {
      setIsLoading(true)
      deleteMeal.mutateAsync()
      toast('Meal successfully deleted', {
        type: 'success',
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message, {
          type: 'error',
        })
      }
    } finally {
      setIsLoading(false)
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
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button
            text="Delete meal"
            size="large"
            variant="tertiary"
            icon={<Trash size={18} />}
          />
        </AlertDialog.Trigger>
        <AlertDialog.Portal />
        <AlertDialog.Overlay className="inset-0 w-screen h-screen bg-black/75 z-20 fixed" />

        <AlertDialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, y: '-100%', x: '-60%' }}
            animate={{ opacity: 1, y: '-50%', x: '-60%' }}
            exit={{ opacity: 0, y: '-100%', x: '-60%' }}
            className="bg-zinc-800 p-6 rounded-sm border border-zinc-700 z-[21] fixed translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] max-w-lg w-full flex flex-col"
          >
            <div className="flex flex-col">
              <AlertDialog.Title className="text-xl font-bold leading-tight">
                Are you absolutely sure?
              </AlertDialog.Title>

              <AlertDialog.Description className="mt-3 leading-relaxed text-lg">
                This action cannot be undone. This will permanently delete your
                meal.
              </AlertDialog.Description>

              <div className="flex items-center gap-5 justify-end">
                <AlertDialog.Cancel asChild>
                  <Button
                    size="large"
                    variant="tertiary"
                    text="Cancel"
                    type="button"
                  />
                </AlertDialog.Cancel>

                <AlertDialog.Action asChild>
                  <Button
                    onClick={handleDeleteMeal}
                    size="large"
                    variant="secondary"
                    text="Yes, delete meal"
                    type="button"
                    disabled={isLoading}
                  />
                </AlertDialog.Action>
              </div>
            </div>
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
