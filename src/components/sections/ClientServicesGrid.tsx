"use client";

import { motion } from "framer-motion";
import { LifeBuoy, RefreshCw, BookOpen, Handshake } from "lucide-react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import Container from "../ui/Container";
import Card from "../ui/Card";

const SERVICES = [
  {
    icon: LifeBuoy,
    title: "Claims Support",
    description:
      "When life happens, we stand with you. Our claims support team works hand in hand with insurers and, where needed, legal representatives to ensure fair and timely settlements — guiding you through documentation, follow-ups, and payouts.",
  },
  {
    icon: RefreshCw,
    title: "Policy Servicing & Renewals",
    description:
      "We track your policy lifecycle and notify you ahead of renewal dates, helping you review your cover, adjust limits as your needs change, and avoid any lapse in protection.",
  },
  {
    icon: BookOpen,
    title: "Customer Education",
    description:
      "Insurance can be confusing — we break down policy terms, exclusions, and benefits in plain language, so you always know exactly what you're covered for.",
  },
  {
    icon: Handshake,
    title: "Relationship Management",
    description:
      "We stay in touch through visits, calls, and messages long after your policy is issued — building a lasting relationship, not just a one-time transaction.",
  },
];

export default function ClientServicesGrid() {
  return (
    <section className="bg-white py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid gap-6 sm:grid-cols-2"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={fadeUp}>
              <Card className="h-full" tilt>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metro-orange-500/10">
                  <service.icon size={24} className="text-metro-orange-600" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-metro-navy-800">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-metro-grey-500">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
