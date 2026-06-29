"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isValidEmail, isValidKenyanPhone } from "@/lib/utils";
import { calculateMotorQuote, emptyAddons, VALUE_MIN } from "@/lib/motor-quote";
import Button from "@/components/ui/Button";
import WizardProgress from "./WizardProgress";
import VehicleStep from "./steps/VehicleStep";
import UsageStep from "./steps/UsageStep";
import CoverTypeStep from "./steps/CoverTypeStep";
import DriverStep from "./steps/DriverStep";
import AddonsStep from "./steps/AddonsStep";
import ContactStep from "./steps/ContactStep";
import QuoteResult from "./QuoteResult";
import type { MotorAddonKey, MotorQuoteResult, MotorQuoteValues } from "@/types";

const STEP_LABELS = ["Vehicle", "Usage", "Cover Type", "Driver Profile", "Add-ons", "Contact"];

const INITIAL_VALUES: MotorQuoteValues = {
  year: "",
  make: "",
  model: "",
  value: 1_500_000,
  usage: "",
  coverType: "",
  driverAge: "",
  drivingExperience: "",
  claimsHistory: "",
  addons: emptyAddons(),
  name: "",
  email: "",
  phone: "",
  contactMethod: "",
  contactTime: "",
};

type Errors = Partial<Record<keyof MotorQuoteValues, string>>;

export default function MotorQuoteWizard() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<MotorQuoteValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<MotorQuoteResult | null>(null);

  function update<K extends keyof MotorQuoteValues>(key: K, value: MotorQuoteValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function updateAddon(key: MotorAddonKey, value: boolean) {
    setValues((prev) => ({ ...prev, addons: { ...prev.addons, [key]: value } }));
  }

  function validateStep(index: number): Errors {
    const next: Errors = {};
    const currentYear = new Date().getFullYear();

    if (index === 0) {
      const yearNum = Number(values.year);
      if (!values.year.trim() || !Number.isInteger(yearNum) || yearNum < 1980 || yearNum > currentYear + 1) {
        next.year = "Enter a valid year of manufacture.";
      }
      if (!values.make.trim()) next.make = "Tell us the make of your car.";
      if (!values.model.trim()) next.model = "Tell us the model of your car.";
      if (values.value < VALUE_MIN) next.value = "Enter a valid estimated value.";
    }
    if (index === 1 && !values.usage) next.usage = "Select how the car is used.";
    if (index === 2 && !values.coverType) next.coverType = "Select a cover type.";
    if (index === 3) {
      if (!values.driverAge) next.driverAge = "Select the main driver's age.";
      if (!values.drivingExperience) next.drivingExperience = "Select driving experience.";
      if (!values.claimsHistory) next.claimsHistory = "Select claims history.";
    }
    if (index === 5) {
      if (!values.name.trim()) next.name = "Tell us your name.";
      if (!isValidKenyanPhone(values.phone)) next.phone = "Enter a valid phone number.";
      if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
      if (!values.contactMethod) next.contactMethod = "Select a preferred contact method.";
      if (!values.contactTime) next.contactTime = "Select a preferred contact time.";
    }
    return next;
  }

  function goNext() {
    const validation = validateStep(step);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    if (step === STEP_LABELS.length - 1) {
      const quote = calculateMotorQuote(values);
      setResult(quote);
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }

  function reset() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStep(0);
    setResult(null);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-metro-grey-100 bg-white p-6 shadow-xl sm:p-10">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-metro-orange-600 via-metro-orange-500 to-metro-orange-400" />

      <AnimatePresence mode="wait">
        {result ? (
          <QuoteResult
            key="result"
            result={result}
            coverType={values.coverType === "unsure" ? "comprehensive" : values.coverType || "comprehensive"}
            onReset={reset}
          />
        ) : (
          <motion.div key="wizard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WizardProgress steps={STEP_LABELS} currentStep={step} />

            <div className="relative mt-8 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 && <VehicleStep values={values} update={update} errors={errors} />}
                  {step === 1 && <UsageStep values={values} update={update} />}
                  {step === 2 && <CoverTypeStep values={values} update={update} />}
                  {step === 3 && <DriverStep values={values} update={update} />}
                  {step === 4 && <AddonsStep values={values} updateAddon={updateAddon} />}
                  {step === 5 && <ContactStep values={values} update={update} errors={errors} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-metro-grey-100 pt-6">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={goBack} className="gap-1.5">
                  <ChevronLeft size={16} />
                  {step === STEP_LABELS.length - 1 ? "Back to Form" : "Previous"}
                </Button>
              ) : (
                <span />
              )}
              <Button type="button" variant="primary" onClick={goNext} className="gap-1.5">
                {step === STEP_LABELS.length - 1 ? "Submit Request" : "Next"}
                {step < STEP_LABELS.length - 1 && <ChevronRight size={16} />}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
