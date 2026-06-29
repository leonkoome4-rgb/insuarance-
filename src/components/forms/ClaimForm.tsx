"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isValidKenyanPhone } from "@/lib/utils";
import type { ClaimFormValues } from "@/types";
import { COVERS } from "@/data/covers";
import { Input, Select, Textarea } from "../ui/Field";
import Button from "../ui/Button";
import FormConfirmation from "./FormConfirmation";

const INITIAL_VALUES: ClaimFormValues = {
  name: "",
  phone: "",
  policyNumber: "",
  cover: "",
  incidentDate: "",
  details: "",
};

type Errors = Partial<Record<keyof ClaimFormValues, string>>;

export default function ClaimForm() {
  const [values, setValues] = useState<ClaimFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof ClaimFormValues>(key: K, value: ClaimFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Tell us your name.";
    if (!isValidKenyanPhone(values.phone)) next.phone = "Enter a valid phone number.";
    if (!values.policyNumber.trim()) next.policyNumber = "Enter your policy number.";
    if (!values.cover) next.cover = "Select a cover type.";
    if (!values.incidentDate) next.incidentDate = "Select the incident date.";
    if (!values.details.trim() || values.details.trim().length < 10) {
      next.details = "Describe what happened in a few sentences.";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) setSubmitted(true);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-metro-grey-100 bg-white p-6 shadow-xl sm:p-10">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-metro-orange-500" />
      <AnimatePresence mode="wait">
        {submitted ? (
          <FormConfirmation
            title="Claim Reported"
            message="We've received your claim details. Our claims team will contact you shortly to guide you through next steps."
            onReset={() => {
              setSubmitted(false);
              setValues(INITIAL_VALUES);
            }}
          />
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            <Input
              id="claim-name"
              label="Full Name"
              value={values.name}
              error={errors.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <Input
              id="claim-phone"
              label="Phone Number"
              type="tel"
              placeholder="07XX XXX XXX"
              value={values.phone}
              error={errors.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <Input
              id="claim-policy"
              label="Policy Number"
              value={values.policyNumber}
              error={errors.policyNumber}
              onChange={(e) => update("policyNumber", e.target.value)}
            />
            <Select
              id="claim-cover"
              label="Cover Type"
              value={values.cover}
              error={errors.cover}
              onChange={(e) => update("cover", e.target.value)}
            >
              <option value="">Select a cover...</option>
              {COVERS.map((cover) => (
                <option key={cover.slug} value={cover.slug}>
                  {cover.name}
                </option>
              ))}
            </Select>
            <div className="sm:col-span-2">
              <Input
                id="claim-date"
                label="Date of Incident"
                type="date"
                value={values.incidentDate}
                error={errors.incidentDate}
                onChange={(e) => update("incidentDate", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                id="claim-details"
                label="What Happened?"
                value={values.details}
                error={errors.details}
                onChange={(e) => update("details", e.target.value)}
                placeholder="Briefly describe the incident..."
              />
            </div>
            <div className="col-span-full flex justify-end">
              <Button type="submit" variant="primary">
                Report a Claim
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
