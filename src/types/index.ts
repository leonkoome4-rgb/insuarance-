export type SubCover = {
  title: string;
  description: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Cover = {
  slug: string;
  name: string;
  hook: string;
  ctaLabel: string;
  overview: string;
  howItWorks: string;
  subCovers: SubCover[];
  illustration: string;
  keywords: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type ClaimFormValues = {
  name: string;
  phone: string;
  policyNumber: string;
  cover: string;
  incidentDate: string;
  details: string;
};

export type RequestCoverFormValues = {
  name: string;
  phone: string;
  email: string;
  requestType: "New Cover" | "Insurance Certificate" | "Policy Document";
  details: string;
};

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type Partner = {
  name: string;
  logo: string;
};

export type MotorUsage = "private" | "business" | "psv" | "courier";
export type MotorCoverType = "comprehensive" | "tpo" | "tpft" | "unsure";
export type DriverAgeBracket = "18-24" | "25-35" | "36-50" | "51+";
export type DrivingExperience = "lt1" | "1-3" | "3-5" | "gt5";
export type ClaimsHistory = "none" | "one" | "two-plus";
export type ContactMethod = "email" | "whatsapp" | "phone";
export type ContactTime = "anytime" | "morning" | "afternoon" | "evening";

export type MotorAddonKey =
  | "excessProtector"
  | "pvt"
  | "windscreen"
  | "courtesyCar"
  | "personalAccident"
  | "roadsideAssistance";

export type MotorAddonValues = Record<MotorAddonKey, boolean>;

export type MotorQuoteValues = {
  year: string;
  make: string;
  model: string;
  value: number;
  usage: MotorUsage | "";
  coverType: MotorCoverType | "";
  driverAge: DriverAgeBracket | "";
  drivingExperience: DrivingExperience | "";
  claimsHistory: ClaimsHistory | "";
  addons: MotorAddonValues;
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod | "";
  contactTime: ContactTime | "";
};

export type MotorQuoteLine = {
  label: string;
  amount: number;
};

export type MotorQuoteResult = {
  basePremium: number;
  loadedPremium: number;
  addonLines: MotorQuoteLine[];
  addonsTotal: number;
  levies: number;
  subtotal: number;
  totalPremium: number;
  minTotal: number;
  maxTotal: number;
  notes: string[];
};
