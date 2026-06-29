"use client";

import ChoiceCard from "../ChoiceCard";
import type {
  ClaimsHistory,
  DriverAgeBracket,
  DrivingExperience,
  MotorQuoteValues,
} from "@/types";

const AGE_OPTIONS: DriverAgeBracket[] = ["18-24", "25-35", "36-50", "51+"];
const EXPERIENCE_OPTIONS: { value: DrivingExperience; label: string }[] = [
  { value: "lt1", label: "Less than 1 year" },
  { value: "1-3", label: "1 – 3 years" },
  { value: "3-5", label: "3 – 5 years" },
  { value: "gt5", label: "More than 5 years" },
];
const CLAIMS_OPTIONS: { value: ClaimsHistory; label: string }[] = [
  { value: "none", label: "No claims" },
  { value: "one", label: "1 claim" },
  { value: "two-plus", label: "2 or more claims" },
];

export default function DriverStep({
  values,
  update,
}: {
  values: MotorQuoteValues;
  update: <K extends keyof MotorQuoteValues>(key: K, value: MotorQuoteValues[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-lg font-semibold text-metro-navy-800">
          What is the age of the main driver?
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {AGE_OPTIONS.map((age) => (
            <ChoiceCard
              key={age}
              label={age}
              selected={values.driverAge === age}
              onSelect={() => update("driverAge", age)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-metro-navy-800">
          How many years of driving experience does the main driver have?
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {EXPERIENCE_OPTIONS.map((option) => (
            <ChoiceCard
              key={option.value}
              label={option.label}
              selected={values.drivingExperience === option.value}
              onSelect={() => update("drivingExperience", option.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-metro-navy-800">
          Have you made any insurance claims in the last 3 years?
        </h2>
        <p className="mt-1 text-xs text-metro-grey-500">
          A claims history may affect your premium. No-claims discounts may apply.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {CLAIMS_OPTIONS.map((option) => (
            <ChoiceCard
              key={option.value}
              label={option.label}
              selected={values.claimsHistory === option.value}
              onSelect={() => update("claimsHistory", option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
