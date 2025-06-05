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

export const sortByText = (absences: Absence[], search: string) => {
  if (!search) return absences;

  // if the search string is the same as a absence type then return the absences that have that type
  if (Object.values(AbsenceType).includes(search as AbsenceType)) {
    return absences.filter((absence) => absence.absenceType === search);
  }

  // if the search string is a number then return the absences that have that number of days
  if (!isNaN(Number(search))) {
    return absences.filter((absence) => absence.days === Number(search));
  }

  // if the search string is either approved | not approved | yes | no then return the absences that have that status
  if (search.toLowerCase() === "approved") {
    return absences.filter((absence) => absence.approved);
  } else if (search.toLowerCase() === "not approved") {
    return absences.filter((absence) => !absence.approved);
  } else if (search.toLowerCase() === "yes") {
    return absences.filter((absence) => absence.approved);
  } else if (search.toLowerCase() === "no") {
    return absences.filter((absence) => !absence.approved);
  }

  // if the search string is a date then return the absences that have that date
  if (isValid(parse(search, "yyyy-MM-dd", new Date()))) {
    return absences.filter((absence) => absence.startDate === search);
  }

  // if the search string is a name then return the absences that have that name
  if (search.toLowerCase().includes(" ")) {
    return absences.filter((absence) => {
      const [firstName, lastName] = search.toLowerCase().split(" ");
      return (
        absence.employee.firstName.toLowerCase() === firstName &&
        absence.employee.lastName.toLowerCase() === lastName
      );
    });
  }

  return absences;
};
