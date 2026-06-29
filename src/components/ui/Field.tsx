import { cn } from "@/lib/utils";

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

function FieldWrapper({ label, htmlFor, error, children, className }: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-metro-grey-700">
        {label}
      </label>
      {children}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </div>
  );
}

const fieldClasses =
  "w-full rounded-lg border border-metro-grey-300 bg-white px-4 py-2.5 text-sm text-metro-grey-900 outline-none transition-colors duration-200 focus:border-metro-orange-500 focus:ring-2 focus:ring-metro-orange-500/20";

export function Input({
  label,
  id,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string; error?: string }) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error}>
      <input id={id} className={cn(fieldClasses, className)} {...props} />
    </FieldWrapper>
  );
}

export function Select({
  label,
  id,
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  error?: string;
}) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error}>
      <select id={id} className={cn(fieldClasses, className)} {...props}>
        {children}
      </select>
    </FieldWrapper>
  );
}

export function Textarea({
  label,
  id,
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  error?: string;
}) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error}>
      <textarea id={id} className={cn(fieldClasses, "min-h-32 resize-none", className)} {...props} />
    </FieldWrapper>
  );
}
