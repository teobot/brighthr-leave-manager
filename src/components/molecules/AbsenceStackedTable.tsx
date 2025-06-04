"use client";
import { Absence } from "@/common/types/kata.types";
import Badge from "../atoms/Badge";
import { addDays, format } from "date-fns";
import { getAbsenceType } from "@/common/helpers/absence.helper";
import { useState } from "react";
import { compareAsc } from "date-fns";

export default function AbsenceStackedTable({
  absences,
}: {
  absences: Absence[];
}) {
  const [absencesList, setAbsencesList] = useState<Absence[]>(absences);
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  const sortByStartDate = () => {
    setAbsencesList(
      absencesList.sort((a, b) => compareAsc(a.startDate, b.startDate))
    );
  };

  const sortByEndDate = () => {
    setAbsencesList(
      absencesList.sort((a, b) =>
        compareAsc(addDays(a.startDate, a.days), addDays(b.startDate, b.days))
      )
    );
  };

  const sortByType = () => {
    setAbsencesList(
      absencesList.sort((a, b) => compareAsc(a.absenceType, b.absenceType))
    );
  };

  const sortByName = () => {
    setAbsencesList(
      absencesList.sort((a, b) =>
        compareAsc(a.employee.firstName, b.employee.firstName)
      )
    );
  };

  const sortByDays = () => {
    setAbsencesList(absencesList.sort((a, b) => compareAsc(a.days, b.days)));
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type <button onClick={sortByType}>Sort</button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Start Date <button onClick={sortByStartDate}>Sort</button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Days <button onClick={sortByDays}>Sort</button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      End Date <button onClick={sortByEndDate}>Sort</button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Approved
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {absencesList.map((absence: Absence) => (
                    <tr key={absence.id}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        {absence.employee.firstName} {absence.employee.lastName}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <Badge
                          text={absence.absenceType}
                          variant={getAbsenceType(absence.absenceType)}
                        />
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {format(absence.startDate, "dd/MM/yyyy")}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {absence.days}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {format(
                          addDays(absence.startDate, absence.days),
                          "dd/MM/yyyy"
                        )}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <Badge
                          text={absence.approved ? "Yes" : "No"}
                          variant={absence.approved ? "success" : "danger"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
