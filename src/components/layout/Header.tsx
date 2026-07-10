/**
 * Header — minimal top navigation bar with branding.
 *
 * Renders the monis.rent brand name alongside "Workspace Designer".
 * Uses glass-morphism style. Actions like Clear All are now in
 * the SummaryPanel or canvas.
 *
 * @status updated — more minimal
 */

'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3">
        {/* ── Branding ───────────────────────────────── */}
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            monis.rent
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
