import { cn } from "@/lib/utils";

const PALETTES = {
  navy: ["bg-metro-orange-500/30", "bg-metro-navy-600/40"],
  light: ["bg-metro-orange-500/15", "bg-metro-navy-600/10"],
} as const;

export default function GlowOrbs({
  palette = "navy",
  className,
}: {
  palette?: keyof typeof PALETTES;
  className?: string;
}) {
  const [first, second] = PALETTES[palette];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "animate-aurora-1 absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full blur-3xl",
          first
        )}
      />
      <div
        className={cn(
          "animate-aurora-2 absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full blur-3xl",
          second
        )}
      />
    </div>
  );
}
