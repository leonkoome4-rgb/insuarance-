"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Sparkles, Headset, Award } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Magnetic from "../ui/Magnetic";
import GlowOrbs from "../ui/GlowOrbs";
import RevealLines from "../ui/RevealLines";
import AnimatedCounter from "../ui/AnimatedCounter";
import { FOUNDED_YEAR } from "@/data/stats";

const BADGES = [
  { icon: Award, label: "IRA Licensed", className: "left-0 top-6 sm:-left-6", delay: 0 },
  { icon: Headset, label: "24/7 Support", className: "right-0 top-1/3 sm:-right-8", delay: 0.6 },
  { icon: Sparkles, label: "15+ Partners", className: "left-4 bottom-4 sm:left-0", delay: 1.2 },
];

export default function Hero() {
  const years = new Date().getFullYear() - FOUNDED_YEAR;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-metro-navy-800"
    >
      <GlowOrbs palette="navy" />
      <div className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-metro-orange-600 via-metro-orange-500 to-metro-orange-400" />

      <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div style={{ y: contentY }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400"
          >
            <ShieldCheck size={14} />
            Licensed by the Insurance Regulatory Authority (IRA)
          </motion.span>

          <RevealLines
            as="h1"
            delay={0.15}
            className="mt-6 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
            lines={[
              "Insurance Solutions",
              <span
                key="accent"
                className="text-shimmer block bg-gradient-to-r from-metro-orange-400 via-metro-orange-500 to-metro-orange-400 bg-clip-text italic text-transparent"
              >
                for All Classes
              </span>,
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-metro-grey-300"
          >
            Welcome to Super Metro Insurance Agency — your trusted insurance
            partner, all classes, one agency. Experience the difference where
            protection meets excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.62 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link href="/quote">
                <Button
                  variant="primary"
                  className="shadow-[0_0_30px_rgba(244,121,31,0.35)]"
                >
                  Request a Quote
                </Button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/covers">
                <Button
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-metro-navy-800"
                >
                  Explore Our Covers
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <p className="font-display text-2xl font-semibold text-white">
                <AnimatedCounter value={years} suffix="+" />
              </p>
              <p className="text-xs uppercase tracking-wide text-metro-grey-300">
                Years of Service
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-white">
                <AnimatedCounter value={9} />
              </p>
              <p className="text-xs uppercase tracking-wide text-metro-grey-300">
                Classes of Insurance
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-white">
                <AnimatedCounter value={15} suffix="+" />
              </p>
              <p className="text-xs uppercase tracking-wide text-metro-grey-300">
                Underwriter Partners
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ y: imageY }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            aria-hidden
            className="animate-glow-pulse absolute inset-0 -z-10 rounded-full bg-metro-orange-500/30 blur-3xl"
          />
          <Image
            src="/hero-shield.svg"
            alt="Super Metro Insurance Agency — protection shield"
            width={700}
            height={700}
            className="h-auto w-full"
            priority
          />

          {BADGES.map(({ icon: Icon, label, className, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.9 + delay * 0.3 }}
              className={`absolute z-10 ${className}`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay,
                }}
                className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-lg"
              >
                <Icon size={14} className="text-metro-orange-400" />
                {label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
