/**
 * Badge — small label for status, category, or pricing tags.
 *
 * @status scaffold
 */

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
      {children}
    </span>
  );
}
