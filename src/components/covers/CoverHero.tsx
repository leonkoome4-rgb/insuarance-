import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Mail } from "lucide-react";
import type { Cover } from "@/types";
import { PHONE_NUMBERS, COMPANY_EMAIL } from "@/data/nav";
import { COVER_HERO_PHOTOS } from "@/lib/cover-photos";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

export default function CoverHero({ cover }: { cover: Cover }) {
  const heroPhoto = COVER_HERO_PHOTOS[cover.slug];

  return (
    <section className="bg-metro-grey-50 pb-16 pt-10">
      <Container>
        <div className="flex items-center gap-2 text-sm text-metro-grey-500">
          <Link href="/" className="hover:text-metro-orange-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/covers" className="hover:text-metro-orange-600">
            Our Covers
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-metro-navy-800">{cover.name}</span>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="font-display text-base italic text-metro-orange-600">
              Cover Overview
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-metro-navy-800 sm:text-4xl">
              {cover.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-metro-grey-700">
              {cover.overview}
            </p>

            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-metro-grey-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-sm font-semibold text-metro-navy-800">
                  Need Assistance?
                </p>
                <div className="mt-2 flex flex-col gap-1.5 text-sm text-metro-grey-500">
                  {PHONE_NUMBERS.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 hover:text-metro-orange-600"
                    >
                      <Phone size={14} className="text-metro-orange-500" />
                      {phone}
                    </a>
                  ))}
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="flex items-center gap-2 hover:text-metro-orange-600"
                  >
                    <Mail size={14} className="text-metro-orange-500" />
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </div>
              <Link href={cover.slug === "motor" ? "/quote/motor" : `/quote/${cover.slug}`}>
                <Button variant="primary" className="w-full sm:w-auto">
                  {cover.ctaLabel === "Learn More" ? "Get a Quote" : cover.ctaLabel}
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={heroPhoto?.src ?? cover.illustration}
                alt={heroPhoto?.alt ?? `${cover.name} illustration`}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
