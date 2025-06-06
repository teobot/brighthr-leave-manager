import {
  getAbsenceType,
  sortAbsences,
  filterAbsenceByUserSearch,
} from "@/common/helpers/absence.helper";
import { Absence } from "@/common/types/kata.types";
import kataDataExample from "../../example/kata.data.example.json";

describe("getAbsenceType", () => {
  it("returns 'danger' for 'SICKNESS'", () => {
    expect(getAbsenceType("SICKNESS")).toBe("danger");
  });

  it("returns 'success' for 'ANNUAL_LEAVE'", () => {
    expect(getAbsenceType("ANNUAL_LEAVE")).toBe("success");
  });

  it("returns 'warning' for 'COMPASSIONATE_LEAVE'", () => {
    expect(getAbsenceType("COMPASSIONATE_LEAVE")).toBe("warning");
  });

  it("returns 'primary' for 'FAMILY'", () => {
    expect(getAbsenceType("FAMILY")).toBe("primary");
  });

  it("returns 'primary' for unknown types", () => {
    expect(getAbsenceType("UNKNOWN_TYPE")).toBe("primary");
  });
});

describe("sortAbsences", () => {
  const absences: Absence[] = kataDataExample.map((absence) => ({
    id: absence.id,
    startDate: absence.startDate,
    days: absence.days,
    absenceType: absence.absenceType as Absence["absenceType"],
    employee: absence.employee,
    approved: absence.approved,
  }));

  it("sorts by startDate ascending", () => {
    const sorted = sortAbsences([...absences], "startDate", "asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].startDate >= sorted[i - 1].startDate).toBe(true);
    }
  });

  it("sorts by startDate descending", () => {
    const sorted = sortAbsences([...absences], "startDate", "desc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].startDate <= sorted[i - 1].startDate).toBe(true);
    }
  });

  it("sorts by endDate ascending", () => {
    const getEndDate = (a: Absence) => {
      const d = new Date(a.startDate);
      d.setDate(d.getDate() + a.days);
      return d.toISOString();
    };
    const sorted = sortAbsences([...absences], "endDate", "asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(getEndDate(sorted[i]) >= getEndDate(sorted[i - 1])).toBe(true);
    }
  });

  it("sorts by type ascending", () => {
    const sorted = sortAbsences([...absences], "type", "asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].absenceType >= sorted[i - 1].absenceType).toBe(true);
    }
  });

  it("sorts by name ascending", () => {
    const getName = (a: Absence) =>
      `${a.employee.firstName} ${a.employee.lastName}`;
    const sorted = sortAbsences([...absences], "name", "asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(getName(sorted[i]) >= getName(sorted[i - 1])).toBe(true);
    }
  });

  it("sorts by days ascending", () => {
    const sorted = sortAbsences([...absences], "days", "asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].days >= sorted[i - 1].days).toBe(true);
    }
  });

  it("sorts by approved ascending", () => {
    const sorted = sortAbsences([...absences], "approved", "asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(Number(sorted[i].approved) >= Number(sorted[i - 1].approved)).toBe(
        true
      );
    }
  });

  it("sorts by approved descending", () => {
    const sorted = sortAbsences([...absences], "approved", "desc");
    for (let i = 1; i < sorted.length; i++) {
      expect(Number(sorted[i].approved) <= Number(sorted[i - 1].approved)).toBe(
        true
      );
    }
  });
});

describe("filterAbsenceByUserSearch", () => {
  const absences: Absence[] = kataDataExample.map((absence) => ({
    id: absence.id,
    startDate: absence.startDate,
    days: absence.days,
    absenceType: absence.absenceType as Absence["absenceType"],
    employee: absence.employee,
    approved: absence.approved,
  }));

  it("returns true for empty search (should return the absence itself)", () => {
    expect(filterAbsenceByUserSearch(absences[0], "")).toEqual(true);
  });

  it("returns true if absenceType matches search", () => {
    const type = absences[0].absenceType;
    expect(filterAbsenceByUserSearch(absences[0], type)).toBe(true);
  });

  it("returns true if days matches search as number", () => {
    const days = absences[0].days;
    expect(filterAbsenceByUserSearch(absences[0], String(days))).toBe(true);
  });

  it("returns true if approved and search is 'approved' or 'yes'", () => {
    const approvedAbsence =
      absences.find((a: Absence) => a.approved) || absences[0];
    expect(filterAbsenceByUserSearch(approvedAbsence, "approved")).toBe(true);
    expect(filterAbsenceByUserSearch(approvedAbsence, "yes")).toBe(true);
  });

  it("returns true if not approved and search is 'not approved' or 'no'", () => {
    const notApprovedAbsence =
      absences.find((a: Absence) => !a.approved) || absences[0];
    expect(filterAbsenceByUserSearch(notApprovedAbsence, "not approved")).toBe(
      true
    );
    expect(filterAbsenceByUserSearch(notApprovedAbsence, "no")).toBe(true);
  });

  it("returns true if first or last name includes search (case-insensitive, substring)", () => {
    const { firstName, lastName } = absences[0].employee;
    expect(filterAbsenceByUserSearch(absences[0], firstName)).toBe(true);
    expect(filterAbsenceByUserSearch(absences[0], lastName)).toBe(true);
  });

  it("returns true if the user searches for a fullname", () => {
    const { firstName, lastName } = absences[0].employee;
    expect(
      filterAbsenceByUserSearch(absences[0], `${firstName} ${lastName}`)
    ).toBe(true);
  });

  it("return true if the user searches for half of the firstname or surname", () => {
    const { firstName, lastName } = absences[0].employee;
    expect(filterAbsenceByUserSearch(absences[0], firstName.slice(0, 2))).toBe(
      true
    );
    expect(filterAbsenceByUserSearch(absences[0], lastName.slice(0, 2))).toBe(
      true
    );
  });

  it("returns false when the user searches for a fullname that is not in the absence", () => {
    expect(
      filterAbsenceByUserSearch(
        absences[0],
        absences[0].employee.firstName + "SOMETHINGTHATISNTPOSSBILE"
      )
    ).toBe(false);
  });

  it("returns false if search does not match any criteria", () => {
    expect(
      filterAbsenceByUserSearch(absences[0], "nonexistentsearchterm")
    ).toBe(false);
  });

  it("returns true if the search string is a date", () => {
    expect(filterAbsenceByUserSearch(absences[0], "25/12/2023")).toBe(true);
  });

  it("returns false if the search string is a date that is not the start date", () => {
    expect(filterAbsenceByUserSearch(absences[0], "28/05/2022")).toBe(false);
  });

  it("returns false if the search string is not a date", () => {
    expect(filterAbsenceByUserSearch(absences[0], "2022-11-24")).toBe(false);
  });
});
