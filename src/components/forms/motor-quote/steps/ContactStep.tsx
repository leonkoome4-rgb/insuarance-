"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { Input } from "@/components/ui/Field";
import ChoiceCard from "../ChoiceCard";
import { ADDON_LABELS, formatKES } from "@/lib/motor-quote";
import { COVER_TYPE_LABELS, USAGE_LABELS } from "@/lib/motor-quote-labels";
import type { ContactMethod, ContactTime, MotorAddonKey, MotorQuoteValues } from "@/types";

const CONTACT_METHODS: { value: ContactMethod; label: string; icon: typeof Mail }[] = [
  { value: "email", label: "Email", icon: Mail },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "phone", label: "Phone", icon: Phone },
];

const CONTACT_TIMES: { value: ContactTime; label: string }[] = [
  { value: "anytime", label: "Anytime" },
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 5pm)" },
  { value: "evening", label: "Evening (5pm – 8pm)" },
];

export default function ContactStep({
  values,
  update,
  errors,
}: {
  values: MotorQuoteValues;
  update: <K extends keyof MotorQuoteValues>(key: K, value: MotorQuoteValues[K]) => void;
  errors: Partial<Record<keyof MotorQuoteValues, string>>;
}) {
  const selectedAddons = (Object.keys(values.addons) as MotorAddonKey[]).filter(
    (key) => values.addons[key]
  );

  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-metro-navy-800">
        Request a Quote for Motor Vehicle Insurance
      </h2>
      <p className="mt-1 text-sm text-metro-grey-500">
        Please provide your contact details so we can send you a personalized quote.
      </p>

      <div className="mt-5 rounded-2xl border border-metro-grey-100 bg-metro-grey-50 p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-metro-navy-800">
          Your Motor Insurance Selections
        </h3>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-metro-grey-500">Vehicle</dt>
            <dd className="font-medium text-metro-navy-800">
              {values.year} {values.make} {values.model}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-metro-grey-500">Estimated Value</dt>
            <dd className="font-medium text-metro-navy-800">{formatKES(values.value)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-metro-grey-500">Cover Type</dt>
            <dd className="font-medium text-metro-navy-800">
              {values.coverType ? COVER_TYPE_LABELS[values.coverType] : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-metro-grey-500">Primary Use</dt>
            <dd className="font-medium text-metro-navy-800">
              {values.usage ? USAGE_LABELS[values.usage] : "—"}
            </dd>
          </div>
          {selectedAddons.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-metro-grey-500">
                Additional Covers
              </dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {selectedAddons.map((key) => (
                  <span
                    key={key}
                    className="rounded-full bg-metro-orange-500/10 px-3 py-1 text-xs font-medium text-metro-orange-600"
                  >
                    {ADDON_LABELS[key]}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Input
          id="contact-name"
          label="Full Name"
          value={values.name}
          error={errors.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <Input
          id="contact-phone"
          label="Phone Number"
          type="tel"
          placeholder="07XX XXX XXX"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <div className="sm:col-span-2">
          <Input
            id="contact-email"
            label="Email"
            type="email"
            value={values.email}
            error={errors.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-sm font-semibold text-metro-navy-800">
          Preferred Contact Method
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {CONTACT_METHODS.map((method) => (
            <ChoiceCard
              key={method.value}
              label={method.label}
              icon={method.icon}
              selected={values.contactMethod === method.value}
              onSelect={() => update("contactMethod", method.value)}
            />
          ))}
        </div>
        {errors.contactMethod && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.contactMethod}</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-display text-sm font-semibold text-metro-navy-800">
          Preferred Contact Time
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_TIMES.map((time) => (
            <ChoiceCard
              key={time.value}
              label={time.label}
              selected={values.contactTime === time.value}
              onSelect={() => update("contactTime", time.value)}
            />
          ))}
        </div>
        {errors.contactTime && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.contactTime}</p>
        )}
      </div>
    </div>
  );
}
