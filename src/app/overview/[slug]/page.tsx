export default function OverViewPage() {
  return (
    <main className="max-w-6xl w-full px-4 mx-auto">
      <div className="flex flex-col my-8">
        <h2 className="text-2xl font-bold leading-tight">Hey, <strong className="text-indigo-400">Gustavo</strong></h2>

        <p className="mt-1 text-lg text-zinc-300 leading-relaxed">Here what is happening with yout journey</p>
      </div>

      <div className="flex flex-col p-6 border border-zinc-700 bg-zinc-800 rounded justify-center items-center">
        <h3 className="leading-tight text-lg font-bold text-zinc-300">Registered meal</h3>

        <strong className="block mt-3 text-2xl">200</strong>
      </div>

      <div className="flex w-full gap-2 mt-3">
        <div className="flex flex-col p-6 border border-zinc-700 bg-zinc-800 rounded justify-center items-center w-1/2">
          <h3 className="leading-tight text-lg font-bold text-zinc-300">meals within the diet
          </h3>

          <strong className="block mt-3 text-2xl">200</strong>
        </div>


        <div className="flex flex-col p-6 border border-zinc-700 bg-zinc-800 rounded justify-center items-center w-1/2">
          <h3 className="leading-tight text-lg font-bold text-zinc-300">
            off-diet meals</h3>

          <strong className="block mt-3 text-2xl">200</strong>
        </div>
      </div>


    </main>
  )
}