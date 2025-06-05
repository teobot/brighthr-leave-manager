import { Absence } from "@/common/types/kata.types";
import React from "react";
import Badge from "../atoms/Badge";
import { boldMatchingText } from "@/common/helpers/text.helper";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { getAbsenceType } from "@/common/helpers/absence.helper";

export default function AbsenceTableRow({
  absence,
  userSearchInput,
  handleFindConflicts,
  setUserSearchInput,
}: {
  absence: Absence;
  userSearchInput: string;
  handleFindConflicts: (absence: Absence) => void;
  setUserSearchInput: (input: string) => void;
}) {
  return (
    <tr
      onClick={() =>
        setUserSearchInput(
          `${absence.employee.firstName} ${absence.employee.lastName}`
        )
      }
    >
      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
        <div
          dangerouslySetInnerHTML={{
            __html: boldMatchingText(
              `${absence.employee.firstName} ${absence.employee.lastName}`,
              userSearchInput
            ),
          }}
        />
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
        {format(addDays(absence.startDate, absence.days), "dd/MM/yyyy")}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        <Badge
          text={absence.approved ? "Yes" : "No"}
          variant={absence.approved ? "success" : "danger"}
        />
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        <button
          className="text-blue-500"
          onClick={() => handleFindConflicts(absence)}
        >
          find
        </button>
      </td>
    </tr>
  );
}
