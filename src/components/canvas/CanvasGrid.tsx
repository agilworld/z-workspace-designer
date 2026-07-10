/**
 * CanvasGrid — subtle dot-pattern background overlay on the workspace canvas.
 *
 * Uses a CSS radial-gradient to render dots every 20px at very low opacity,
 * giving the designer a spatial reference grid without visual clutter.
 *
 * @status implemented
 */

export function CanvasGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.6,
      }}
    />
  );
}
