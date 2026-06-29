import type {
  ClaimsHistory,
  DriverAgeBracket,
  DrivingExperience,
  MotorAddonKey,
  MotorAddonValues,
  MotorCoverType,
  MotorQuoteResult,
  MotorQuoteValues,
  MotorUsage,
} from "@/types";

/**
 * Indicative motor rating model for Super Metro Insurance Agency.
 *
 * These rates are reasonable industry-typical placeholders for the Kenyan
 * motor market, not a filed underwriting rate book. Every figure an advisor
 * would need to correct is isolated here so the business can swap in real
 * partner rates without touching the wizard UI. The wizard always presents
 * the result as an indicative estimate pending advisor confirmation.
 */

export const VALUE_MIN = 50_000;
export const VALUE_MAX = 100_000_000;
export const VALUE_STEP = 50_000;

const COMPREHENSIVE_BASE_RATE = 0.045; // 4.5% of sum insured
const TPFT_BASE_RATE = 0.025; // 2.5% of sum insured (own fire & theft cover only)
const COMPREHENSIVE_MIN_PREMIUM = 15_000;
const TPFT_MIN_PREMIUM = 8_000;

// Third Party Only is priced as a flat annual band, not a % of value —
// it never covers the policyholder's own vehicle.
const TPO_FLAT_RATES: Record<MotorUsage, number> = {
  private: 7_500,
  business: 10_500,
  courier: 12_500,
  psv: 15_000,
};

const USAGE_LOADING: Record<MotorUsage, number> = {
  private: 1,
  business: 1.15,
  courier: 1.25,
  psv: 1.6,
};

const DRIVER_AGE_LOADING: Record<DriverAgeBracket, number> = {
  "18-24": 1.25,
  "25-35": 1.05,
  "36-50": 1,
  "51+": 1.03,
};

const EXPERIENCE_LOADING: Record<DrivingExperience, number> = {
  lt1: 1.3,
  "1-3": 1.15,
  "3-5": 1.05,
  gt5: 1,
};

const CLAIMS_LOADING: Record<ClaimsHistory, number> = {
  none: 0.95,
  one: 1.1,
  "two-plus": 1.35,
};

function vehicleAgeLoading(year: number): { factor: number; ageYears: number } {
  const ageYears = Math.max(0, new Date().getFullYear() - year);
  if (ageYears <= 3) return { factor: 1, ageYears };
  if (ageYears <= 7) return { factor: 1.05, ageYears };
  if (ageYears <= 12) return { factor: 1.15, ageYears };
  return { factor: 1.3, ageYears };
}

type AddonPricer = (sumInsured: number) => number;

export const ADDON_LABELS: Record<MotorAddonKey, string> = {
  excessProtector: "Excess Protector",
  pvt: "Political Violence & Terrorism",
  windscreen: "Windscreen Cover",
  courtesyCar: "Courtesy Car",
  personalAccident: "Personal Accident Cover",
  roadsideAssistance: "Roadside Assistance",
};

const ADDON_PRICERS: Record<MotorAddonKey, AddonPricer> = {
  excessProtector: (sumInsured) => Math.max(3_000, sumInsured * 0.015),
  pvt: (sumInsured) => sumInsured * 0.002,
  windscreen: () => 2_000,
  courtesyCar: () => 3_500,
  personalAccident: () => 2_500,
  roadsideAssistance: () => 1_500,
};

// Statutory-style levies applied on top of the underwriting premium.
const PHCF_LEVY_RATE = 0.0025; // Policyholders Compensation Fund
const TRAINING_LEVY_RATE = 0.002;
const STAMP_DUTY = 40;

export function calculateMotorQuote(values: MotorQuoteValues): MotorQuoteResult | null {
  const { usage, coverType, driverAge, drivingExperience, claimsHistory, value } = values;
  if (!usage || !coverType || !driverAge || !drivingExperience || !claimsHistory) {
    return null;
  }

  const effectiveCoverType: MotorCoverType =
    coverType === "unsure" ? "comprehensive" : coverType;

  const notes: string[] = [];
  if (coverType === "unsure") {
    notes.push(
      "Based on Comprehensive cover — the option we'd typically recommend. Your advisor will help you compare against Third Party options."
    );
  }

  const year = Number(values.year);
  const { factor: ageFactor, ageYears } = Number.isFinite(year)
    ? vehicleAgeLoading(year)
    : { factor: 1, ageYears: 0 };
  if (ageYears > 15 && effectiveCoverType !== "tpo") {
    notes.push(
      "Vehicles over 15 years old may require a physical valuation before comprehensive or fire & theft cover is confirmed."
    );
  }

  const loadingFactor =
    USAGE_LOADING[usage] *
    ageFactor *
    DRIVER_AGE_LOADING[driverAge] *
    EXPERIENCE_LOADING[drivingExperience] *
    CLAIMS_LOADING[claimsHistory];

  let basePremium: number;
  let loadedPremium: number;

  if (effectiveCoverType === "tpo") {
    basePremium = TPO_FLAT_RATES[usage];
    loadedPremium = basePremium; // TPO is a flat statutory-style band, not loaded
  } else {
    const rate = effectiveCoverType === "tpft" ? TPFT_BASE_RATE : COMPREHENSIVE_BASE_RATE;
    const minPremium =
      effectiveCoverType === "tpft" ? TPFT_MIN_PREMIUM : COMPREHENSIVE_MIN_PREMIUM;
    basePremium = value * rate;
    loadedPremium = Math.max(minPremium, basePremium * loadingFactor);
  }

  const addonLines = (Object.keys(values.addons) as MotorAddonKey[])
    .filter((key) => values.addons[key])
    .map((key) => ({
      label: ADDON_LABELS[key],
      amount: Math.round(ADDON_PRICERS[key](value)),
    }));

  const addonsTotal = addonLines.reduce((sum, line) => sum + line.amount, 0);
  const subtotal = loadedPremium + addonsTotal;
  const levies = Math.round(subtotal * (PHCF_LEVY_RATE + TRAINING_LEVY_RATE) + STAMP_DUTY);
  const totalPremium = Math.round(subtotal + levies);

  return {
    basePremium: Math.round(basePremium),
    loadedPremium: Math.round(loadedPremium),
    addonLines,
    addonsTotal,
    levies,
    subtotal: Math.round(subtotal),
    totalPremium,
    minTotal: Math.round(totalPremium * 0.92),
    maxTotal: Math.round(totalPremium * 1.08),
    notes,
  };
}

export function formatKES(amount: number) {
  return `KES ${Math.round(amount).toLocaleString("en-US")}`;
}

export function emptyAddons(): MotorAddonValues {
  return {
    excessProtector: false,
    pvt: false,
    windscreen: false,
    courtesyCar: false,
    personalAccident: false,
    roadsideAssistance: false,
  };
}
