import { Button } from '@/components/Button'
import { DeleteMealModal } from '@/components/DeleteMealModal'
import { ArrowLeft, Edit, ThumbsUp } from 'lucide-react'
import Link from 'next/link'

export default function MealSlugPage() {
  return (
    <main className="max-w-7xl px-4 mx-auto w-full">
      <div className="flex flex-col mt-12 items-start">
        <Link
          href="/panel"
          className="w-8 h-8 border-2 border-transparent rounded flex items-center justify-center hover:border-zinc-700 duration-300 transition-colors"
        >
          <ArrowLeft />
        </Link>

        <h2 className="font-bold leading-tight text-2xl mt-12">
          Nome da refeição
        </h2>

        <p className="mt-3 leading-relaxed text-lg">
          Lorem ipsum dolor sit amet consectetur. Tortor eu ut a duis elit
          euismod adipiscing. Cum aenean nullam mollis consequat placerat. Vel
          nec nunc sit nibh sem dolor. Viverra sagittis erat euismod nibh massa
          nascetur egestas.
        </p>

        <h3 className="leading-tight text-xl font-bold mt-4">Date and time</h3>
        <p className="text-lg mt-3">12 Mar 2021</p>

        <div className="flex items-center justify-center mt-6 font-semibold gap-2 min-w-[7.5rem] px-4 h-12 bg-zinc-800 rounded select-none">
          <ThumbsUp size={18} className="text-indigo-500" />
          Within diet
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
