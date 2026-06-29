import { cn } from "@/lib/utils";

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-metro-grey-100 bg-metro-grey-50 px-3.5 py-1.5 text-sm font-medium text-metro-grey-700",
        className
      )}
    >
      {children}
    </span>
  );
}
