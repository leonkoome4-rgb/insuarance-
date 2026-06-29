import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Zap, ArrowRight, Car, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Request a Quotation",
  description:
    "Request a tailored insurance quotation from Super Metro Insurance Agency for any class of cover.",
};

export default function QuotePage() {
  return (
    <section className="bg-metro-grey-50 py-16">
      <Container className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-metro-grey-500">
          <Link href="/" className="hover:text-metro-orange-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-metro-navy-800">Request a Quotation</span>
        </div>

        <Reveal className="mt-10 text-center">
          <span className="font-display text-base italic text-metro-orange-600">
            Get Covered
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
            Request a Quotation
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-metro-grey-700">
            Tell us a little about what you&apos;d like to insure, and we&apos;ll
            bring you a tailored quote from our underwriting partners.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/quote/motor"
            className="group mt-10 flex flex-col items-center gap-4 rounded-3xl border-2 border-metro-orange-500/30 bg-metro-orange-500/5 p-8 text-center transition-colors duration-300 hover:border-metro-orange-500 sm:flex-row sm:text-left"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-metro-orange-500/15 text-metro-orange-600">
              <Car size={28} />
            </div>
            <div className="flex-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-metro-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                <Zap size={10} />
                Instant
              </span>
              <h2 className="mt-1.5 font-display text-lg font-semibold text-metro-navy-800">
                Get a Motor Insurance Quote in Minutes
              </h2>
              <p className="mt-1 text-sm text-metro-grey-500">
                Skip the wait — answer a few quick questions about your car
                and driver profile for an instant premium estimate.
              </p>
            </div>
            <ArrowRight
              size={22}
              className="shrink-0 text-metro-orange-500 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-metro-grey-100 bg-white p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-metro-navy-800/5 text-metro-navy-800">
              <MessageCircle size={26} />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold text-metro-navy-800">
                Looking for another class of cover?
              </h2>
              <p className="mt-1 text-sm text-metro-grey-500">
                Home, Business, Travel, Agriculture, Life, Health, Marine or
                Aviation — talk to an advisor and we&apos;ll put together a
                tailored quote for you.
              </p>
            </div>
            <Link href="/contact" className="shrink-0">
              <Button variant="secondary" className="w-full sm:w-auto">
                Talk to an Advisor
              </Button>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
