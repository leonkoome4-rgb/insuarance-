import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import { FOUNDED_YEAR } from "@/data/stats";

export default function AboutHero() {
  const years = new Date().getFullYear() - FOUNDED_YEAR;

  return (
    <section className="bg-metro-grey-50 py-16">
      <Container>
        <div className="flex items-center gap-2 text-sm text-metro-grey-500">
          <Link href="/" className="hover:text-metro-orange-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-metro-navy-800">About Us</span>
        </div>

        <Reveal className="mt-8 max-w-3xl">
          <span className="font-display text-base italic text-metro-orange-600">
            Who We Are
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
            Welcome to Super Metro Insurance Agency
          </h1>
          <p className="mt-5 text-base leading-relaxed text-metro-grey-700">
            Founded in {FOUNDED_YEAR}, Super Metro Insurance Agency is a
            licensed insurance intermediary regulated by the Insurance
            Regulatory Authority (IRA) of Kenya. For {years === 1 ? "1 year" : `${years}+ years`}, we
            have connected individuals, families, and businesses with trusted
            underwriting partners — bringing together every class of
            insurance, from motor and health to business and aviation, under
            one agency.
          </p>
          <p className="mt-4 text-base leading-relaxed text-metro-grey-700">
            As an independent intermediary, we don&apos;t work for a single
            insurer — we work for you. That means comparing cover options
            across our underwriting partners to find the right balance of
            premium, benefits, and service for your specific needs, then
            standing with you through documentation, policy issuance, and
            claims.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
