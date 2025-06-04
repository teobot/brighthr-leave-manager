import { BadgeProps } from "@/components/atoms/Badge";
import { Absence } from "../types/kata.types";
import { addDays, compareAsc } from "date-fns";

export const getAbsenceType = (absenceType: string): BadgeProps["variant"] => {
  switch (absenceType) {
    case "SICKNESS":
      return "danger";
    case "ANNUAL_LEAVE":
      return "success";
    case "COMPASSIONATE_LEAVE":
      return "warning";
    case "FAMILY":
      return "primary";
    default:
      return "primary";
  }
};

export const sortAbsences = (
  absences: Absence[],
  sortBy: string,
  direction: "asc" | "desc" = "asc"
) => {
  const _sortedAbsences = absences;

  switch (sortBy) {
    case "startDate":
      _sortedAbsences.sort((a, b) => compareAsc(a.startDate, b.startDate));
      break;
    case "endDate":
      _sortedAbsences.sort((a, b) =>
        compareAsc(addDays(a.startDate, a.days), addDays(b.startDate, b.days))
      );
      break;
    case "type":
      _sortedAbsences.sort((a, b) =>
        a.absenceType.localeCompare(b.absenceType)
      );
      break;
    case "name":
      _sortedAbsences.sort((a, b) => {
        return `${a.employee.firstName} ${a.employee.lastName}`.localeCompare(
          `${b.employee.firstName} ${b.employee.lastName}`
        );
      });
      break;
    case "days":
      _sortedAbsences.sort((a, b) => a.days - b.days);
      break;
    case "approved":
      _sortedAbsences.sort((a, b) => {
        if (a.approved === b.approved) return 0;
        if (a.approved) return 1;
        return -1;
      });
      break;
  }

  if (direction === "desc") {
    return _sortedAbsences.reverse();
  } else {
    return _sortedAbsences;
  }
};
