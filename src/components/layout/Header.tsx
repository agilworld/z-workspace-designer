/**
 * Header — minimal top navigation bar with branding.
 *
 * Renders the Z.Interactive brand name alongside "Workspace Designer".
 *
 * @status updated — rebranded to Z.Interactive
 */

'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* ── Branding ───────────────────────────────── */}
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Z.Interactive
          </span>
          <span className="hidden h-4 w-px bg-slate-300/60 sm:block" />
          <span className="hidden text-sm font-medium text-slate-500 sm:inline">
            Workspace Designer
          </span>
        </div>
      </div>
    </header>
  );
}
