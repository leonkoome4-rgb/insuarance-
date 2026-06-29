import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import { PHONE_NUMBERS, COMPANY_EMAIL } from "@/data/nav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Super Metro Insurance Agency | Your Trusted Insurance Partner",
    template: "%s | Super Metro Insurance Agency",
  },
  description:
    "Super Metro Insurance Agency — a licensed Kenyan insurance intermediary offering Motor, Home, Business, Travel, Agriculture, Life, Health, Marine and Aviation cover, all classes, one agency.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Super Metro Insurance Agency | Your Trusted Insurance Partner",
    description: "All classes of insurance, one agency. Licensed by the Insurance Regulatory Authority (IRA).",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: "Super Metro Insurance Agency",
    description:
      "Licensed Kenyan insurance intermediary offering all classes of insurance, including Motor, Home & Property, Business & Commercial, Travel & Personal, Agriculture, Life & Savings, Health, Marine and Aviation cover.",
    telephone: PHONE_NUMBERS[0],
    email: COMPANY_EMAIL,
    areaServed: "KE",
    foundingDate: "2023",
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-metro-white text-metro-grey-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
