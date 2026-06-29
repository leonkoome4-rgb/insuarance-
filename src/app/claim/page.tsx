import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ClaimForm from "@/components/forms/ClaimForm";
import { PHONE_NUMBERS } from "@/data/nav";

export const metadata: Metadata = {
  title: "Report a Claim",
  description:
    "Report an insurance claim to Super Metro Insurance Agency and get fast, dedicated claims support.",
};

export default function ClaimPage() {
  return (
    <section className="bg-metro-grey-50 py-16">
      <Container>
        <div className="flex items-center gap-2 text-sm text-metro-grey-500">
          <Link href="/" className="hover:text-metro-orange-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-metro-navy-800">Report a Claim</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <span className="font-display text-base italic text-metro-orange-600">
              We&apos;re Here for You
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
              Report a Claim
            </h1>
            <p className="mt-5 text-base leading-relaxed text-metro-grey-700">
              Notify us as soon as possible after an incident. Share the
              details below and our claims team will guide you through
              documentation and liaise with your insurer for a fair, timely
              settlement.
            </p>
            <p className="mt-4 text-sm font-medium text-metro-navy-800">
              Need urgent help? Call us directly:
            </p>
            <a
              href={`tel:${PHONE_NUMBERS[0].replace(/\s+/g, "")}`}
              className="text-sm font-semibold text-metro-orange-600"
            >
              {PHONE_NUMBERS[0]}
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ClaimForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
