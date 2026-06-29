"use client";

import { Lightbulb, ShieldCheck, Shield, Flame, HelpCircle } from "lucide-react";
import ChoiceCard from "../ChoiceCard";
import type { MotorCoverType, MotorQuoteValues } from "@/types";

const OPTIONS: {
  value: MotorCoverType;
  label: string;
  description: string;
  icon: typeof Shield;
}[] = [
  {
    value: "comprehensive",
    label: "Comprehensive (recommended)",
    description:
      "Covers your own vehicle, third parties, fire & theft — the widest protection.",
    icon: ShieldCheck,
  },
  {
    value: "tpo",
    label: "Third Party Only (TPO)",
    description:
      "Covers injury or damage to others only — the minimum legal requirement.",
    icon: Shield,
  },
  {
    value: "tpft",
    label: "Third Party, Fire & Theft (TPFT)",
    description: "TPO plus fire damage and theft of your own vehicle.",
    icon: Flame,
  },
  {
    value: "unsure",
    label: "Not sure",
    description: "I'd like guidance on the best option for my situation.",
    icon: HelpCircle,
  },
];

export default function CoverTypeStep({
  values,
  update,
}: {
  values: MotorQuoteValues;
  update: <K extends keyof MotorQuoteValues>(key: K, value: MotorQuoteValues[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-metro-navy-800">
        What type of motor insurance cover are you looking for?
      </h2>
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-metro-orange-500/10 p-3 text-xs leading-relaxed text-metro-orange-600">
        <Lightbulb size={15} className="mt-0.5 shrink-0" />
        <span>
          Tip: Comprehensive cover offers the widest protection and is
          recommended for newer or higher-value vehicles.
        </span>
      </div>
      <div className="mt-4 grid gap-3">
        {OPTIONS.map((option) => (
          <ChoiceCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={values.coverType === option.value}
            onSelect={() => update("coverType", option.value)}
          />
        ))}
      </div>
    </div>
  );
}
