/**
 * Layout — restructured layout with summary sidebar on the right,
 * workspace + collapsible product scroller on the left.
 *
 * Structure:
 *   Header (sticky top)
 *   Title area ("Design Your Workspace!", solid white bg)
 *   ──────────────────────────────────────────────
 *   [ Workspace (flex-1)           | Summary (w-80) ]
 *   [ Scroller (shrink-0, bottom)  |                ]
 *   ──────────────────────────────────────────────
 *
 * On screens smaller than 1024px, shows a mobile-friendly message
 * directing users to visit on desktop for the full experience.
 *
 * @status updated — summary right sidebar, collapsible, solid white backgrounds
 */

'use client';

import { useState } from 'react';

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
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);

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

        {/* ── Title area (solid white background) ────────── */}
        {title && (
          <div className="relative z-10 border-b border-slate-200 bg-white px-6 py-4 text-center">
            {title}
          </div>
        )}

        {/* ── Main content row: Workspace + Scroller | Summary Sidebar ── */}
        <div className="relative z-10 flex flex-1 overflow-hidden">
          {/* Left column: Workspace (flex-1) + Scroller (shrink-0) */}
          <div className="flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-white">
            {/* Workspace area */}
            <div className="flex-1 overflow-y-auto p-4">
              {workspace}
            </div>

            {/* Scroller at bottom of left column */}
            {scroller && (
              <div className="shrink-0 border-t border-slate-200 bg-white">
                {scroller}
              </div>
            )}
          </div>

          {/* Right sidebar: Summary (collapsible) */}
          <div
            className={`shrink-0 border-l border-slate-200 bg-white overflow-y-auto transition-all duration-300 ${
              summaryCollapsed ? 'w-12' : 'w-80'
            }`}
          >
            <button
              type="button"
              onClick={() => setSummaryCollapsed(!summaryCollapsed)}
              className="flex w-full items-center justify-center gap-1 py-2 text-xs text-slate-500 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={summaryCollapsed ? 'Expand summary panel' : 'Collapse summary panel'}
            >
              <span className={`transition-transform duration-200 ${summaryCollapsed ? '' : 'rotate-180'}`}>
                →
              </span>
              {summaryCollapsed ? '' : <span className="text-[10px] uppercase tracking-wider text-slate-400">Summary</span>}
            </button>
            {!summaryCollapsed && summary}
          </div>
        </div>
      </div>
    </>
  );
}
