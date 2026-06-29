import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { FOOTER_LINKS, PHONE_NUMBERS, COMPANY_EMAIL, SOCIAL_LINKS } from "@/data/nav";
import { COVERS } from "@/data/covers";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./SocialIcons";
import Container from "../ui/Container";

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
};

export default function Footer() {
  return (
    <footer className="bg-metro-navy-800 text-metro-grey-300">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rounded-lg bg-white px-3 py-2">
            <Image
              src="/logo.png"
              alt="Super Metro Insurance Agency"
              width={318}
              height={116}
              className="h-12 w-auto"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-metro-grey-300">
            Your Trusted Insurance Partner — All Classes, One Agency.
          </p>
          <div className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-metro-grey-300 transition-colors hover:border-metro-orange-500 hover:bg-metro-orange-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Useful Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-metro-grey-300 hover:text-metro-orange-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Our Covers
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {COVERS.map((cover) => (
              <li key={cover.slug}>
                <Link
                  href={`/covers/${cover.slug}`}
                  className="text-sm text-metro-grey-300 hover:text-metro-orange-400"
                >
                  {cover.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {PHONE_NUMBERS.map((phone) => (
              <li key={phone} className="flex items-center gap-2 text-sm text-metro-grey-300">
                <Phone size={15} className="text-metro-orange-400" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-metro-orange-400">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm text-metro-grey-300">
              <Mail size={15} className="text-metro-orange-400" />
              <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-metro-orange-400">
                {COMPANY_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-metro-grey-500 sm:flex-row">
          <p>Copyright © Super Metro Insurance Agency {new Date().getFullYear()}. All rights reserved.</p>
          <p>Licensed Intermediary, regulated by the Insurance Regulatory Authority (IRA).</p>
        </Container>
      </div>
    </footer>
  );
}
