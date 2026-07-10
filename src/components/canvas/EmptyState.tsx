/**
 * EmptyState — shown when the canvas has no items placed on it.
 *
 * Renders a centred prompt with a large decorating emoji, heading, and subtitle.
 * Uses `pointer-events-none` so clicks pass through to the canvas (handy for
 * de-selection when the empty state is visible).
 *
 * @status implemented
 */

export function EmptyState() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-6xl" role="img" aria-label="Art palette">
        🎨
      </span>
      <h2 className="mt-4 text-xl font-semibold text-slate-600">
        Design Your Workspace
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        Select a desk from the sidebar to get started!
      </p>
    </div>
  );
}
