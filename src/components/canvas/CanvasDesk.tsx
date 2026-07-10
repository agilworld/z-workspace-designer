/**
 * CanvasDesk — decorative desk surface and room background.
 *
 * Renders three visual zones:
 *  1. A "wall" area at the top (lighter, subtle gradient)
 *  2. A "desk" surface spanning the width (wood-like gradient)
 *  3. A "floor" area at the bottom (darker, with shadow)
 *
 * All elements are pointer-events-none so they don't block canvas interactions.
 *
 * @status implemented
 */

export function CanvasDesk() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ── Wall area (upper 60%) ──────────────────── */}
      <div
        className="absolute inset-x-0 top-0"
        style={{ height: '55%' }}
      >
        {/* Subtle wall gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/60 to-slate-50/40" />
        {/* Wainscoting line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200/60" />
      </div>

      {/* ── Desk surface (middle, spanning full width) ──── */}
      <div
        className="absolute inset-x-0"
        style={{ top: '55%', height: '30%' }}
      >
        {/* Desk surface gradient — subtle wood-like warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-amber-100/30 to-amber-50/40" />
        {/* Desk top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-amber-200/50" />
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 41px)',
          }}
        />
      </div>

      {/* ── Floor area (lower 15%) ─────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ height: '15%' }}
      >
        {/* Floor gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/60 to-slate-200/40" />
        {/* Desk shadow on floor */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-300/20 to-transparent" />
      </div>
    </div>
  );
}
