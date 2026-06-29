"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Cover } from "@/types";
import { fadeUp } from "@/lib/animations";
import { COVER_HERO_PHOTOS } from "@/lib/cover-photos";

export default function CoverCard({
  cover,
  usePhoto = false,
}: {
  cover: Cover;
  usePhoto?: boolean;
}) {
  const photo = usePhoto ? COVER_HERO_PHOTOS[cover.slug] : undefined;

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/covers/${cover.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-metro-grey-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-metro-orange-500/30 hover:shadow-xl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={photo?.src ?? cover.illustration}
            alt={photo?.alt ?? `${cover.name} illustration`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold text-metro-navy-800">
            {cover.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-metro-grey-500">
            {cover.hook}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-metro-orange-600 group-hover:gap-2.5 transition-all">
            {cover.ctaLabel}
            <ArrowRight size={15} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
