import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { PHONE_NUMBERS, COMPANY_EMAIL } from "@/data/nav";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Super Metro Insurance Agency — call, email, or send us a message and our team will respond promptly.",
};

export default function ContactPage() {
  return (
    <section className="bg-metro-grey-50 py-16">
      <Container>
        <div className="flex items-center gap-2 text-sm text-metro-grey-500">
          <Link href="/" className="hover:text-metro-orange-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-metro-navy-800">Contact Us</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <span className="font-display text-base italic text-metro-orange-600">
              Get in Touch
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mt-5 text-base leading-relaxed text-metro-grey-700">
              Whether you need a quote, want to report a claim, or just have a
              question about cover — our team is ready to help.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-metro-orange-500" />
                <div>
                  {PHONE_NUMBERS.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="block text-sm text-metro-grey-700 hover:text-metro-orange-600"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-metro-orange-500" />
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-sm text-metro-grey-700 hover:text-metro-orange-600"
                >
                  {COMPANY_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-metro-orange-500" />
                <p className="text-sm text-metro-grey-700">Nairobi, Kenya</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
