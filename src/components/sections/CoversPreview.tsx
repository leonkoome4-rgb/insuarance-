"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COVERS } from "@/data/covers";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import CoverCard from "../covers/CoverCard";

export default function CoversPreview() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="All Classes, One Agency"
          title="Our Covers"
          subtitle="Whatever you're protecting — your car, your home, your business, or your health — we have a cover for it."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {COVERS.map((cover) => (
            <CoverCard key={cover.slug} cover={cover} usePhoto />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link href="/covers">
            <Button variant="secondary">View All Covers</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
