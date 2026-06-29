"use client";

import { motion } from "framer-motion";
import { Users, Headset, ShieldCheck, Wallet } from "lucide-react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

const REASONS = [
  {
    icon: Users,
    title: "Independent & Client-First",
    description:
      "As an intermediary, we work for you — not one underwriter — comparing options across partners to find the right fit.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Regulated",
    description:
      "We are a licensed insurance intermediary regulated by the Insurance Regulatory Authority (IRA) of Kenya.",
  },
  {
    icon: Headset,
    title: "Dedicated Claims Support",
    description:
      "Our team stands with you through every claim, liaising with insurers to ensure fair and timely settlements.",
  },
  {
    icon: Wallet,
    title: "Plans for Every Budget",
    description:
      "From individual covers to group schemes, we structure flexible premiums that fit your financial plans.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-metro-grey-50 py-20">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Protection Meets Excellence"
          subtitle="We combine professional guidance, transparency, and fast access to support — so you always feel covered, not just insured."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {REASONS.map((reason) => (
            <motion.div key={reason.title} variants={fadeUp}>
              <Card className="group h-full text-center" tilt spotlight>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-metro-orange-500/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-metro-orange-500/20">
                  <reason.icon size={26} className="text-metro-orange-600" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-metro-navy-800">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-metro-grey-500">
                  {reason.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
