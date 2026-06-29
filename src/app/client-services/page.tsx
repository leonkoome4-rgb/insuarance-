import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ClientServicesGrid from "@/components/sections/ClientServicesGrid";
import InsuranceProcess from "@/components/sections/InsuranceProcess";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Client Services",
  description:
    "Claims support, policy servicing and renewals, customer education, and relationship management from Super Metro Insurance Agency.",
};

export default function ClientServicesPage() {
  return (
    <>
      <section className="bg-metro-grey-50 py-16">
        <Container>
          <div className="flex items-center gap-2 text-sm text-metro-grey-500">
            <Link href="/" className="hover:text-metro-orange-600">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-metro-navy-800">Client Services</span>
          </div>

          <Reveal className="mt-8 max-w-2xl">
            <span className="font-display text-base italic text-metro-orange-600">
              Beyond the Policy
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
              Client Services
            </h1>
            <p className="mt-5 text-base leading-relaxed text-metro-grey-700">
              Buying a policy is just the beginning. Our client services team
              stays engaged through claims, renewals, and everyday questions —
              so you always have someone in your corner.
            </p>
          </Reveal>
        </Container>
      </section>

      <ClientServicesGrid />
      <InsuranceProcess />
      <CtaBanner />
    </>
  );
}
