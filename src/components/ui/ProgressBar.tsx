"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/animations";

export default function ProgressBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-body text-sm font-medium text-metro-grey-700">{label}</p>
        <p className="font-display text-lg font-semibold text-metro-orange-600">{value}%</p>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-metro-grey-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-metro-orange-500 to-metro-orange-400"
        />
      </div>
    </div>
  );
}
