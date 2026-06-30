import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Zap, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { COVERS } from "@/data/covers";

export const metadata: Metadata = {
  title: "Request a Quotation",
  description:
    "Get an instant, indicative insurance quote from Super Metro Insurance Agency for any of our 9 classes of cover.",
};

export default function QuotePage() {
  return (
    <section className="bg-metro-grey-50 py-16">
      <Container className="max-w-5xl">
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
            Get an Instant Quote
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-metro-grey-700">
            Pick a class of cover below — answer a few quick questions and get an
            indicative premium estimate in under a minute.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {COVERS.map((cover) => (
              <Link
                key={cover.slug}
                href={cover.slug === "motor" ? "/quote/motor" : `/quote/${cover.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-metro-grey-100 bg-white p-5 text-left transition-colors duration-300 hover:border-metro-orange-500/40 hover:shadow-md"
              >
                <div className="flex-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-metro-orange-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-metro-orange-600">
                    <Zap size={10} />
                    Instant
                  </span>
                  <h2 className="mt-1.5 font-display text-base font-semibold text-metro-navy-800">
                    {cover.name}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-metro-grey-500">{cover.hook}</p>
                </div>
                <ArrowRight
                  size={20}
                  className="shrink-0 text-metro-orange-500 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </Reveal>

        <p className="mt-8 text-center text-xs text-metro-grey-500">
          Not sure which cover fits? <Link href="/contact" className="font-semibold text-metro-orange-600">Talk to an advisor</Link> instead.
        </p>
      </Container>
    </section>
  );
}
