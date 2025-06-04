import kata from "@/common/apis/kata";
import { Absence, Conflict } from "@/common/types/kata.types";

export const getAbsences = async (): Promise<Absence[]> => {
  const response = await kata.get("/absences");
  return response.data;
};

export const getConflicts = async (id: string): Promise<Conflict> => {
  const response = await kata.get(`/conflict/${id}`);
  return response.data;
};
