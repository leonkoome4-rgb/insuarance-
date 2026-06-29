import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CtaBanner from "@/components/sections/CtaBanner";
import { PARTNERS } from "@/data/partners";

export const metadata: Metadata = {
  title: "Our Partners",
  description:
    "Super Metro Insurance Agency partners with Kenya's leading underwriters — Jubilee, ICEA Lion, Britam, CIC, APA, AAR and more — to give you the widest choice of cover.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="bg-metro-grey-50 py-16">
        <Container>
          <div className="flex items-center gap-2 text-sm text-metro-grey-500">
            <Link href="/" className="hover:text-metro-orange-600">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-metro-navy-800">Our Partners</span>
          </div>

          <Reveal className="mt-8 max-w-2xl">
            <span className="font-display text-base italic text-metro-orange-600">
              Strategic Alliances
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
              Leading the Way Through Our Partners
            </h1>
            <p className="mt-5 text-base leading-relaxed text-metro-grey-700">
              We work with Kenya&apos;s leading underwriters to give you the
              widest choice of cover, the best rates, and dependable claims
              support — because as an independent intermediary, our loyalty
              is to you, not to any single insurer.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {PARTNERS.map((partner, i) => (
              <Reveal key={partner.name} delay={(i % 5) * 0.05}>
                <div className="flex h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-metro-grey-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={60}
                    className="h-auto max-h-10 w-auto max-w-full object-contain"
                  />
                  <p className="text-xs font-medium text-metro-grey-500">{partner.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Looking for a specific underwriter?"
        subtitle="Tell us which insurer you prefer, or let our team recommend the best fit for your needs."
      />
    </>
  );
}
