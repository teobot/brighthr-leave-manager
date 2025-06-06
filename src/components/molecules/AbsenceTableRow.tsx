import { Absence, Conflict } from "@/common/types/kata.types";
import React, { useEffect, useState } from "react";
import Badge from "../atoms/Badge";
import { boldMatchingText } from "@/common/helpers/text.helper";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { getAbsenceType } from "@/common/helpers/absence.helper";
import { getConflicts } from "@/common/helpers/kata.helper";
import { twMerge } from "tailwind-merge";

export default function AbsenceTableRow({
  absence,
  userSearchInput,
  setUserSearchInput,
}: {
  absence: Absence;
  userSearchInput: string;
  setUserSearchInput: (input: string) => void;
}) {
  const [hasConflicts, setHasConflicts] =
    useState<Conflict["conflicts"]>(false);

  useEffect(() => {
    const findConflicts = async () => {
      const conflicts = await getConflicts(absence.employee.id);
      setHasConflicts(conflicts.conflicts);
    };
    findConflicts();
  }, []);

  const tableDataClassName = "p-4 text-sm whitespace-nowrap";

  return (
    <tr
      onClick={() =>
        setUserSearchInput(
          `${absence.employee.firstName} ${absence.employee.lastName}`
        )
      }
      className={twMerge(
        "cursor-pointer hover:bg-blue-50 relative",
        hasConflicts &&
          "bg-red-100 border-l-3 border-red-200 border-b-0 hover:bg-red-200"
      )}
    >
      <td className="text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
        <div
          dangerouslySetInnerHTML={{
            __html: boldMatchingText(
              `${absence.employee.firstName} ${absence.employee.lastName}`,
              userSearchInput
            ),
          }}
        />
      </td>
      <td className={tableDataClassName}>
        <Badge
          text={absence.absenceType}
          variant={getAbsenceType(absence.absenceType)}
        />
      </td>
      <td className={tableDataClassName}>
        {format(absence.startDate, "dd/MM/yyyy")}
      </td>
      <td className={tableDataClassName}>{absence.days}</td>
      <td className={tableDataClassName}>
        {format(addDays(absence.startDate, absence.days), "dd/MM/yyyy")}
      </td>
      <td className={tableDataClassName}>
        <Badge
          text={absence.approved ? "Yes" : "No"}
          variant={absence.approved ? "success" : "danger"}
        />
      </td>

      {hasConflicts && (
        <td className="absolute top-0 -right-6">
          <Badge
            text={"Conflict"}
            variant={"danger"}
            className="text-xs font-bold py-0.5 px-1"
          />
        </td>
      )}
    </tr>
  );
}
