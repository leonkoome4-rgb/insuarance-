import { PARTNERS } from "@/data/partners";
import PartnerLogo from "./PartnerLogo";

const ROW_ONE = PARTNERS.slice(0, 8);
const ROW_TWO = PARTNERS.slice(8);

function MarqueeRow({
  partners,
  reverse = false,
}: {
  partners: typeof PARTNERS;
  reverse?: boolean;
}) {
  const doubled = [...partners, ...partners];
  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={`flex w-max py-2 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((partner, i) => (
          <PartnerLogo key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export default function PartnersMarquee() {
  return (
    <div className="flex flex-col gap-4">
      <MarqueeRow partners={ROW_ONE} />
      <MarqueeRow partners={ROW_TWO} reverse />
    </div>
  );
}
