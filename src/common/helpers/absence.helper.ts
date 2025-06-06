import { BadgeProps } from "@/components/atoms/Badge";
import { Absence, AbsenceType } from "../types/kata.types";
import { addDays, compareAsc, format } from "date-fns";

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
): Absence[] => {
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

export const filterAbsenceByUserSearch: (
  employeeAbsence: Absence,
  searchQuery: string
) => boolean = (employeeAbsence: Absence, searchQuery: string) => {
  if (!searchQuery) return true;

  // trim the search string
  const trimmedSearch = searchQuery.trim();

  // if the search string is the same as a absence type then return the absences that have that type
  if (Object.values(AbsenceType).includes(trimmedSearch as AbsenceType)) {
    return employeeAbsence.absenceType === trimmedSearch;
  }

  // if the search string is a number then return the absences that have that number of days
  if (!isNaN(Number(trimmedSearch))) {
    return employeeAbsence.days === Number(trimmedSearch);
  }

  // if the search string is either approved | not approved | yes | no then return the absences that have that status
  if (trimmedSearch.toLowerCase() === "approved") {
    return employeeAbsence.approved;
  } else if (trimmedSearch.toLowerCase() === "not approved") {
    return !employeeAbsence.approved;
  } else if (trimmedSearch.toLowerCase() === "yes") {
    return employeeAbsence.approved;
  } else if (trimmedSearch.toLowerCase() === "no") {
    return !employeeAbsence.approved;
  }

  // if the search string is a date then return the absences that have that date
  if (format(employeeAbsence.startDate, "dd/MM/yyyy") === trimmedSearch) {
    return true;
  }

  const employeeName = trimmedSearch.toLowerCase().trim();

  return (
    employeeAbsence.employee.firstName.toLowerCase().includes(employeeName) ||
    employeeAbsence.employee.lastName.toLowerCase().includes(employeeName) ||
    `${employeeAbsence.employee.firstName} ${employeeAbsence.employee.lastName}`
      .toLowerCase()
      .includes(employeeName)
  );
};
