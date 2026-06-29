"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatKES } from "@/lib/motor-quote";
import { COVER_TYPE_LABELS } from "@/lib/motor-quote-labels";
import type { MotorCoverType, MotorQuoteResult } from "@/types";

export default function QuoteResult({
  result,
  coverType,
  onReset,
}: {
  result: MotorQuoteResult;
  coverType: MotorCoverType;
  onReset: () => void;
}) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <CheckCircle2 size={48} className="text-metro-orange-500" />
      <h2 className="mt-4 font-display text-2xl font-semibold text-metro-navy-800">
        Your Estimated Premium
      </h2>
      <p className="mt-2 max-w-md text-sm text-metro-grey-500">
        Based on {COVER_TYPE_LABELS[coverType]} cover and the details you shared, here&apos;s
        your indicative annual premium.
      </p>

      <div className="mt-6 w-full max-w-sm rounded-2xl border-2 border-metro-orange-500/30 bg-metro-orange-500/5 px-6 py-8">
        <p className="font-display text-4xl font-bold text-metro-orange-600">
          {formatKES(result.totalPremium)}
        </p>
        <p className="mt-1 text-xs text-metro-grey-500">
          Estimated range {formatKES(result.minTotal)} – {formatKES(result.maxTotal)} / year
        </p>
      </div>

      <div className="mt-6 w-full max-w-sm rounded-xl border border-metro-grey-100 bg-white p-5 text-left text-sm">
        <div className="flex justify-between py-1">
          <span className="text-metro-grey-500">Underwriting premium</span>
          <span className="font-medium text-metro-navy-800">
            {formatKES(result.loadedPremium)}
          </span>
        </div>
        {result.addonLines.map((line) => (
          <div key={line.label} className="flex justify-between py-1">
            <span className="text-metro-grey-500">{line.label}</span>
            <span className="font-medium text-metro-navy-800">{formatKES(line.amount)}</span>
          </div>
        ))}
        <div className="flex justify-between py-1">
          <span className="text-metro-grey-500">Levies & stamp duty</span>
          <span className="font-medium text-metro-navy-800">{formatKES(result.levies)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-metro-grey-100 pt-2 font-display font-semibold text-metro-navy-800">
          <span>Total</span>
          <span>{formatKES(result.totalPremium)}</span>
        </div>
      </div>

      {result.notes.map((note) => (
        <div
          key={note}
          className="mt-4 flex max-w-sm items-start gap-2 rounded-lg bg-metro-grey-50 p-3 text-left text-xs leading-relaxed text-metro-grey-700"
        >
          <Info size={14} className="mt-0.5 shrink-0 text-metro-orange-500" />
          {note}
        </div>
      ))}

      <div className="mt-5 flex max-w-sm items-start gap-2 rounded-lg bg-metro-navy-800/5 p-3 text-left text-xs leading-relaxed text-metro-grey-700">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-metro-navy-600" />
        This is an indicative estimate. A licensed advisor will confirm your final
        premium with our underwriting partners before you commit to anything.
      </div>

      <Button type="button" variant="secondary" className="mt-6" onClick={onReset}>
        Get Another Quote
      </Button>
    </motion.div>
  );
}
