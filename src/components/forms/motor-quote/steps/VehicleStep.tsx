"use client";

import { Input } from "@/components/ui/Field";
import ValueSlider from "../ValueSlider";
import type { MotorQuoteValues } from "@/types";

export default function VehicleStep({
  values,
  update,
  errors,
}: {
  values: MotorQuoteValues;
  update: <K extends keyof MotorQuoteValues>(key: K, value: MotorQuoteValues[K]) => void;
  errors: Partial<Record<keyof MotorQuoteValues, string>>;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Input
        id="vehicle-year"
        label="What is the year of manufacture of your car?"
        type="number"
        placeholder="e.g. 2020"
        value={values.year}
        error={errors.year}
        onChange={(e) => update("year", e.target.value)}
      />
      <Input
        id="vehicle-make"
        label="What is the make of your car?"
        placeholder="e.g. Toyota"
        value={values.make}
        error={errors.make}
        onChange={(e) => update("make", e.target.value)}
      />
      <div className="sm:col-span-2">
        <Input
          id="vehicle-model"
          label="What is the model?"
          placeholder="e.g. Land Cruiser Prado"
          value={values.model}
          error={errors.model}
          onChange={(e) => update("model", e.target.value)}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm font-medium text-metro-grey-700">
          What is the estimated current market value of your car? (KES)
        </label>
        <p className="mt-0.5 text-xs text-metro-grey-500">
          This helps us determine the appropriate sum insured.
        </p>
        <div className="mt-3">
          <ValueSlider value={values.value} onChange={(v) => update("value", v)} />
        </div>
      </div>
    </div>
  );
}
