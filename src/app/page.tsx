import { getAbsences } from "@/common/helpers/kata.helper";
import { Absence } from "@/common/types/kata.types";
import AbsenceStackedTable from "@/components/molecules/AbsenceStackedTable";

export default async function Home() {
  const absences: Absence[] = await getAbsences();

  return (
    <div className="min-h-full">
      <div className="bg-indigo-500 pb-32">
        <nav className="border-b border-indigo-300/25 bg-indigo-500 lg:border-none">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400">
              <div className="flex items-center px-2 lg:px-0">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=300"
                    className="block size-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Absence Management
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-12 shadow-sm sm:px-6">
            <AbsenceStackedTable absences={absences} />
          </div>
        </div>
      </main>
    </div>
  );
}
