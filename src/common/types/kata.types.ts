// to check the type you can view the follow https://github.com/brighthr/Front-End-Tech-Tasks/blob/main/src/handlers/absences/index.js
export type Absence = {
  id: number;
  startDate: string;
  days: number;
  absenceType:
    | "FAMILY"
    | "COMPASSIONATE_LEAVE"
    | "MEDICAL"
    | "SICKNESS"
    | "ANNUAL_LEAVE";
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
