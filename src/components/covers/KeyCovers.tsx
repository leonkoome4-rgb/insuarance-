"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import type { Cover } from "@/types";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

export default function KeyCovers({ cover }: { cover: Cover }) {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title={`How Our ${cover.name} Works`}
          subtitle={cover.howItWorks}
          align="left"
          className="max-w-3xl mx-0"
        />

        <h3 className="mt-14 font-display text-2xl font-semibold text-metro-navy-800">
          Key {cover.name.replace(" Insurance", "")} Covers
        </h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cover.subCovers.map((sub) => (
            <motion.div key={sub.title} variants={fadeUp}>
              <Card className="h-full" tilt>
                <ShieldCheck size={26} className="text-metro-orange-500" />
                <h4 className="mt-4 font-display text-base font-semibold text-metro-navy-800">
                  {sub.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-metro-grey-500">
                  {sub.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
