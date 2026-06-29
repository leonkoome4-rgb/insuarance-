export const FOUNDED_YEAR = 2023;

// Trailing "95%" in the source scrape had no matching label (only 4 labels were given
// for 5 numbers) — treated as a scrape artifact and dropped, keeping the 4 clean pairs.
export const OPERATIONAL_EXCELLENCE = [
  { label: "Informed Professional Guidance", value: 94 },
  { label: "Customer Satisfaction", value: 90 },
  { label: "Transparency", value: 87 },
  { label: "Fast Access & Support", value: 99 },
];
