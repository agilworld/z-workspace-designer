/**
 * EmptyState — shown when the canvas has no items.
 *
 * @status scaffold
 */

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <p className="text-sm text-text-muted">Drag products here to design your workspace</p>
    </div>
  );
}
