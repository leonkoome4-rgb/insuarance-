"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PRINCIPLES } from "@/data/principles";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

export default function GuidingPrinciples() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="What Drives Us"
          title="Our Guiding Principles"
          subtitle="Six commitments that shape how we serve every client, every policy, every claim."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PRINCIPLES.map((principle) => (
            <motion.div key={principle.title} variants={fadeUp}>
              <Card className="h-full" tilt>
                <CheckCircle2 size={26} className="text-metro-orange-500" />
                <h3 className="mt-4 font-display text-lg font-semibold text-metro-navy-800">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-metro-grey-500">
                  {principle.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
