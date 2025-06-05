"use client";

import { Absence } from "@/common/types/kata.types";
import {
  sortAbsences,
  filterAbsenceByUserSearch,
} from "@/common/helpers/absence.helper";
import { useState } from "react";
import AbsenceTableRow from "../molecules/AbsenceTableRow";
import TableHeaderRow from "../atoms/TableHeaderRow";
import SearchInput from "../atoms/SearchInput";

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

  const sortArrow = (_sortedBy: string) => {
    return _sortedBy === absencesList.sortedBy
      ? absencesList.sortAsc
        ? "↑"
        : "↓"
      : "";
  };

  const tableHeaderRows = [
    { label: "Name", onClick: () => handleSort("name") },
    { label: "Type", onClick: () => handleSort("type") },
    { label: "Start Date", onClick: () => handleSort("startDate") },
    { label: "Days", onClick: () => handleSort("days") },
    { label: "End Date", onClick: () => handleSort("endDate") },
    { label: "Approved", onClick: () => handleSort("approved") },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <SearchInput
          label="Search"
          placeholder="start typing to search"
          value={userSearchInput}
          onChange={(e) => setUserSearchInput(e.target.value)}
          cancelButton={userSearchInput !== ""}
        />
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {tableHeaderRows.map((header) => (
                      <TableHeaderRow
                        key={header.label}
                        onClick={header.onClick}
                      >
                        {`${header.label} ${sortArrow(header.label)}`}
                      </TableHeaderRow>
                    ))}
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
