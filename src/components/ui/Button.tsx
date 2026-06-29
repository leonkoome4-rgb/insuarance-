"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-metro-orange-500 text-white hover:bg-metro-orange-600 shadow-sm",
  secondary:
    "bg-transparent border-2 border-metro-navy-600 text-metro-navy-800 hover:bg-metro-navy-600 hover:text-white",
  ghost: "bg-transparent text-metro-grey-900 hover:bg-metro-grey-100",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(244,121,31,0.28)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
