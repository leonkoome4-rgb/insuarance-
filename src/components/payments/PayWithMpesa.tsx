"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Loader2, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { formatKES } from "@/lib/motor-quote";

type PayState = "idle" | "submitting" | "awaiting" | "success" | "failed";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 20;

export default function PayWithMpesa({
  amount,
  reference,
  description,
}: {
  amount: number;
  reference: string;
  description: string;
}) {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<PayState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const pollCount = useRef(0);
  const generation = useRef(0);

  async function poll(checkoutRequestId: string, gen: number) {
    if (gen !== generation.current) return; // a newer attempt superseded this one
    pollCount.current += 1;

    try {
      const res = await fetch("/api/mpesa/stk-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutRequestId }),
      });
      const data = await res.json();
      if (gen !== generation.current) return;

      if (data.status === "success") {
        setState("success");
        setMessage(data.resultDesc ?? "Payment received.");
        return;
      }
      if (data.status === "failed") {
        setState("failed");
        setMessage(data.resultDesc ?? "Payment could not be completed.");
        return;
      }
    } catch {
      // network hiccup — keep polling until MAX_POLLS
    }

    if (gen !== generation.current) return;

    if (pollCount.current >= MAX_POLLS) {
      setState("failed");
      setMessage("We didn't get a response in time. Please try again.");
      return;
    }

    setTimeout(() => poll(checkoutRequestId, gen), POLL_INTERVAL_MS);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const gen = ++generation.current; // invalidate any poll loop from a previous attempt
    setState("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount, reference, description }),
      });
      const data = await res.json();
      if (gen !== generation.current) return;

      if (!res.ok) {
        setState("failed");
        setMessage(data.error ?? "Failed to start payment.");
        return;
      }

      pollCount.current = 0;
      setState("awaiting");
      setTimeout(() => poll(data.checkoutRequestId, gen), POLL_INTERVAL_MS);
    } catch {
      if (gen !== generation.current) return;
      setState("failed");
      setMessage("Couldn't reach the payment service. Please try again.");
    }
  }

  function reset() {
    generation.current += 1; // invalidate any in-flight poll loop
    setState("idle");
    setMessage(null);
    pollCount.current = 0;
  }

  return (
    <div className="rounded-2xl border border-metro-grey-100 bg-white p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-metro-navy-800">
        <Smartphone size={18} className="text-metro-trust-500" />
        Pay with M-Pesa
        <span className="ml-auto rounded-full bg-metro-trust-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-metro-trust-600">
          Sandbox Test
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-metro-grey-500">
        This triggers a real M-Pesa STK prompt on Safaricom&apos;s test network — no real money
        moves.
      </p>

      <AnimatePresence mode="wait">
        {state === "idle" || state === "submitting" ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="mt-4"
          >
            <div className="flex items-center justify-between rounded-xl bg-metro-grey-50 px-4 py-3 text-sm">
              <span className="text-metro-grey-700">Amount</span>
              <span className="font-display text-base font-semibold text-metro-navy-800">
                {formatKES(amount)}
              </span>
            </div>

            <label className="mt-3 block text-xs font-semibold text-metro-grey-700">
              M-Pesa Phone Number
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                className="mt-1.5 w-full rounded-lg border border-metro-grey-300 bg-white px-3.5 py-2.5 text-sm text-metro-grey-900 outline-none transition-colors focus:border-metro-orange-500 focus:ring-2 focus:ring-metro-orange-500/20"
              />
            </label>

            <button
              type="submit"
              disabled={state === "submitting"}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-metro-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-metro-orange-600 disabled:opacity-60"
            >
              {state === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending prompt...
                </>
              ) : (
                "Send STK Push"
              )}
            </button>
          </motion.form>
        ) : null}

        {state === "awaiting" ? (
          <motion.div
            key="awaiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex flex-col items-center gap-3 py-6 text-center"
          >
            <Loader2 size={32} className="animate-spin text-metro-trust-500" />
            <p className="text-sm font-semibold text-metro-navy-800">
              Check your phone for the M-Pesa prompt
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-metro-grey-500">
              Enter your M-Pesa PIN on the test prompt to complete this sandbox payment.
            </p>
          </motion.div>
        ) : null}

        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex flex-col items-center gap-2 py-6 text-center"
          >
            <CheckCircle2 size={40} className="text-metro-trust-500" />
            <p className="text-sm font-semibold text-metro-navy-800">Payment received</p>
            <p className="max-w-xs text-xs leading-relaxed text-metro-grey-500">{message}</p>
          </motion.div>
        ) : null}

        {state === "failed" ? (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex flex-col items-center gap-2 py-6 text-center"
          >
            <XCircle size={40} className="text-metro-grey-500" />
            <p className="text-sm font-semibold text-metro-navy-800">Payment not completed</p>
            <p className="max-w-xs text-xs leading-relaxed text-metro-grey-500">{message}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-full border border-metro-grey-300 px-4 py-2 text-xs font-semibold text-metro-navy-800 transition-colors hover:border-metro-orange-500 hover:text-metro-orange-600"
            >
              Try Again
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-metro-grey-500">
        <ShieldCheck size={12} className="text-metro-trust-500" />
        Secured by Safaricom Daraja — sandbox environment
      </p>
    </div>
  );
}
