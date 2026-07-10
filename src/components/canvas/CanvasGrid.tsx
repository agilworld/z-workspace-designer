/**
 * CanvasGrid — background grid overlay on the workspace canvas.
 *
 * @status scaffold
 */

export function CanvasGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[image:repeating-linear-gradient(0deg,transparent,transparent_24px,theme(colors.border)_24px,theme(colors.border)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,theme(colors.border)_24px,theme(colors.border)_25px)]" />
  );
}
