'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Button } from '../Button'
import { Check, Plus, X } from 'lucide-react'
import { TextInput } from '../TextInput'

export function CreateNewMealModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="medium"
          variant="primary"
          text="New meal"
          icon={<Plus />}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 w-screen h-screen bg-black/75 z-20 fixed' />
        <Dialog.Content className='bg-zinc-800 p-6 rounded-sm border border-zinc-700 z-[21] fixed translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] max-w-lg w-full flex flex-col'>
          <form className='flex flex-col relative'>
            <Dialog.Title className='text-2xl font-bold leading-tight'>
              New Meal
            </Dialog.Title>

            <Dialog.Close asChild>
              <button type="button" className='flex items-center justify-center absolute top-0 right-0 w-7 h-7 rounded-md border-2 border-transparent hover:border-zinc-700 transition-all duration-300 text-zinc-100 hover:text-zinc-100/60'>
                <X />
              </button>
            </Dialog.Close>


            <label htmlFor="name" className='mt-5 mb-2 font-medium'>
              Name
            </label>
            <TextInput id='name' type='text' placeholder="Your meal" />

            <label htmlFor="description" className='mt-5 mb-2'>Description</label>
            <textarea name="description" id="description"
              className='bg-zinc-900 rounded min-h-[7.5rem] resize-none font-medium py-2 px-3 flex items-center border-2 border-transparent outline-0 focus:border-zinc-100 duration-300 transition-colors placeholder:text-zinc-700'
              placeholder='Describe your meal'
            />


            <div className='flex items-center gap-5'>
              <div className='mt-5 w-1/2'>
                <label htmlFor="name" className='mb-2 font-medium'>
                  Date
                </label>
                <TextInput id='name' type='date' placeholder="Your meal" />
              </div>

              <div className='mt-5 w-1/2'>
                <label htmlFor="name" className='mb-2 font-medium'>
                  Time
                </label>
                <TextInput id='name' type='time' placeholder="Your meal" />
              </div>
            </div>

            <label htmlFor="name" className='mt-5 mb-2 font-medium'>
              Are you on a diet?
            </label>
            <RadioGroup.Root>
              <RadioGroup.Item value='ondiet'>
                <RadioGroup.Indicator />
              </RadioGroup.Item>


              <div className='flex items-center gap-5'>
                <RadioGroup.Item value='ondiet' className='duration-300 transition-colors flex items-center gap-2 px-4 py-3 font-bold rounded bg-zinc-900 border-2 border-zinc-700 w-1/2 justify-center data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-900 data-[state=checked]:border-indigo-500'>
                  Yes
                </RadioGroup.Item>


                <RadioGroup.Item value='offdiet' className='duration-300 transition-colors flex items-center gap-2 px-4 py-3 font-bold rounded bg-transparent border-2 border-zinc-900 w-1/2 justify-center data-[state=checked]:bg-zinc-900 data-[state=checked]:border-indigo-500'>
                  No
                </RadioGroup.Item>
              </div>
            </RadioGroup.Root>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

