export const inputClass =
  "w-full rounded-lg border border-unir-mist px-3 py-2 text-sm outline-none focus:border-unir-amber focus:ring-2 focus:ring-unir-amber/30";

export const textareaClass = `${inputClass} min-h-24`;

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-unir-ink">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-unir-gray">{hint}</p>}
    </div>
  );
}
