import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Zap, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import GlowOrbs from "@/components/ui/GlowOrbs";
import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import MotorQuoteWizard from "@/components/forms/motor-quote/MotorQuoteWizard";

export const metadata: Metadata = {
  title: "Instant Motor Insurance Quote",
  description:
    "Get an instant, indicative motor insurance premium estimate from Super Metro Insurance Agency — answer a few quick questions about your vehicle and driver profile.",
};

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "IRA Licensed Intermediary" },
  { icon: Zap, label: "Instant Premium Estimate" },
  { icon: Users, label: "15+ Underwriter Partners Compared" },
];

export default function MotorQuotePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-metro-navy-800 py-16 sm:py-20">
        <GlowOrbs palette="navy" />
        <div className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <Container className="relative">
          <div className="flex items-center gap-2 text-sm text-metro-grey-300">
            <Link href="/" className="hover:text-metro-orange-400">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/quote" className="hover:text-metro-orange-400">
              Request a Quotation
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-white">Motor Insurance</span>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="font-display text-base italic text-metro-orange-400">
                Motor Insurance, Instantly
              </span>
              <RevealLines
                as="h1"
                delay={0.1}
                className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl"
                lines={["Get Your Motor Insurance Quote in Minutes"]}
              />
              <p className="mt-4 text-base leading-relaxed text-metro-grey-300">
                Answer a few quick questions about your vehicle and driving profile
                and we&apos;ll generate an instant, indicative premium — then match
                you with the right underwriter from our partner network.
              </p>

              <div className="mt-8 flex flex-wrap gap-6">
                {TRUST_POINTS.map((point) => (
                  <div key={point.label} className="flex items-center gap-2 text-sm text-metro-grey-300">
                    <point.icon size={16} className="text-metro-orange-400" />
                    {point.label}
                  </div>
                ))}
              </div>
            </div>

            <Reveal delay={0.2} className="relative hidden lg:block">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-metro-orange-500/20 blur-2xl"
              />
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src="/images/motor-hero.jpg"
                  alt="Driver on the road, protected by motor insurance"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-metro-grey-50 py-16">
        <Container className="max-w-3xl">
          <Reveal>
            <MotorQuoteWizard />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
