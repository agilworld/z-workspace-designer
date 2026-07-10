/**
 * CanvasScene — renders the desk background image as the workspace stage.
 *
 * Uses the Electrical Adjustable Desk product image to create a realistic
 * desk surface scene. The desk spans most of the canvas width at the bottom.
 * All pointer events pass through so items on the canvas remain interactive.
 *
 * @status implemented
 */

'use client';

import Image from 'next/image';

const DESK_IMAGE =
  'https://strapi.monis.rent/uploads/desk_titel_new_3db151d44c.jpg';

export function CanvasScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ── Room/wall background ──────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-slate-50/30 to-slate-100/20" />

      {/* ── Desk as the main stage ────────────────────── */}
      <div
        className="absolute"
        style={{
          left: '100px',
          top: '280px',
          width: '600px',
          height: '150px',
          zIndex: 1,
        }}
      >
        <Image
          src={DESK_IMAGE}
          alt="Workspace Desk"
          fill
          className="object-contain object-bottom"
          unoptimized
          priority
          draggable={false}
        />
      </div>

      {/* ── Floor area (below desk) ───────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '70px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/40 to-slate-200/20" />
        {/* Desk drop shadow on the floor */}
        <div className="absolute top-0 left-24 right-24 h-6 bg-gradient-to-b from-slate-300/15 to-transparent" />
      </div>
    </div>
  );
}
