import type { MotorCoverType, MotorUsage } from "@/types";

export const USAGE_LABELS: Record<MotorUsage, string> = {
  private: "Private / Personal Use",
  business: "Business / Commercial Use",
  psv: "PSV (Passenger Service Vehicle)",
  courier: "Courier / Delivery",
};

export const COVER_TYPE_LABELS: Record<MotorCoverType, string> = {
  comprehensive: "Comprehensive",
  tpo: "Third Party Only (TPO)",
  tpft: "Third Party, Fire & Theft (TPFT)",
  unsure: "Not sure — guidance requested",
};
