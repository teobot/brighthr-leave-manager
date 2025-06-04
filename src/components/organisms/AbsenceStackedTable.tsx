"use client";
import { Absence } from "@/common/types/kata.types";
import Badge from "../atoms/Badge";
import { addDays, format } from "date-fns";
import { getAbsenceType, sortAbsences } from "@/common/helpers/absence.helper";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function AbsenceStackedTable({
  absences,
}: {
  absences: Absence[];
}) {
  const [absencesList, setAbsencesList] = useState<{
    absences: Absence[];
    sortedBy: string;
    sortAsc: boolean;
  }>({ absences, sortedBy: "name", sortAsc: true });
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  const handleSort = (_sortBy: string) => {
    setAbsencesList({
      absences: sortAbsences(
        absencesList.absences,
        _sortBy,
        absencesList.sortAsc ? "asc" : "desc"
      ),
      sortedBy: _sortBy,
      sortAsc: !absencesList.sortAsc,
    });
  };

  const tableHeaderClasses =
    "py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 cursor-pointer hover:bg-gray-100 select-none";

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search"
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
                      className={twMerge(tableHeaderClasses)}
                      onClick={() => handleSort("name")}
                    >
                      Name{" "}
                      {absencesList.sortedBy === "name" &&
                        (absencesList.sortAsc ? "↑" : "↓")}
                    </th>
                    <th
                      scope="col"
                      className={twMerge(tableHeaderClasses)}
                      onClick={() => handleSort("type")}
                    >
                      Type{" "}
                      {absencesList.sortedBy === "type" &&
                        (absencesList.sortAsc ? "↑" : "↓")}
                    </th>
                    <th
                      scope="col"
                      className={twMerge(tableHeaderClasses)}
                      onClick={() => handleSort("startDate")}
                    >
                      Start Date{" "}
                      {absencesList.sortedBy === "startDate" &&
                        (absencesList.sortAsc ? "↑" : "↓")}
                    </th>
                    <th
                      scope="col"
                      className={twMerge(tableHeaderClasses)}
                      onClick={() => handleSort("days")}
                    >
                      Days{" "}
                      {absencesList.sortedBy === "days" &&
                        (absencesList.sortAsc ? "↑" : "↓")}
                    </th>
                    <th
                      scope="col"
                      className={twMerge(tableHeaderClasses)}
                      onClick={() => handleSort("endDate")}
                    >
                      End Date{" "}
                      {absencesList.sortedBy === "endDate" &&
                        (absencesList.sortAsc ? "↑" : "↓")}
                    </th>
                    <th
                      scope="col"
                      className={twMerge(tableHeaderClasses)}
                      onClick={() => handleSort("approved")}
                    >
                      Approved{" "}
                      {absencesList.sortedBy === "approved" &&
                        (absencesList.sortAsc ? "↑" : "↓")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {absencesList.absences.map((absence: Absence) => (
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
