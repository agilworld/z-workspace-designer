/**
 * Header — top navigation bar with branding and workspace actions.
 *
 * Renders the monis.rent brand name alongside "Workspace Designer",
 * a snap-to-grid toggle, and a "Clear All" action that shows the
 * current item count. The button is disabled when the workspace is empty.
 *
 * @status implemented
 */

'use client';

import { useWorkspace } from '@/hooks/useWorkspace';

export function Header() {
  const { itemCount, isEmpty, clearAll, toggleSnap, snapToGrid } = useWorkspace();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* ── Branding ───────────────────────────────── */}
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-bold tracking-tight text-slate-900">monis.rent</span>
          <span className="hidden h-4 w-px bg-slate-300 sm:block" />
          <span className="hidden text-sm font-medium text-slate-500 sm:inline">
            Workspace Designer
          </span>
        </div>

        {/* ── Actions ────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Snap-to-grid toggle */}
          <button
            type="button"
            onClick={toggleSnap}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
              snapToGrid
                ? 'bg-blue-50 text-blue-700 shadow-sm hover:bg-blue-100'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="1" width="14" height="14" rx="2" />
              <line x1="5" y1="1" x2="5" y2="15" />
              <line x1="11" y1="1" x2="11" y2="15" />
              <line x1="1" y1="5" x2="15" y2="5" />
              <line x1="1" y1="11" x2="15" y2="11" />
            </svg>
            Snap <span className="font-semibold">{snapToGrid ? 'ON' : 'OFF'}</span>
          </button>

          {/* Clear All button */}
          <button
            type="button"
            onClick={clearAll}
            disabled={isEmpty}
            className="group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear All
            {!isEmpty && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600 transition-all duration-200 group-hover:bg-red-100 group-hover:text-red-600">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
