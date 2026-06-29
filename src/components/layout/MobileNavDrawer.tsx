"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/data/nav";
import Button from "../ui/Button";

export default function MobileNavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-metro-navy-800/60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-metro-grey-100 px-6 py-5">
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-metro-grey-700">
                Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 text-metro-grey-700 hover:bg-metro-grey-50"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-lg px-3 py-3 font-display text-base font-semibold text-metro-grey-900 hover:bg-metro-orange-500/10 hover:text-metro-orange-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 px-4">
              <Link href="/quote" onClick={onClose}>
                <Button variant="primary" className="w-full">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/claim" onClick={onClose}>
                <Button variant="secondary" className="w-full">
                  Report a Claim
                </Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
