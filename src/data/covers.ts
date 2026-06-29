import type { Cover } from "@/types";

// Motor and Home & Property detail content wasn't present in the source scrape (only
// the listing hook line was), so it's authored here in the same voice/structure as the
// real detail pages that were provided. Aviation's real detail page is broken on the
// live site per the client's note — fully authored here using standard aviation
// insurance product categories. The "Individual Life Cover" description on the real
// site was a copy-paste bug (it described commercial vehicle insurance) — rewritten
// below to actually describe individual life cover.
export const COVERS: Cover[] = [
  {
    slug: "motor",
    name: "Motor Insurance",
    hook: "Drive with confidence — we've got you covered",
    ctaLabel: "Learn More",
    overview:
      "We provide flexible motor insurance solutions for private, commercial, and PSV vehicles — covering you against accidents, theft, fire, and third-party liability, so you can stay on the road with confidence.",
    howItWorks:
      "Our motor insurance plans range from Third-Party Only — the minimum legal cover required under the Insurance (Motor Vehicle Third Party Risks) Act — to Comprehensive cover protecting your vehicle against accidental damage, theft, and fire. Whether you drive a private car, a commercial fleet, or a PSV vehicle, we match you with the right insurer and the right level of protection for your budget. Backed by a dedicated claims team, we ensure fast assessments and fair settlements whenever you need to make a claim.",
    subCovers: [
      {
        title: "Third-Party Only",
        description:
          "The minimum cover required by law in Kenya, protecting you against your legal liability for injury or damage caused to third parties.",
      },
      {
        title: "Comprehensive Motor Cover",
        description:
          "All-round protection for your vehicle against accidents, theft, fire, and third-party liability — giving you complete peace of mind on every journey.",
      },
      {
        title: "Commercial Vehicle Insurance",
        description:
          "Cover for goods-carrying vehicles, trucks, and tankers — protecting your business assets against accidents, theft, and damage while on duty.",
      },
      {
        title: "PSV (Public Service Vehicle) Insurance",
        description:
          "Specialized cover for matatus, buses, and taxis, meeting regulatory requirements while protecting passengers, drivers, and vehicle owners.",
      },
    ],
    illustration: "/covers/motor.svg",
    keywords: ["car", "vehicle", "third party", "comprehensive", "psv", "matatu", "accident", "theft"],
  },
  {
    slug: "home-property",
    name: "Home & Property Insurance",
    hook: "Protect what matters most — your home and valuables",
    ctaLabel: "Learn More",
    overview:
      "We offer reliable home and property insurance covering your house, household contents, and valuables against fire, burglary, water damage, and other unforeseen risks — so you can feel secure wherever you call home.",
    howItWorks:
      "Our home and property insurance is designed to safeguard your most valuable asset against everyday risks. From structural damage to theft of household contents, our policies are flexible enough to cover homeowners, landlords, and tenants alike. We work with trusted insurers to ensure quick assessments and fair compensation whenever you need to file a claim, so rebuilding and replacing what matters most is never a long, stressful process.",
    subCovers: [
      {
        title: "Building / Structure Cover",
        description:
          "Protects the physical structure of your home against fire, storm damage, flooding, and other insured perils.",
      },
      {
        title: "Household Contents Cover",
        description:
          "Covers your furniture, electronics, and personal belongings against theft, fire, and accidental damage.",
      },
      {
        title: "Burglary & Theft Cover",
        description:
          "Compensates you for loss or damage caused by burglary, housebreaking, or theft on your property.",
      },
      {
        title: "Landlord's Insurance",
        description:
          "Tailored protection for rental property owners, covering structural damage and loss of rental income from insured events.",
      },
    ],
    illustration: "/covers/home-property.svg",
    keywords: ["home", "house", "property", "contents", "burglary", "theft", "landlord", "fire"],
  },
  {
    slug: "business-commercial",
    name: "Business & Commercial Insurance",
    hook: "Security for your business, peace for your future",
    ctaLabel: "Learn More",
    overview:
      "We offer reliable and flexible insurance cover tailored for businesses of all sizes — protecting your assets, employees, and operations against risks such as liability claims and business interruption.",
    howItWorks:
      "Our Business and Commercial Insurance is designed to protect your company from everyday risks that could disrupt operations or cause financial loss. From property damage and theft to liability claims and employee-related risks, we provide comprehensive coverage tailored to your business needs. Whether you run a small enterprise or a large organization, our flexible policies ensure continuity, stability, and confidence. With nationwide support and a dedicated claims team, we make the insurance process transparent, efficient, and dependable for all our clients.",
    subCovers: [
      {
        title: "Work Injury Benefits Act (WIBA)",
        description:
          "Provides compensation and medical coverage for employees who suffer work-related injuries, illnesses, or accidents during the course of employment — ensuring your business complies with the law and protects its workforce.",
      },
      {
        title: "Liability Covers",
        description:
          "Protects your business against legal liabilities arising from third-party injuries, property damage, or negligence claims. Our liability insurance ensures your organization remains financially secure and compliant while handling unforeseen incidents or legal obligations.",
      },
      {
        title: "Business Interruption Insurance",
        description:
          "Provides financial protection when unexpected events such as fire, floods, or other insured risks disrupt your business operations. This cover helps replace lost income and manage ongoing expenses, ensuring your business remains stable and operational during recovery periods.",
      },
      {
        title: "Contractors' All Risks",
        description:
          "Provides comprehensive protection for contractors and builders against loss or damage to construction works, materials, and equipment, as well as third-party injury or property damage during the course of a project.",
      },
      {
        title: "Engineering Insurance",
        description:
          "Offers coverage for loss or damage to machinery, plant, and equipment during operation, installation, or testing. This policy safeguards businesses against mechanical or electrical breakdowns, ensuring minimal disruption to operations.",
      },
      {
        title: "Goods in Transit Insurance",
        description:
          "Provides protection against loss, theft, or damage to goods while being transported by road, rail, air, or sea. This cover ensures that your business assets and customer deliveries remain secure throughout the journey.",
      },
      {
        title: "Money Insurance",
        description:
          "Protects your business against loss of money while in transit, on the premises, or in safes due to theft, robbery, or other unforeseen incidents. This cover ensures financial security and peace of mind in daily business operations.",
      },
    ],
    illustration: "/covers/business-commercial.svg",
    keywords: ["business", "commercial", "liability", "wiba", "contractors", "engineering", "goods in transit", "money"],
  },
  {
    slug: "travel-personal",
    name: "Travel & Personal Insurance",
    hook: "Go anywhere with peace of mind.",
    ctaLabel: "Learn More",
    overview:
      "We offer comprehensive travel and personal insurance packages designed to protect you and your loved ones from unexpected events. Whether you're traveling locally or abroad, our covers ensure financial security against medical emergencies, trip cancellations, lost luggage, and personal accidents — giving you peace of mind wherever life takes you.",
    howItWorks:
      "Our travel and personal insurance plans are crafted to provide flexibility, safety, and confidence wherever you go. Whether you're traveling for business, leisure, or daily activities, we ensure you're covered against medical emergencies, trip interruptions, lost belongings, and personal accidents. We offer coverage options within Kenya and internationally, supported by a dedicated claims team and professional staff committed to delivering a fast, transparent, and hassle-free insurance experience.",
    subCovers: [
      {
        title: "Travel Insurance (Local & International)",
        description:
          "Comprehensive cover for travelers against medical emergencies, trip cancellations, lost baggage, and travel delays — ensuring peace of mind whether you're exploring Kenya or traveling abroad.",
      },
      {
        title: "Personal Accident Cover",
        description:
          "Provides financial protection in the event of accidental injury, disability, or death. This cover ensures you and your loved ones receive compensation and support during unexpected personal emergencies — helping you stay secure no matter what life brings.",
      },
    ],
    illustration: "/covers/travel-personal.svg",
    keywords: ["travel", "trip", "luggage", "personal accident", "abroad", "flight"],
  },
  {
    slug: "agriculture",
    name: "Agriculture Insurance",
    hook: "Protect your harvest, secure your livelihood.",
    ctaLabel: "Learn More",
    overview:
      "We provide reliable and affordable agriculture insurance cover designed to protect farmers, agribusinesses, and livestock owners against losses caused by drought, pests, diseases, fire, and other unforeseen natural risks — ensuring stability and continuity for your farming operations.",
    howItWorks:
      "Our agriculture insurance plans are designed to safeguard farmers and agribusinesses from financial losses due to natural disasters, pests, diseases, and unpredictable weather patterns. Whether you manage crops, livestock, or farm equipment, we ensure your agricultural investments are well protected. We offer coverage options across Kenya, supported by a dedicated claims team and agricultural risk experts committed to providing quick, fair, and transparent compensation to help you recover and continue your farming activities without disruption.",
    subCovers: [
      {
        title: "Crop Insurance",
        description:
          "Comprehensive protection for farmers against the loss or damage of crops caused by drought, excessive rainfall, pests, diseases, or fire — helping you recover from unforeseen events and sustain your farming income.",
      },
      {
        title: "Livestock Insurance",
        description:
          "Provides financial protection against the loss or death of animals due to accidents, diseases, theft, or natural disasters — ensuring farmers and herders can recover quickly and maintain the sustainability of their livestock businesses.",
      },
      {
        title: "Farm Asset Protection Cover",
        description:
          "Liberal insurance for farm equipment, machinery, and other agricultural assets against risks such as fire, theft, accidental damage, and natural disasters — ensuring your farm operations continue smoothly with minimal financial loss.",
      },
    ],
    illustration: "/covers/agriculture.svg",
    keywords: ["farm", "crop", "livestock", "drought", "agribusiness", "harvest"],
  },
  {
    slug: "life-savings",
    name: "Life & Saving Plans",
    hook: "Plan today. Protect tomorrow.",
    ctaLabel: "Learn More",
    overview:
      "We provide reliable and affordable life insurance cover that offers financial security, peace of mind, and protection for your loved ones against life's unexpected events.",
    howItWorks:
      "Our life and saving plans are designed to provide long-term financial security, peace of mind, and future stability for you and your loved ones. Whether you're planning for your child's education, retirement, or wealth accumulation, our flexible policies ensure that your financial goals are protected. We offer customized plans across Kenya, supported by experienced financial advisors and a dedicated service team committed to guiding you through every stage — making saving, investing, and protecting your future simple and rewarding.",
    subCovers: [
      {
        title: "Education Plans",
        description:
          "Flexible savings and insurance plans designed to secure your child's education by ensuring fees and related expenses are covered, even in the event of unforeseen circumstances — giving you peace of mind as you invest in their future success.",
      },
      {
        title: "Individual Life Cover",
        description:
          "Personal life insurance that provides a financial payout to your beneficiaries in the event of death or disability — ensuring your family's financial security and peace of mind.",
      },
      {
        title: "Group Life Cover",
        description:
          "Provides financial protection and peace of mind by ensuring your loved ones are financially secure in the event of your death, disability, or critical illness. This cover helps maintain your family's stability by offering a lump-sum payout or regular income when it's needed most.",
      },
      {
        title: "Investment & Savings Plans",
        description:
          "Structured financial plans that combine insurance protection with long-term savings and investment opportunities — helping you build wealth, achieve your financial goals, and secure a stable future for yourself and your family.",
      },
      {
        title: "Pension Plans",
        description:
          "Reliable retirement savings solutions designed to help you build a secure financial future. Our pension plans ensure you receive a steady income after retirement, allowing you to enjoy peace of mind and financial independence in your golden years.",
      },
      {
        title: "Money Market Fund (MMF)",
        description:
          "A flexible, low-risk investment option that helps you grow your savings while staying protected under our life insurance solutions. Competitive returns, easy accessibility, and financial stability — ensuring your money works for you.",
      },
    ],
    illustration: "/covers/life-savings.svg",
    keywords: ["life", "savings", "pension", "education plan", "investment", "mmf", "retirement"],
  },
  {
    slug: "health",
    name: "Health Insurance",
    hook: "Your health, our priority.",
    ctaLabel: "Learn More",
    overview:
      "We provide affordable health insurance covers, guaranteeing access to quality medical care, emergency treatment, and financial protection against unexpected health risks.",
    howItWorks:
      "Our health insurance plans are designed to provide reliable, affordable, and flexible medical coverage for individuals, families, and organizations. Whether you need outpatient, inpatient, maternity, or emergency care, we ensure you receive quality healthcare without financial strain. We offer coverage options across Kenya, supported by a wide network of accredited hospitals and a dedicated claims team committed to delivering timely, transparent, and stress-free medical support whenever you need it most.",
    subCovers: [
      {
        title: "Individual Medical Cover",
        description:
          "Comprehensive health insurance designed to cater to your personal medical needs, including inpatient, outpatient, dental, optical, and emergency care.",
      },
      {
        title: "Family Medical Cover",
        description:
          "All-inclusive health insurance that safeguards your entire family against medical expenses arising from illness, accidents, or hospitalization.",
      },
      {
        title: "Group Medical Schemes",
        description:
          "Extensive health insurance cover designed for employees, organizations, and groups — offering medical benefits such as inpatient, outpatient, dental, and optical care.",
      },
    ],
    illustration: "/covers/health.svg",
    keywords: ["health", "medical", "hospital", "outpatient", "inpatient", "family cover"],
  },
  {
    slug: "marine",
    name: "Marine Insurance",
    hook: "Your goods, protected from shore to shore",
    ctaLabel: "Learn More",
    overview:
      "We provide reliable and affordable marine insurance cover designed to protect ships, cargo, and other maritime assets against risks such as loss, damage, theft, or accidents during transit by sea, air, or inland waterways.",
    howItWorks:
      "Our marine insurance plans are designed to provide reliable, flexible, and secure coverage for goods, vessels, and maritime operations. Whether you're shipping cargo locally or internationally, we protect you against loss or damage caused by accidents, theft, fire, or natural disasters during transit. We offer coverage options across Kenya and beyond, supported by an experienced claims team and marine insurance specialists dedicated to ensuring a smooth, transparent, and efficient claims process for every client.",
    subCovers: [
      {
        title: "Marine Cargo Insurance (Imports & Exports)",
        description:
          "Extensive protection for goods and merchandise against loss or damage while being transported by sea, air, or land during import and export operations.",
      },
      {
        title: "Marine Hull Insurance (Vessels — Boats, Ships)",
        description:
          "Extensive insurance cover for vessels such as boats and ships against physical loss or damage caused by accidents, collisions, fire, or storms.",
      },
      {
        title: "Marine Liability Insurance",
        description:
          "Insurance protection for shipowners, operators, and marine service providers against legal liabilities arising from third-party claims such as bodily injury, property damage, or cargo loss.",
      },
    ],
    illustration: "/covers/marine.svg",
    keywords: ["marine", "ship", "cargo", "vessel", "hull", "import", "export"],
  },
  {
    slug: "aviation",
    name: "Aviation Insurance",
    hook: "Secure every flight with trusted protection",
    ctaLabel: "Learn More",
    overview:
      "We provide comprehensive aviation insurance solutions for aircraft owners, operators, and aviation businesses — protecting against loss or damage to aircraft, third-party liability, and passenger risk, so every flight takes off with confidence.",
    howItWorks:
      "Our aviation insurance plans are designed for aircraft owners, charter operators, and aviation businesses operating across Kenya and the region. From hull damage to third-party and passenger liability, we structure cover around the specific risk profile of your aircraft and operations. Backed by specialist aviation underwriters and a dedicated claims team, we ensure fast, knowledgeable support whenever an incident grounds your plans.",
    subCovers: [
      {
        title: "Aircraft Hull Insurance",
        description:
          "Covers physical loss or damage to the aircraft itself, including damage sustained on the ground or in flight, from accidents, fire, or other insured perils.",
      },
      {
        title: "Aviation Third-Party Liability",
        description:
          "Protects aircraft owners and operators against legal liability for injury or property damage caused to third parties on the ground.",
      },
      {
        title: "Passenger Liability Cover",
        description:
          "Provides compensation cover for passenger injury, disability, or death arising from an aviation incident, in line with industry liability conventions.",
      },
      {
        title: "Cargo & Baggage Insurance",
        description:
          "Covers loss or damage to cargo and passenger baggage carried on board during transit.",
      },
      {
        title: "Hangarkeepers' Liability",
        description:
          "Protects aviation businesses against liability for damage to aircraft owned by others while in their care, custody, or control — such as during storage, maintenance, or repair.",
      },
    ],
    illustration: "/covers/aviation.svg",
    keywords: ["aviation", "aircraft", "flight", "plane", "hull", "hangar"],
  },
];

export function getCoverBySlug(slug: string) {
  return COVERS.find((cover) => cover.slug === slug);
}
