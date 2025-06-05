import { BadgeProps } from "@/components/atoms/Badge";
import { Absence, AbsenceType } from "../types/kata.types";
import { addDays, compareAsc, isValid, parse } from "date-fns";

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

export const filterAbsenceByUserSearch = (
  absences: Absence,
  search: string
) => {
  if (!search) return absences;

  // trim the search string
  const trimmedSearch = search.trim();

  // if the search string is the same as a absence type then return the absences that have that type
  if (Object.values(AbsenceType).includes(trimmedSearch as AbsenceType)) {
    return absences.absenceType === trimmedSearch;
  }

  // if the search string is a number then return the absences that have that number of days
  if (!isNaN(Number(trimmedSearch))) {
    return absences.days === Number(trimmedSearch);
  }

  // if the search string is either approved | not approved | yes | no then return the absences that have that status
  if (trimmedSearch.toLowerCase() === "approved") {
    return absences.approved;
  } else if (trimmedSearch.toLowerCase() === "not approved") {
    return !absences.approved;
  } else if (trimmedSearch.toLowerCase() === "yes") {
    return absences.approved;
  } else if (trimmedSearch.toLowerCase() === "no") {
    return !absences.approved;
  }

  // if the search string is a date then return the absences that have that date
  if (isValid(parse(trimmedSearch, "yyyy-MM-dd", new Date()))) {
    return absences.startDate === trimmedSearch;
  }

  const employeeName = trimmedSearch.toLowerCase().trim();

  return (
    absences.employee.firstName.toLowerCase().includes(employeeName) ||
    absences.employee.lastName.toLowerCase().includes(employeeName) ||
    `${absences.employee.firstName} ${absences.employee.lastName}`
      .toLowerCase()
      .includes(employeeName)
  );
};
