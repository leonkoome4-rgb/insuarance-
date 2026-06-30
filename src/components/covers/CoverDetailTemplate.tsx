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
        subtitle="Get an instant premium estimate in minutes — answer a few quick questions to get started."
        quoteHref={cover.slug === "motor" ? "/quote/motor" : `/quote/${cover.slug}`}
      />
    </>
  );
}
