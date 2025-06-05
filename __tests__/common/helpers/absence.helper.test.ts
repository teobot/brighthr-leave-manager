import {
  getAbsenceType,
  sortAbsences,
  sortByText,
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

describe("sortByText", () => {
  const absences: Absence[] = kataDataExample.map((absence) => ({
    id: absence.id,
    startDate: absence.startDate,
    days: absence.days,
    absenceType: absence.absenceType as Absence["absenceType"],
    employee: absence.employee,
    approved: absence.approved,
  }));

  it("returns all absences if search is empty", () => {
    expect(sortByText(absences, "")).toEqual(absences);
  });

  it("filters by absenceType if search matches an absence type", () => {
    const type = absences[0].absenceType;
    const filtered = sortByText(absences, type);
    expect(filtered.every((a) => a.absenceType === type)).toBe(true);
  });

  it("filters by days if search is a number", () => {
    const days = absences[0].days;
    const filtered = sortByText(absences, String(days));
    expect(filtered.every((a) => a.days === days)).toBe(true);
  });

  it("filters by approved if search is 'approved' or 'yes' (case-insensitive)", () => {
    const approved = sortByText(absences, "approved");
    expect(approved.every((a) => a.approved)).toBe(true);
    const yes = sortByText(absences, "yes");
    expect(yes.every((a) => a.approved)).toBe(true);
  });

  it("filters by not approved if search is 'not approved' or 'no' (case-insensitive)", () => {
    const notApproved = sortByText(absences, "not approved");
    expect(notApproved.every((a) => !a.approved)).toBe(true);
    const no = sortByText(absences, "no");
    expect(no.every((a) => !a.approved)).toBe(true);
  });

  it("filters by startDate if search is a valid date string (yyyy-MM-dd)", () => {
    // Use the first absence's startDate, formatted as yyyy-MM-dd
    const date = absences[0].startDate.slice(0, 10);
    const filtered = sortByText(absences, date);
    expect(filtered.every((a) => a.startDate.startsWith(date))).toBe(true);
  });

  it("filters by name if search is a full name (first last)", () => {
    const { firstName, lastName } = absences[0].employee;
    const name = `${firstName} ${lastName}`;
    const filtered = sortByText(absences, name);
    expect(
      filtered.every(
        (a) =>
          a.employee.firstName === firstName && a.employee.lastName === lastName
      )
    ).toBe(true);
  });

  it("returns all absences if search does not match any criteria", () => {
    const filtered = sortByText(absences, "nonexistentsearchterm");
    expect(filtered).toEqual(absences);
  });
});
