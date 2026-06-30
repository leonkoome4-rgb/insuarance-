import { formatKES } from "./motor-quote";

export type SimpleSelectOption = { value: string; label: string };

export type SimpleQuestion =
  | { key: string; type: "select"; label: string; options: SimpleSelectOption[] }
  | {
      key: string;
      type: "number";
      label: string;
      min: number;
      max: number;
      step: number;
    };

export type SimpleQuoteValues = Record<string, string | number>;

export type SimpleQuoteResult = {
  central: number;
  min: number;
  max: number;
  notes: string[];
};

export type SimpleQuoteConfig = {
  slug: string;
  title: string;
  questions: SimpleQuestion[];
  defaults: SimpleQuoteValues;
  calculate: (values: SimpleQuoteValues) => SimpleQuoteResult;
};

function range(central: number, spread = 0.15): { central: number; min: number; max: number } {
  return {
    central: Math.round(central),
    min: Math.round(central * (1 - spread)),
    max: Math.round(central * (1 + spread)),
  };
}

const num = (v: string | number) => (typeof v === "number" ? v : Number(v));

export const SIMPLE_QUOTE_CONFIGS: Record<string, SimpleQuoteConfig> = {
  "home-property": {
    slug: "home-property",
    title: "Home & Property",
    defaults: { value: 5_000_000, propertyType: "house", security: "standard" },
    questions: [
      { key: "value", type: "number", label: "Property Value (KES)", min: 500_000, max: 100_000_000, step: 100_000 },
      {
        key: "propertyType",
        type: "select",
        label: "Property Type",
        options: [
          { value: "apartment", label: "Apartment / Flat" },
          { value: "house", label: "Standalone House" },
          { value: "commercial-building", label: "Commercial Building" },
        ],
      },
      {
        key: "security",
        type: "select",
        label: "Security Features",
        options: [
          { value: "basic", label: "Basic (fence/gate)" },
          { value: "standard", label: "Standard (guard or alarm)" },
          { value: "high", label: "High (CCTV + guard + alarm)" },
        ],
      },
    ],
    calculate: (v) => {
      const rateByType: Record<string, number> = { apartment: 0.0018, house: 0.0025, "commercial-building": 0.0035 };
      const securityFactor: Record<string, number> = { basic: 1, standard: 0.9, high: 0.8 };
      const value = num(v.value);
      const premium = Math.max(3_500, value * rateByType[v.propertyType as string] * securityFactor[v.security as string]);
      return {
        ...range(premium),
        notes: [
          `Based on ${formatKES(value)} sum insured with ${String(v.security)} security measures.`,
          "Covers fire, lightning, explosion, and burglary as standard — extendable to floods and other perils.",
        ],
      };
    },
  },

  "business-commercial": {
    slug: "business-commercial",
    title: "Business & Commercial",
    defaults: { value: 3_000_000, riskCategory: "low", employees: "1-5" },
    questions: [
      { key: "value", type: "number", label: "Assets / Sum Insured (KES)", min: 500_000, max: 200_000_000, step: 100_000 },
      {
        key: "riskCategory",
        type: "select",
        label: "Business Type",
        options: [
          { value: "low", label: "Office / Retail / Services" },
          { value: "medium", label: "Warehouse / Workshop" },
          { value: "high", label: "Manufacturing / Industrial" },
        ],
      },
      {
        key: "employees",
        type: "select",
        label: "Number of Employees",
        options: [
          { value: "1-5", label: "1 – 5" },
          { value: "6-20", label: "6 – 20" },
          { value: "21-50", label: "21 – 50" },
          { value: "50+", label: "50+" },
        ],
      },
    ],
    calculate: (v) => {
      const rateByRisk: Record<string, number> = { low: 0.002, medium: 0.005, high: 0.01 };
      const employeeLoading: Record<string, number> = { "1-5": 1, "6-20": 1.1, "21-50": 1.2, "50+": 1.35 };
      const value = num(v.value);
      const premium = Math.max(
        8_000,
        value * rateByRisk[v.riskCategory as string] * employeeLoading[v.employees as string]
      );
      return {
        ...range(premium),
        notes: [
          `Fire & perils plus basic liability cover on ${formatKES(value)} of business assets.`,
          "Security measures (CCTV, alarms, fire suppression) can reduce this by 10–30%.",
        ],
      };
    },
  },

  "travel-personal": {
    slug: "travel-personal",
    title: "Travel & Personal",
    defaults: { destination: "east-africa", days: 7, ageBracket: "18-35" },
    questions: [
      {
        key: "destination",
        type: "select",
        label: "Destination",
        options: [
          { value: "east-africa", label: "East Africa" },
          { value: "africa-wide", label: "Rest of Africa" },
          { value: "international", label: "International (Europe / Americas / Asia)" },
        ],
      },
      { key: "days", type: "number", label: "Trip Duration (days)", min: 1, max: 180, step: 1 },
      {
        key: "ageBracket",
        type: "select",
        label: "Traveller Age",
        options: [
          { value: "0-17", label: "Under 18" },
          { value: "18-35", label: "18 – 35" },
          { value: "36-60", label: "36 – 60" },
          { value: "61+", label: "61+" },
        ],
      },
    ],
    calculate: (v) => {
      const dailyRate: Record<string, number> = { "east-africa": 150, "africa-wide": 250, international: 400 };
      const ageLoading: Record<string, number> = { "0-17": 0.7, "18-35": 1, "36-60": 1.15, "61+": 1.6 };
      const days = num(v.days);
      const premium = Math.max(
        1_500,
        dailyRate[v.destination as string] * days * ageLoading[v.ageBracket as string]
      );
      return {
        ...range(premium, 0.1),
        notes: [
          `${days} day(s) of cover including emergency medical and trip protection.`,
        ],
      };
    },
  },

  agriculture: {
    slug: "agriculture",
    title: "Agriculture",
    defaults: { coverType: "crop", value: 500_000, regionRisk: "medium" },
    questions: [
      {
        key: "coverType",
        type: "select",
        label: "Cover Type",
        options: [
          { value: "crop", label: "Crop Insurance" },
          { value: "livestock", label: "Livestock Insurance" },
        ],
      },
      { key: "value", type: "number", label: "Value Insured (KES)", min: 50_000, max: 20_000_000, step: 50_000 },
      {
        key: "regionRisk",
        type: "select",
        label: "Region Risk Level",
        options: [
          { value: "low", label: "Low (high-rainfall area)" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High (drought-prone / ASAL)" },
        ],
      },
    ],
    calculate: (v) => {
      const rates: Record<string, Record<string, number>> = {
        crop: { low: 0.04, medium: 0.06, high: 0.09 },
        livestock: { low: 0.04, medium: 0.055, high: 0.08 },
      };
      const value = num(v.value);
      const rate = rates[v.coverType as string][v.regionRisk as string];
      const premium = Math.max(3_000, value * rate);
      return {
        ...range(premium),
        notes: [
          `Rate reflects ${v.regionRisk === "high" ? "higher drought/climate" : "moderate"} risk in your region.`,
          "Final premium is confirmed after a field risk assessment.",
        ],
      };
    },
  },

  "life-savings": {
    slug: "life-savings",
    title: "Life & Savings",
    defaults: { sumAssured: 2_000_000, ageBracket: "31-40", term: "10" },
    questions: [
      { key: "sumAssured", type: "number", label: "Cover Amount (KES)", min: 500_000, max: 50_000_000, step: 100_000 },
      {
        key: "ageBracket",
        type: "select",
        label: "Your Age",
        options: [
          { value: "18-30", label: "18 – 30" },
          { value: "31-40", label: "31 – 40" },
          { value: "41-50", label: "41 – 50" },
          { value: "51-60", label: "51 – 60" },
        ],
      },
      {
        key: "term",
        type: "select",
        label: "Policy Term",
        options: [
          { value: "5", label: "5 years" },
          { value: "10", label: "10 years" },
          { value: "15", label: "15 years" },
          { value: "20", label: "20 years" },
        ],
      },
    ],
    calculate: (v) => {
      const perMille: Record<string, number> = { "18-30": 2.5, "31-40": 3.5, "41-50": 5.5, "51-60": 9 };
      const termLoading: Record<string, number> = { "5": 0.9, "10": 1, "15": 1.1, "20": 1.25 };
      const sumAssured = num(v.sumAssured);
      const premium = Math.max(
        12_000,
        (sumAssured / 1000) * perMille[v.ageBracket as string] * termLoading[String(v.term)]
      );
      return {
        ...range(premium, 0.12),
        notes: [
          `Level term life cover of ${formatKES(sumAssured)} over ${v.term} years.`,
          "Final premium depends on a brief medical declaration.",
        ],
      };
    },
  },

  health: {
    slug: "health",
    title: "Health",
    defaults: { tier: "standard", ageBracket: "18-35", dependents: "0" },
    questions: [
      {
        key: "tier",
        type: "select",
        label: "Cover Tier",
        options: [
          { value: "basic", label: "Basic — outpatient + inpatient essentials" },
          { value: "standard", label: "Standard — wider hospital network" },
          { value: "premium", label: "Premium — top hospitals + maternity" },
        ],
      },
      {
        key: "ageBracket",
        type: "select",
        label: "Main Applicant's Age",
        options: [
          { value: "18-35", label: "18 – 35" },
          { value: "36-50", label: "36 – 50" },
          { value: "51-65", label: "51 – 65" },
          { value: "66+", label: "66+" },
        ],
      },
      {
        key: "dependents",
        type: "select",
        label: "Dependents",
        options: [
          { value: "0", label: "None — just me" },
          { value: "1-2", label: "1 – 2" },
          { value: "3-4", label: "3 – 4" },
          { value: "5+", label: "5+" },
        ],
      },
    ],
    calculate: (v) => {
      const baseByTier: Record<string, number> = { basic: 15_000, standard: 40_000, premium: 90_000 };
      const ageLoading: Record<string, number> = { "18-35": 1, "36-50": 1.2, "51-65": 1.6, "66+": 2.2 };
      const peopleEquiv: Record<string, number> = { "0": 1, "1-2": 2.8, "3-4": 4, "5+": 5.5 };
      const premium =
        baseByTier[v.tier as string] * ageLoading[v.ageBracket as string] * peopleEquiv[v.dependents as string];
      return {
        ...range(premium, 0.1),
        notes: [
          `${v.tier === "basic" ? "Basic" : v.tier === "standard" ? "Standard" : "Premium"} tier, family discount already applied for dependents.`,
        ],
      };
    },
  },

  marine: {
    slug: "marine",
    title: "Marine",
    defaults: { value: 1_000_000, transitType: "import", mode: "sea" },
    questions: [
      { key: "value", type: "number", label: "Cargo Value (KES)", min: 100_000, max: 50_000_000, step: 100_000 },
      {
        key: "transitType",
        type: "select",
        label: "Transit Type",
        options: [
          { value: "import", label: "Import" },
          { value: "export", label: "Export" },
          { value: "local", label: "Local / Inland" },
        ],
      },
      {
        key: "mode",
        type: "select",
        label: "Mode of Transport",
        options: [
          { value: "sea", label: "Sea" },
          { value: "air", label: "Air" },
          { value: "road-rail", label: "Road / Rail" },
        ],
      },
    ],
    calculate: (v) => {
      const rateByMode: Record<string, number> = { sea: 0.004, air: 0.006, "road-rail": 0.003 };
      const transitLoading: Record<string, number> = { import: 1.1, export: 1, local: 0.85 };
      const value = num(v.value);
      const premium = Math.max(
        2_500,
        value * rateByMode[v.mode as string] * transitLoading[v.transitType as string]
      );
      return {
        ...range(premium),
        notes: [`Covers loss or damage to ${formatKES(value)} of cargo in transit by ${String(v.mode).replace("-", "/")}.`],
      };
    },
  },

  aviation: {
    slug: "aviation",
    title: "Aviation",
    defaults: { value: 30_000_000, usage: "private", aircraftType: "piston-single" },
    questions: [
      { key: "value", type: "number", label: "Aircraft Hull Value (KES)", min: 5_000_000, max: 500_000_000, step: 1_000_000 },
      {
        key: "usage",
        type: "select",
        label: "Usage",
        options: [
          { value: "private", label: "Private" },
          { value: "commercial-charter", label: "Commercial Charter" },
          { value: "commercial-airline", label: "Commercial Airline" },
        ],
      },
      {
        key: "aircraftType",
        type: "select",
        label: "Aircraft Type",
        options: [
          { value: "piston-single", label: "Piston — Single Engine" },
          { value: "piston-multi", label: "Piston — Multi Engine" },
          { value: "turboprop", label: "Turboprop" },
          { value: "jet", label: "Jet" },
        ],
      },
    ],
    calculate: (v) => {
      const rateByType: Record<string, number> = {
        "piston-single": 0.022,
        "piston-multi": 0.018,
        turboprop: 0.014,
        jet: 0.01,
      };
      const usageLoading: Record<string, number> = { private: 1, "commercial-charter": 1.2, "commercial-airline": 1.1 };
      const value = num(v.value);
      const premium = Math.max(
        150_000,
        value * rateByType[v.aircraftType as string] * usageLoading[v.usage as string]
      );
      return {
        ...range(premium, 0.12),
        notes: [`Hull cover on ${formatKES(value)} agreed value, plus third-party liability.`],
      };
    },
  },
};
