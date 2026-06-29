"use client";

import { motion } from "framer-motion";
import { INSURANCE_PROCESS } from "@/data/process";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function InsuranceProcess() {
  return (
    <section className="bg-metro-grey-50 py-20">
      <Container>
        <SectionHeading
          eyebrow="From Quote to Claim"
          title="Our Insurance Process"
          subtitle="A clear, six-step journey — from finding the right cover to standing with you when you need to make a claim."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INSURANCE_PROCESS.map((item) => (
            <motion.div key={item.step} variants={fadeUp} className="relative pl-4">
              <span className="font-display text-4xl font-semibold text-metro-orange-500/25">
                {item.step}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold text-metro-navy-800">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-metro-grey-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
