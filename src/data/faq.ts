import type { FAQItem } from "@/types";

// Questions are from the real site; answers are authored here (the source site's
// accordion answers weren't captured), grounded in the Insurance Regulatory
// Authority (IRA) of Kenya and the Insurance Act (Cap 487) / Cap 405.
export const FAQS: FAQItem[] = [
  {
    question: "What types of insurance can I buy in Kenya?",
    answer:
      "Insurance in Kenya is broadly split into General Insurance and Long-Term (Life) Insurance. Under these, we offer all classes — Motor, Home & Property, Business & Commercial, Travel & Personal, Agriculture, Life & Savings, Health, Marine, and Aviation — through our network of licensed underwriting partners.",
  },
  {
    question: "What documents do I need to get a motor insurance cover?",
    answer:
      "Typically you'll need a copy of your National ID and KRA PIN, your vehicle's logbook (or sale agreement for newly purchased vehicles), and a recent valuation report if you're taking up comprehensive cover. Our team will guide you on the exact requirements for your specific vehicle and cover type.",
  },
  {
    question: "How is insurance premium calculated in Kenya?",
    answer:
      "Premiums are based on factors such as the sum insured (e.g. your vehicle's value or your preferred cover limit), the type of cover (third-party vs. comprehensive), and your risk profile — including claims history, location, and asset type. Insurers also apply statutory levies set by the IRA, such as the Policyholders Compensation Fund contribution and training levy.",
  },
  {
    question: "What should I do when making an insurance claim?",
    answer:
      "Notify us as soon as possible after the incident. For accidents or theft, obtain a police abstract where applicable. We'll help you complete the claim form and gather supporting documents (ID, policy details, photos, police abstract, or medical reports), then liaise with your insurer on your behalf to ensure a fair and timely settlement.",
  },
  {
    question: "Is the insurance agency licensed?",
    answer:
      "Yes. Super Metro Insurance Agency is a licensed intermediary regulated by the Insurance Regulatory Authority (IRA) of Kenya under the Insurance Act, Cap 487. You can independently verify any licensed intermediary's status at ira.go.ke.",
  },
];
