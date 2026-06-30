"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, CheckCircle2, ShieldCheck, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import ChoiceCard from "@/components/forms/motor-quote/ChoiceCard";
import PayWithMpesa from "@/components/payments/PayWithMpesa";
import { formatKES } from "@/lib/motor-quote";
import {
  SIMPLE_QUOTE_CONFIGS,
  type SimpleQuoteResult,
  type SimpleQuoteValues,
} from "@/lib/simple-quotes";

export default function SimpleQuoteForm({ slug }: { slug: string }) {
  const config = SIMPLE_QUOTE_CONFIGS[slug];
  const [values, setValues] = useState<SimpleQuoteValues>(config?.defaults ?? {});
  const [result, setResult] = useState<SimpleQuoteResult | null>(null);

  if (!config) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(config.calculate(values));
  }

  function reset() {
    setResult(null);
  }

  return (
    <div className="rounded-3xl border border-metro-grey-100 bg-white p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <span className="font-display text-base italic text-metro-orange-600">
                Quick Quote
              </span>
              <h2 className="mt-1 font-display text-2xl font-semibold text-metro-navy-800">
                {config.title} Insurance
              </h2>
              <p className="mt-1 text-sm text-metro-grey-500">
                Answer a few quick questions for an instant indicative premium.
              </p>
            </div>

            {config.questions.map((q) => (
              <div key={q.key}>
                <label className="block text-sm font-semibold text-metro-navy-800">
                  {q.label}
                </label>

                {q.type === "select" ? (
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                    {q.options.map((opt) => (
                      <ChoiceCard
                        key={opt.value}
                        label={opt.label}
                        selected={values[q.key] === opt.value}
                        onSelect={() => setValues((prev) => ({ ...prev, [q.key]: opt.value }))}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-2.5">
                    <div className="text-center font-display text-2xl font-semibold text-metro-navy-800">
                      {formatKES(Number(values[q.key] ?? q.min))}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease ${q.label}`}
                        onClick={() =>
                          setValues((prev) => ({
                            ...prev,
                            [q.key]: Math.max(q.min, Number(prev[q.key] ?? q.min) - q.step),
                          }))
                        }
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-metro-grey-300 text-metro-navy-800 hover:border-metro-orange-500 hover:text-metro-orange-600"
                      >
                        <Minus size={15} />
                      </button>
                      <input
                        type="range"
                        min={q.min}
                        max={q.max}
                        step={q.step}
                        value={Number(values[q.key] ?? q.min)}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [q.key]: Number(e.target.value) }))
                        }
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-metro-grey-100 accent-metro-orange-500"
                      />
                      <button
                        type="button"
                        aria-label={`Increase ${q.label}`}
                        onClick={() =>
                          setValues((prev) => ({
                            ...prev,
                            [q.key]: Math.min(q.max, Number(prev[q.key] ?? q.min) + q.step),
                          }))
                        }
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-metro-grey-300 text-metro-navy-800 hover:border-metro-orange-500 hover:text-metro-orange-600"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Button type="submit" variant="primary" className="w-full">
              Get Instant Estimate
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <CheckCircle2 size={48} className="text-metro-trust-500" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-metro-navy-800">
              Your Estimated Premium
            </h2>
            <p className="mt-2 max-w-md text-sm text-metro-grey-500">
              Based on the details you shared, here&apos;s your indicative annual premium.
            </p>

            <div className="mt-6 w-full max-w-sm rounded-2xl border-2 border-metro-orange-500/30 bg-metro-orange-500/5 px-6 py-8">
              <p className="font-display text-4xl font-bold text-metro-orange-600">
                {formatKES(result.central)}
              </p>
              <p className="mt-1 text-xs text-metro-grey-500">
                Estimated range {formatKES(result.min)} – {formatKES(result.max)} / year
              </p>
            </div>

            {result.notes.map((note) => (
              <div
                key={note}
                className="mt-4 flex w-full max-w-sm items-start gap-2 rounded-lg bg-metro-grey-50 p-3 text-left text-xs leading-relaxed text-metro-grey-700"
              >
                <Info size={14} className="mt-0.5 shrink-0 text-metro-orange-500" />
                {note}
              </div>
            ))}

            <div className="mt-2 flex w-full max-w-sm items-start gap-2 rounded-lg bg-metro-navy-800/5 p-3 text-left text-xs leading-relaxed text-metro-grey-700">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-metro-navy-600" />
              This is an indicative estimate. A licensed advisor will confirm your final
              premium with our underwriting partners before you commit to anything.
            </div>

            <div className="mt-6 w-full max-w-sm">
              <PayWithMpesa
                amount={result.central}
                reference={config.title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)}
                description={`${config.title} Insurance`}
              />
            </div>

            <Button type="button" variant="secondary" className="mt-6" onClick={reset}>
              Get Another Estimate
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
