"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isValidEmail, isValidKenyanPhone } from "@/lib/utils";
import type { RequestCoverFormValues } from "@/types";
import { Input, Select, Textarea } from "../ui/Field";
import Button from "../ui/Button";
import FormConfirmation from "./FormConfirmation";

const INITIAL_VALUES: RequestCoverFormValues = {
  name: "",
  phone: "",
  email: "",
  requestType: "New Cover",
  details: "",
};

type Errors = Partial<Record<keyof RequestCoverFormValues, string>>;

export default function RequestCoverForm() {
  const [values, setValues] = useState<RequestCoverFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof RequestCoverFormValues>(
    key: K,
    value: RequestCoverFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Tell us your name.";
    if (!isValidKenyanPhone(values.phone)) next.phone = "Enter a valid phone number.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
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
            title="Request Received"
            message="Thanks! Our team will process your request and get back to you shortly."
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
              id="request-name"
              label="Full Name"
              value={values.name}
              error={errors.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <Input
              id="request-phone"
              label="Phone Number"
              type="tel"
              placeholder="07XX XXX XXX"
              value={values.phone}
              error={errors.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <div className="sm:col-span-2">
              <Input
                id="request-email"
                label="Email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Select
                id="request-type"
                label="Request Type"
                value={values.requestType}
                onChange={(e) =>
                  update("requestType", e.target.value as RequestCoverFormValues["requestType"])
                }
              >
                <option value="New Cover">New Cover</option>
                <option value="Insurance Certificate">Insurance Certificate</option>
                <option value="Policy Document">Policy Document</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Textarea
                id="request-details"
                label="Additional Details (optional)"
                value={values.details}
                onChange={(e) => update("details", e.target.value)}
                placeholder="Let us know any specifics about your request..."
              />
            </div>
            <div className="col-span-full flex justify-end">
              <Button type="submit" variant="primary">
                Submit Request
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
