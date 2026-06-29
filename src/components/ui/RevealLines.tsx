"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

const TAG_MAP = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  div: "div",
} as const;

export default function RevealLines({
  lines,
  delay = 0,
  stagger = 0.1,
  as: Tag = "h1",
  className,
}: {
  lines: React.ReactNode[];
  delay?: number;
  stagger?: number;
  as?: keyof typeof TAG_MAP;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const Wrapper = TAG_MAP[Tag];

  return (
    <Wrapper ref={ref as React.Ref<never>} className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.8,
              ease: EASE,
              delay: delay + i * stagger,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
