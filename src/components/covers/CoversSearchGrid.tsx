"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { COVERS } from "@/data/covers";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import CoverCard from "./CoverCard";

export default function CoversSearchGrid() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COVERS;
    return COVERS.filter((cover) => {
      const haystack = [cover.name, cover.hook, ...cover.keywords].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <div>
      <div className="relative mx-auto max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-metro-grey-300"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search covers — e.g. car, health, farm, travel..."
          className="w-full rounded-full border border-metro-grey-300 bg-white py-3 pl-11 pr-4 text-sm text-metro-grey-900 outline-none transition-colors focus:border-metro-orange-500 focus:ring-2 focus:ring-metro-orange-500/20"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-sm text-metro-grey-500">
          No covers match &ldquo;{query}&rdquo;. Try another search term, or{" "}
          <a href="/contact" className="font-semibold text-metro-orange-600">
            ask our team
          </a>
          .
        </p>
      ) : (
        <motion.div
          key={filtered.length}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((cover) => (
            <CoverCard key={cover.slug} cover={cover} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
