import Reveal from "./Reveal";
import RevealLines from "./RevealLines";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal delay={0}>
          <span
            className={cn(
              "font-display text-base italic",
              light ? "text-metro-orange-400" : "text-metro-orange-600"
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <RevealLines
        as="h2"
        delay={0.1}
        lines={[title]}
        className={cn(
          "mt-2 font-display text-3xl font-semibold sm:text-4xl",
          light ? "text-white" : "text-metro-navy-800"
        )}
      />
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-4 font-body text-base leading-relaxed",
              light ? "text-metro-grey-300" : "text-metro-grey-500"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
