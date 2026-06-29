import type { Cover } from "@/types";
import CoverHero from "./CoverHero";
import KeyCovers from "./KeyCovers";
import InsuranceProcess from "../sections/InsuranceProcess";
import CtaBanner from "../sections/CtaBanner";

export default function CoverDetailTemplate({ cover }: { cover: Cover }) {
  return (
    <>
      <CoverHero cover={cover} />
      <KeyCovers cover={cover} />
      <InsuranceProcess />
      <CtaBanner
        title={`Protect what matters with ${cover.name}`}
        subtitle={
          cover.slug === "motor"
            ? "Get an instant premium estimate in minutes — answer a few quick questions about your car."
            : "Get a tailored quote in minutes — our team will match you with the right underwriter."
        }
        quoteHref={cover.slug === "motor" ? "/quote/motor" : "/contact"}
      />
    </>
  );
}
