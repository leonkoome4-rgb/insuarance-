import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import RequestCoverForm from "@/components/forms/RequestCoverForm";

export const metadata: Metadata = {
  title: "Request for Cover / Certificates",
  description:
    "Request new cover, an insurance certificate, or a policy document from Super Metro Insurance Agency.",
};

export default function RequestCoverPage() {
  return (
    <section className="bg-metro-grey-50 py-16">
      <Container>
        <div className="flex items-center gap-2 text-sm text-metro-grey-500">
          <Link href="/" className="hover:text-metro-orange-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-metro-navy-800">
            Request for Cover / Certificates
          </span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <span className="font-display text-base italic text-metro-orange-600">
              Documentation
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
              Request for Cover / Certificates
            </h1>
            <p className="mt-5 text-base leading-relaxed text-metro-grey-700">
              Need a new cover, an insurance certificate, or a copy of your
              policy document? Submit your request below and our team will
              process it promptly.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <RequestCoverForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
