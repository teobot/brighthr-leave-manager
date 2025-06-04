import { getAdsenses, getConflicts } from "@/common/helpers/kata.helper";
import { Conflict, Absence } from "@/common/types/kata.types";

describe("getAdsenses", () => {
  it("should return the adsenses data", async () => {
    const adsenses: Absence[] = await getAdsenses();
    expect(adsenses).toBeDefined();
    expect(adsenses).toBeInstanceOf(Array);
    expect(typeof adsenses[0]).toBe("object");
    expect(adsenses[0]).toHaveProperty("id");
  });
});

describe("getConflicts", () => {
  it("should return the conflicts data", async () => {
    const conflicts: Conflict = await getConflicts("1");
    expect(conflicts.conflicts).toBe(false);
  });
});
