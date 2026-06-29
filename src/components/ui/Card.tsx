"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: React.ReactNode;
  hoverLift?: boolean;
  tilt?: boolean;
  spotlight?: boolean;
};

export default function Card({
  className,
  children,
  hoverLift = true,
  tilt = false,
  spotlight = false,
  ...props
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotOpacity = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${spotX}% ${spotY}%, rgba(244,121,31,0.16), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (tilt) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    if (spotlight) {
      spotX.set(((e.clientX - rect.left) / rect.width) * 100);
      spotY.set(((e.clientY - rect.top) / rect.height) * 100);
    }
  }

  function handleMouseEnter() {
    if (spotlight) spotOpacity.set(1);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    spotOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      whileHover={hoverLift ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-metro-grey-100 bg-white p-6 shadow-sm transition-shadow duration-300",
        spotlight && "hover:border-metro-orange-500/30 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlightBg, opacity: spotOpacity }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
