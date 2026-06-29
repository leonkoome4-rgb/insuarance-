"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, Phone, FileWarning } from "lucide-react";
import { NAV_LINKS, PHONE_NUMBERS } from "@/data/nav";
import { cn } from "@/lib/utils";
import Button from "../ui/Button";
import Magnetic from "../ui/Magnetic";
import MobileNavDrawer from "./MobileNavDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden bg-metro-navy-800 text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-8">
          <a
            href={`tel:${PHONE_NUMBERS[0].replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 text-metro-grey-300 hover:text-metro-orange-400"
          >
            <Phone size={12} />
            {PHONE_NUMBERS[0]}
          </a>
          <Link
            href="/claim"
            className="flex items-center gap-1.5 font-medium text-metro-orange-400 hover:text-metro-orange-500"
          >
            <FileWarning size={12} />
            Report a Claim
          </Link>
        </div>
      </div>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-30 border-b transition-all duration-300",
          scrolled
            ? "border-metro-grey-100 bg-white/80 backdrop-blur-xl shadow-md"
            : "border-transparent bg-white/60 backdrop-blur-md"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 sm:px-8",
            scrolled ? "py-2.5" : "py-3"
          )}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Super Metro Insurance Agency"
              width={318}
              height={116}
              className={cn(
                "w-auto transition-all duration-300",
                scrolled ? "h-10 sm:h-11" : "h-12 sm:h-14"
              )}
              priority
              loading="eager"
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-body text-sm font-semibold text-metro-grey-900 hover:text-metro-orange-600"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-metro-orange-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic strength={0.25}>
              <Link href="/quote">
                <Button variant="primary">Request a Quote</Button>
              </Link>
            </Magnetic>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-metro-grey-900 md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
