"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WizardProgress({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-metro-grey-500">
        <span>
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-metro-orange-600">{steps[currentStep]}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-metro-grey-100">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r from-metro-orange-500 to-metro-orange-400")}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
