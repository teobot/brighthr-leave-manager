// to check the type you can view the follow https://github.com/brighthr/Front-End-Tech-Tasks/blob/main/src/handlers/absences/index.js

export enum AbsenceType {
  FAMILY = "FAMILY",
  COMPASSIONATE_LEAVE = "COMPASSIONATE_LEAVE",
  MEDICAL = "MEDICAL",
  SICKNESS = "SICKNESS",
  ANNUAL_LEAVE = "ANNUAL_LEAVE",
}

export type Absence = {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  employee: {
    firstName: string;
    lastName: string;
    id: string;
  };
  approved: boolean;
};

export type Conflict = {
  conflicts: boolean;
};
