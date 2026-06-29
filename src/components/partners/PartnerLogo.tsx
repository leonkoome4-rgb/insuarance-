"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Partner } from "@/types";

export default function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.06 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mx-4 flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-metro-grey-100 bg-white px-4 shadow-sm transition-shadow duration-300 hover:border-metro-orange-500/40 hover:shadow-lg hover:shadow-metro-orange-500/15"
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={160}
        height={70}
        className="h-auto max-h-12 w-auto max-w-full object-contain"
      />
    </motion.div>
  );
}
