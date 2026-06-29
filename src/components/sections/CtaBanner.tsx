import Link from "next/link";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Magnetic from "../ui/Magnetic";
import GlowOrbs from "../ui/GlowOrbs";

export default function CtaBanner({
  title = "Ready to get covered?",
  subtitle = "Talk to our team today and find the right policy for your needs and budget.",
  quoteHref = "/quote",
}: {
  title?: string;
  subtitle?: string;
  quoteHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-metro-navy-800 py-16">
      <GlowOrbs palette="navy" />
      <Container className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm text-metro-grey-300">{subtitle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Link href={quoteHref}>
                <Button
                  variant="primary"
                  className="shadow-[0_0_30px_rgba(244,121,31,0.35)]"
                >
                  Request a Quote
                </Button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-metro-navy-800"
                >
                  Talk to an Advisor
                </Button>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
