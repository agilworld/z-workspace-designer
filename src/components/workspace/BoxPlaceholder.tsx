/**
 * BoxPlaceholder — reusable empty-state placeholder for slots.
 *
 * Shows a dashed-border box with an icon and label when nothing is selected.
 *
 * @status new
 */

interface BoxPlaceholderProps {
  /** Icon to display (emoji or text). */
  icon: string;
  /** Label text describing what goes here. */
  label: string;
  /** Optional sub-label for more context (e.g. "Select from the scroller below"). */
  sublabel?: string;
}

export function BoxPlaceholder({ icon, label, sublabel }: BoxPlaceholderProps) {
  return (
    <div className="flex h-full min-h-[100px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-4 text-center transition-colors hover:border-slate-400">
      <span className="mb-2 text-3xl" role="img" aria-label={label}>
        {icon}
      </span>
      <p className="text-sm font-medium text-slate-400">{label}</p>
      {sublabel && (
        <p className="mt-1 text-[11px] text-slate-300">{sublabel}</p>
      )}
    </div>
  );
}
