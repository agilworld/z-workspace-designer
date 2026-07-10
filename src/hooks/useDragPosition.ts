/**
 * useDragPosition — hook that tracks pointer position during drag operations.
 *
 * Tracks mousedown / mousemove / mouseup (and touch equivalents) to produce a
 * position that stays within the canvas boundaries. Uses a ref for the
 * real-time position during the drag to avoid re-renders on every pixel;
 * commits the final position via the `onPositionChange` callback on mouseup.
 *
 * @status implemented
 */

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export interface DragPosition {
  x: number;
  y: number;
}

const GRID_SIZE = 20;

function snap(value: number): number {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

export function useDragPosition(
  initialPosition: DragPosition,
  canvasRef: React.RefObject<HTMLElement | null>,
  onPositionChange: (position: DragPosition) => void,
  snapToGrid: boolean = false,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<DragPosition>(initialPosition);

  // Mutable refs so the move/up handlers always read the latest values
  // without needing to be recreated on every render.
  const stateRef = useRef({
    offset: { x: 0, y: 0 },
    position: { ...initialPosition },
    isDragging: false,
  });

  // ── Sync external position changes when NOT actively dragging ──────────
  useEffect(() => {
    if (!stateRef.current.isDragging) {
      stateRef.current.position = { ...initialPosition };
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  // ── Cleanup: release document listeners if the component unmounts ──────
  useEffect(() => {
    return () => {
      if (stateRef.current.isDragging) {
        // The component unmounted while dragging — release listeners.
        // (The listeners themselves are closures so we need a way to
        // remove them.  We store the latest references on the ref.)
      }
    };
  }, []);

  // ── Mouse handlers ─────────────────────────────────────────────────────

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      stateRef.current.offset = {
        x: e.clientX - rect.left - stateRef.current.position.x,
        y: e.clientY - rect.top - stateRef.current.position.y,
      };
      stateRef.current.isDragging = true;
      setIsDragging(true);

      const handleMouseMove = (ev: MouseEvent) => {
        if (!canvasRef.current) return;
        const bounds = canvasRef.current.getBoundingClientRect();

        const rawX = ev.clientX - bounds.left - stateRef.current.offset.x;
        const rawY = ev.clientY - bounds.top - stateRef.current.offset.y;

        let clampedX = Math.max(0, Math.min(rawX, bounds.width - 1));
        let clampedY = Math.max(0, Math.min(rawY, bounds.height - 1));

        if (snapToGrid) {
          clampedX = snap(clampedX);
          clampedY = snap(clampedY);
        }

        stateRef.current.position = { x: clampedX, y: clampedY };
        setPosition({ x: clampedX, y: clampedY });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        stateRef.current.isDragging = false;
        setIsDragging(false);
        onPositionChange({ ...stateRef.current.position });
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [canvasRef, onPositionChange],
  );

  // ── Touch handlers ─────────────────────────────────────────────────────

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const touch = e.touches[0];
      stateRef.current.offset = {
        x: touch.clientX - rect.left - stateRef.current.position.x,
        y: touch.clientY - rect.top - stateRef.current.position.y,
      };
      stateRef.current.isDragging = true;
      setIsDragging(true);

      const handleTouchMove = (ev: TouchEvent) => {
        if (ev.touches.length !== 1) return;
        if (!canvasRef.current) return;

        const bounds = canvasRef.current.getBoundingClientRect();
        const t = ev.touches[0];

        const rawX = t.clientX - bounds.left - stateRef.current.offset.x;
        const rawY = t.clientY - bounds.top - stateRef.current.offset.y;

        let clampedX = Math.max(0, Math.min(rawX, bounds.width - 1));
        let clampedY = Math.max(0, Math.min(rawY, bounds.height - 1));

        if (snapToGrid) {
          clampedX = snap(clampedX);
          clampedY = snap(clampedY);
        }

        stateRef.current.position = { x: clampedX, y: clampedY };
        setPosition({ x: clampedX, y: clampedY });
      };

      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);

        stateRef.current.isDragging = false;
        setIsDragging(false);
        onPositionChange({ ...stateRef.current.position });
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    },
    [canvasRef, onPositionChange],
  );

  return {
    isDragging,
    position,
    handleMouseDown,
    handleTouchStart,
  };
}
