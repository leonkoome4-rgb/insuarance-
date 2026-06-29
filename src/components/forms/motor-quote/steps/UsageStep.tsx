"use client";

import { Car, Briefcase, Bus, Package } from "lucide-react";
import ChoiceCard from "../ChoiceCard";
import type { MotorQuoteValues, MotorUsage } from "@/types";

const OPTIONS: { value: MotorUsage; label: string; icon: typeof Car }[] = [
  { value: "private", label: "Private / Personal Use", icon: Car },
  { value: "business", label: "Business / Commercial Use", icon: Briefcase },
  { value: "psv", label: "PSV (Passenger Service Vehicle)", icon: Bus },
  { value: "courier", label: "Courier / Delivery", icon: Package },
];

export default function UsageStep({
  values,
  update,
}: {
  values: MotorQuoteValues;
  update: <K extends keyof MotorQuoteValues>(key: K, value: MotorQuoteValues[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-metro-navy-800">
        How is the car primarily used?
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => (
          <ChoiceCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={values.usage === option.value}
            onSelect={() => update("usage", option.value)}
          />
        ))}
      </div>
    </div>
  );
}
