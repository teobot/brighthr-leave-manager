"use client";

import { Absence } from "@/common/types/kata.types";
import {
  sortAbsences,
  filterAbsenceByUserSearch,
} from "@/common/helpers/absence.helper";
import { useState } from "react";
import { getConflicts } from "@/common/helpers/kata.helper";
import AbsenceTableRow from "../molecules/AbsenceTableRow";
import TableHeaderRow from "../atoms/TableHeaderRow";

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

  const handleFindConflicts = async (absence: Absence) => {
    const conflicts = await getConflicts(absence.employee.id);
    console.log(conflicts);
  };

  const sortArrow = (_sortedBy: string) => {
    return _sortedBy === absencesList.sortedBy
      ? absencesList.sortAsc
        ? "↑"
        : "↓"
      : "";
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <input
          id="search"
          name="search"
          type="text"
          value={userSearchInput || ""}
          onChange={(e) => setUserSearchInput(e.target.value)}
          placeholder="Search"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <TableHeaderRow onClick={() => handleSort("name")}>
                      {`Name ${sortArrow("name")}`}
                    </TableHeaderRow>
                    <TableHeaderRow onClick={() => handleSort("type")}>
                      {`Type ${sortArrow("type")}`}
                    </TableHeaderRow>
                    <TableHeaderRow onClick={() => handleSort("startDate")}>
                      {`Start Date ${sortArrow("startDate")}`}
                    </TableHeaderRow>
                    <TableHeaderRow onClick={() => handleSort("days")}>
                      {`Days ${sortArrow("days")}`}
                    </TableHeaderRow>
                    <TableHeaderRow onClick={() => handleSort("endDate")}>
                      {`End Date ${sortArrow("endDate")}`}
                    </TableHeaderRow>
                    <TableHeaderRow onClick={() => handleSort("approved")}>
                      {`Approved ${sortArrow("approved")}`}
                    </TableHeaderRow>
                    <TableHeaderRow onClick={() => handleSort("conflicts")}>
                      Conflicts
                    </TableHeaderRow>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {absencesList.absences
                    .filter((absence: Absence) =>
                      filterAbsenceByUserSearch(absence, userSearchInput)
                    )
                    .map((absence: Absence) => (
                      <AbsenceTableRow
                        key={absence.id}
                        absence={absence}
                        userSearchInput={userSearchInput}
                        handleFindConflicts={handleFindConflicts}
                        setUserSearchInput={setUserSearchInput}
                      />
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
