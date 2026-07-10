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
        backgroundImage: 'radial-gradient(circle, #93c5fd 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
        opacity: 0.3,
      }}
    />
  );
}
