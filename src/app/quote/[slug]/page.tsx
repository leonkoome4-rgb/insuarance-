import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronRight, ShieldCheck, Zap, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import GlowOrbs from "@/components/ui/GlowOrbs";
import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import SimpleQuoteForm from "@/components/forms/simple-quote/SimpleQuoteForm";
import { COVERS, getCoverBySlug } from "@/data/covers";
import { SIMPLE_QUOTE_CONFIGS } from "@/lib/simple-quotes";

export function generateStaticParams() {
  return COVERS.filter((cover) => cover.slug !== "motor").map((cover) => ({ slug: cover.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cover = getCoverBySlug(slug);
  if (!cover) return {};
  return {
    title: `Instant ${cover.name} Quote`,
    description: `Get an instant, indicative ${cover.name.toLowerCase()} premium estimate from Super Metro Insurance Agency.`,
  };
}

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "IRA Licensed Intermediary" },
  { icon: Zap, label: "Instant Premium Estimate" },
  { icon: Users, label: "15+ Underwriter Partners Compared" },
];

export default async function CoverQuotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "motor") redirect("/quote/motor");

  const cover = getCoverBySlug(slug);
  if (!cover || !SIMPLE_QUOTE_CONFIGS[slug]) notFound();

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
            <span className="font-medium text-white">{cover.name}</span>
          </div>

          <div className="mt-8 max-w-2xl">
            <span className="font-display text-base italic text-metro-orange-400">
              {cover.name}, Instantly
            </span>
            <RevealLines
              as="h1"
              delay={0.1}
              className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl"
              lines={[`Get Your ${cover.name} Quote in Minutes`]}
            />
            <p className="mt-4 text-base leading-relaxed text-metro-grey-300">{cover.hook}.</p>

            <div className="mt-8 flex flex-wrap gap-6">
              {TRUST_POINTS.map((point) => (
                <div key={point.label} className="flex items-center gap-2 text-sm text-metro-grey-300">
                  <point.icon size={16} className="text-metro-orange-400" />
                  {point.label}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-metro-grey-50 py-16">
        <Container className="max-w-2xl">
          <Reveal>
            <SimpleQuoteForm slug={slug} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
