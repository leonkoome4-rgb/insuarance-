"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChoiceCard({
  label,
  description,
  icon: Icon,
  selected,
  onSelect,
}: {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex w-full flex-col gap-1 rounded-xl border-2 px-4 py-3.5 text-left transition-colors duration-200",
        selected
          ? "border-metro-orange-500 bg-metro-orange-500/5"
          : "border-metro-grey-100 bg-white hover:border-metro-orange-500/40"
      )}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <Icon
            size={18}
            className={selected ? "text-metro-orange-600" : "text-metro-grey-500"}
          />
        )}
        <span
          className={cn(
            "font-display text-sm font-semibold",
            selected ? "text-metro-orange-600" : "text-metro-navy-800"
          )}
        >
          {label}
        </span>
        {selected && (
          <CheckCircle2 size={16} className="ml-auto text-metro-orange-500" />
        )}
      </div>
      {description && (
        <p className="text-xs leading-relaxed text-metro-grey-500">{description}</p>
      )}
    </motion.button>
  );
}
