import { getAbsences, getConflicts } from "@/common/helpers/kata.helper";
import { Conflict, Absence } from "@/common/types/kata.types";

describe("getAbsences", () => {
  it("should return the absences data", async () => {
    const absences: Absence[] = await getAbsences();
    expect(absences).toBeDefined();
    expect(absences).toBeInstanceOf(Array);
    expect(typeof absences[0]).toBe("object");
    expect(absences[0]).toHaveProperty("id");
  });
});

describe("getConflicts", () => {
  it("should return the conflicts data", async () => {
    const conflicts: Conflict = await getConflicts("1");
    expect(conflicts.conflicts).toBe(false);
  });
});
