'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from '../Button'
import { Trash } from 'lucide-react'
import { Dialog } from '@radix-ui/react-dialog'

export function DeleteMealModal() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button
          text='Delete meal'
          size='large'
          variant='tertiary'
          icon={<Trash size={18} />}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Portal />
      <AlertDialog.Overlay className='inset-0 w-screen h-screen bg-black/75 z-20 fixed' />

      <AlertDialog.Content className='bg-zinc-800 p-6 rounded-sm border border-zinc-700 z-[21] fixed translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] max-w-lg w-full flex flex-col'>


        <form className='flex flex-col'>
          <AlertDialog.Title className='text-xl font-bold leading-tight'>
            Are you absolutely sure?
          </AlertDialog.Title>

          <AlertDialog.Description className='mt-3 leading-relaxed text-lg'>
            This action cannot be undone. This will permanently delete your meal.
          </AlertDialog.Description>
        </form>

        <div className='flex items-center gap-5 justify-end'>
          <AlertDialog.Cancel asChild>
            <Button
              size='large'
              variant='tertiary'
              text='Cancel'
            />
          </AlertDialog.Cancel>

          <AlertDialog.Action asChild>
            <Button
              onClick={() => console.log('teste')}
              size='large'
              variant='secondary'
              text='Yes, delete meal'
            />
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}