import { CreateNewMealModal } from "@/components/CreateNewMealModal";
import { Summary } from "@/components/Summary";

export default function PanelPage() {
  return (
    <>
      <div className="w-full bg-zinc-800 p-14" />
      <main className="max-w-7xl mx-auto px-4 w-full">
        <Summary />
        <CreateNewMealModal />
        <h3 className="text-xl font-semibold">23/05/2023</h3>

        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left bg-zinc-700 text-sm font-semibold w-[5%] first:rounded-tl-md">
                Time
              </th>
              <th className="p-4 text-left bg-zinc-700 text-sm font-semibold flex-1">
                Meal
              </th >

              <th className="p-4 text-right bg-zinc-700 text-sm font-semibold last:rounded-tr-md">
                Status
              </th>
            </tr>

          </thead>
          <tbody className="mt-2">
            <tr>
              <td
                className="p-4 text-sm font-semibold text-left w-[5%] after:content-['|'] after:w-[1px] after:h-full after:ml-4 after:text-zinc-700 bg-zinc-800 first:rounded-tl-md first:rounded-bl-md border-t-4 border-zinc-900"

              >12:30
              </td>

              <td
                className="p-4 text-sm font-semibold text-left flex-1 bg-zinc-800 border-t-4 border-zinc-900"
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, deserunt.
              </td>


              <td
                className="p-4 text-sm font-semibold text-right
                bg-zinc-800 last:rounded-tr-md last:rounded-br-md border-t-4 border-zinc-900"
              >
                within diet
              </td>
            </tr>


            <tr>
              <td
                className="p-4 text-sm font-semibold text-left w-[5%] after:content-['|'] after:w-[1px] after:h-full after:ml-4 after:text-zinc-700 bg-zinc-800 first:rounded-tl-md first:rounded-bl-md border-t-4 border-zinc-900"

              >12:30
              </td>

              <td
                className="p-4 text-sm font-semibold text-left flex-1 bg-zinc-800 border-t-4 border-zinc-900"
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, deserunt.
              </td>


              <td
                className="p-4 text-sm font-semibold text-right
                bg-zinc-800 last:rounded-tr-md last:rounded-br-md border-t-4 border-zinc-900"
              >
                within diet
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )

}