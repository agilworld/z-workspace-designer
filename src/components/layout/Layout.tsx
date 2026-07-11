/**
 * Layout — revamped layout with workspace at top, product scroller
 * and summary panel at the bottom in a white-bordered row.
 *
 * Structure:
 *   Header (sticky top)
 *   Title area ("Design Your Workspace!", white bg)
 *   WorkspaceArea (flex-1, full width, gradient bg)
 *   ──────────────────────────────────────────
 *   [ProductScroller (flex-1) | SummaryPanel (w-72)]  ← bottom row, white bg
 *
 * On screens smaller than 1024px, shows a mobile-friendly message
 * directing users to visit on desktop for the full experience.
 *
 * @status updated — revamped layout (summary to bottom, white backgrounds)
 */

interface LayoutProps {
  /** Sticky header rendered at the top of the viewport. */
  header: React.ReactNode;
  /** The workspace area (DeskBox, ChairBox, AccessoryBox). */
  workspace: React.ReactNode;
  /** Right panel — rental summary & pricing. */
  summary: React.ReactNode;
  /** Title area rendered above the workspace. */
  title?: React.ReactNode;
  /** Bottom scroller area (ProductScroller). */
  scroller?: React.ReactNode;
}

export function Layout({ header, workspace, summary, title, scroller }: LayoutProps) {
  return (
    <>
      {/* ── Mobile message (<1024px) ─────────────────── */}
      <div className="lg:hidden flex h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-8 text-center">
        <div className="mx-auto max-w-sm animate-fadeIn">
          {/* Branding */}
          <div className="mb-8">
            <span className="text-2xl font-bold text-slate-900">Z.Interactive</span>
          </div>

          {/* Illustration placeholder */}
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-white shadow-lg">
            <span className="text-5xl" role="img" aria-label="Workspace">
              🖥️
            </span>
          </div>

          <h1 className="mb-3 text-xl font-semibold text-slate-800">
            Workspace Designer
          </h1>

          <p className="mb-2 text-sm leading-relaxed text-slate-500">
            This workspace designer works best on desktop.
            Please visit on a larger screen for the full experience.
          </p>

          <p className="text-xs text-slate-400">
            Pick your desk, chair, and accessories — then rent it all with Z.Interactive
          </p>

          {/* Decorative dots */}
          <div className="mt-8 flex justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>

      {/* ── Desktop layout (≥1024px) ─────────────────── */}
      <div className="hidden lg:flex h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-white">
        {header}

        {/* ── Title area ─────────────────────────────────── */}
        {title && (
          <div className="relative z-10 border-b border-slate-200 bg-white px-6 py-4 text-center">
            {title}
          </div>
        )}

        {/* ── Workspace Area (full width, gradient) ──────────── */}
        <div className="relative z-10 flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/50 to-white">
          <div className="p-4">
            {workspace}
          </div>
        </div>

        {/* ── Bottom row: Product Scroller (left) + Summary (right) ── */}
        <div className="relative z-10 flex shrink-0 bg-white border-t border-slate-200">
          <div className="flex-1 px-6 py-3 overflow-hidden">
            {scroller}
          </div>
          <div className="w-72 shrink-0 border-l border-slate-200 p-4 overflow-y-auto">
            {summary}
          </div>
        </div>
      </div>
    </>
  );
}
