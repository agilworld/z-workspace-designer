/**
 * Layout — three-column app shell.
 *
 * Structure:
 *   Header (sticky top)
 *   ├── Sidebar (w-72, overflow-y-auto, glass)
 *   ├── Canvas  (flex-1, relative)
 *   └── Summary (w-80, overflow-y-auto, glass)
 *
 * On screens smaller than 1024px, shows a mobile-friendly message
 * directing users to visit on desktop for the full experience.
 *
 * @status implemented
 */

interface LayoutProps {
  /** Sticky header rendered at the top of the viewport. */
  header: React.ReactNode;
  /** Left panel — product catalog / palette. */
  sidebar: React.ReactNode;
  /** Center panel — the interactive workspace canvas. */
  canvas: React.ReactNode;
  /** Right panel — rental summary & pricing. */
  summary: React.ReactNode;
}

export function Layout({ header, sidebar, canvas, summary }: LayoutProps) {
  return (
    <>
      {/* ── Mobile message (<1024px) ─────────────────── */}
      <div className="lg:hidden flex h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-8 text-center">
        <div className="mx-auto max-w-sm animate-fadeIn">
          {/* Branding */}
          <div className="mb-8">
            <span className="text-2xl font-bold text-slate-900">monis.rent</span>
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
            Drag, arrange, and rent your dream workspace with monis.rent
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
      <div className="hidden lg:flex h-screen flex-col overflow-hidden">
        {header}

        <div className="flex flex-1 overflow-hidden">
          {/* ── Sidebar ─────────────────────────────────── */}
          <div className="w-72 shrink-0 border-r border-slate-200">
            {sidebar}
          </div>

          {/* ── Canvas ──────────────────────────────────── */}
          <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50">
            {canvas}
          </div>

          {/* ── Summary ─────────────────────────────────── */}
          <div className="w-80 shrink-0 border-l border-slate-200">
            {summary}
          </div>
        </div>
      </div>
    </>
  );
}
