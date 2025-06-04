import { getAbsenceType } from "@/common/helpers/absence.helper";

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
