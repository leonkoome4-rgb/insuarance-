"use client";

import AddonCard from "../AddonCard";
import type { MotorAddonKey, MotorQuoteValues } from "@/types";

const ADDONS: {
  key: MotorAddonKey;
  label: string;
  description: string;
  moreInfo?: string;
}[] = [
  {
    key: "excessProtector",
    label: "Excess Protector",
    description:
      "Covers the excess (deductible) you would otherwise pay out of pocket when making a claim.",
    moreInfo:
      "Most comprehensive policies carry an excess of 2–5% of sum insured per claim. This add-on reimburses that amount so a claim doesn't cost you anything out of pocket.",
  },
  {
    key: "pvt",
    label: "Political Violence & Terrorism (PVT)",
    description:
      "Covers damage caused by riots, strikes, civil unrest, or acts of terrorism.",
    moreInfo:
      "Standard motor policies typically exclude losses arising from riots, strikes, civil commotion, and terrorism. PVT cover restores protection for these specific events.",
  },
  {
    key: "windscreen",
    label: "Windscreen Cover",
    description:
      "Pays for replacement or repair of your windscreen without affecting your no-claims bonus.",
  },
  {
    key: "courtesyCar",
    label: "Courtesy Car",
    description:
      "Provides a replacement vehicle while yours is being repaired after an insured loss.",
  },
  {
    key: "personalAccident",
    label: "Personal Accident Cover",
    description:
      "Pays a lump-sum benefit in the event of accidental death or permanent disability.",
    moreInfo:
      "This benefit pays out to you or your beneficiaries independently of any vehicle damage claim, covering the driver (and optionally passengers) for accidental death or permanent disability.",
  },
  {
    key: "roadsideAssistance",
    label: "Roadside Assistance",
    description:
      "24/7 emergency breakdown support, towing, and roadside help anywhere in Kenya.",
  },
];

export default function AddonsStep({
  values,
  updateAddon,
}: {
  values: MotorQuoteValues;
  updateAddon: (key: MotorAddonKey, value: boolean) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-metro-navy-800">
        Optional Extras
      </h2>
      <p className="mt-1 text-sm text-metro-grey-500">
        Tailor your cover further with these add-ons. You can change your mind anytime before submitting.
      </p>
      <div className="mt-5 flex flex-col gap-4">
        {ADDONS.map((addon) => (
          <AddonCard
            key={addon.key}
            label={addon.label}
            description={addon.description}
            moreInfo={addon.moreInfo}
            checked={values.addons[addon.key]}
            onChange={(value) => updateAddon(addon.key, value)}
          />
        ))}
      </div>
    </div>
  );
}
