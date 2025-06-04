import { BadgeProps } from "@/components/atoms/Badge";

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
