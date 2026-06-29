"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddonCard({
  label,
  description,
  moreInfo,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  moreInfo?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-5 transition-colors duration-200",
        checked ? "border-metro-orange-500 bg-metro-orange-500/5" : "border-metro-grey-100 bg-white"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold text-metro-navy-800">{label}</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-metro-grey-500">{description}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onChange(true)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200",
              checked
                ? "bg-metro-orange-500 text-white"
                : "bg-metro-grey-100 text-metro-grey-700 hover:bg-metro-orange-500/10"
            )}
          >
            Yes, include this
          </button>
          <button
            type="button"
            onClick={() => onChange(false)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200",
              !checked
                ? "bg-metro-navy-800 text-white"
                : "bg-metro-grey-100 text-metro-grey-700 hover:bg-metro-grey-300"
            )}
          >
            No, not needed
          </button>
          {moreInfo && (
            <button
              type="button"
              onClick={() => setShowInfo((prev) => !prev)}
              aria-expanded={showInfo}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-metro-grey-500 hover:bg-metro-grey-100"
            >
              <Info size={13} />
              Tell me more
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {moreInfo && showInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 rounded-lg bg-metro-grey-50 p-3 text-xs leading-relaxed text-metro-grey-700">
              {moreInfo}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
