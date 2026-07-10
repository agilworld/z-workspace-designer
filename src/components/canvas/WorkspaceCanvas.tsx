/**
 * WorkspaceCanvas — the central interactive canvas where products appear
 * and can be dragged, selected, and removed.
 *
 * Responsibilities:
 *  - Renders the dot-grid background
 *  - Shows an empty-state prompt when no items are placed
 *  - Maps workspace items to positioned interactive elements
 *  - Handles click-to-deselect on the canvas background
 *  - Listens for Delete / Backspace to remove the selected item
 *  - Listens for Ctrl+Z to undo the last action
 *  - Provides zoom in/out controls in the bottom-right corner
 *
 * @status implemented
 */

'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById } from '@/data/products';
import { CanvasGrid } from './CanvasGrid';
import { EmptyState } from './EmptyState';
import { WorkspaceItem } from './WorkspaceItem';

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5] as const;

export function WorkspaceCanvas() {
  const { state, selectItem, removeItem, moveItem, isEmpty, selectedItem, undo, snapToGrid } =
    useWorkspace();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoomIndex, setZoomIndex] = useState(2); // Default to 100% (index 2)

  const currentZoom = ZOOM_LEVELS[zoomIndex] ?? 1;

  // ── Keyboard: Delete / Backspace removes selected item ────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z (or Cmd+Z on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        // Don't trigger when the user is typing in an input
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return;
        }
        e.preventDefault();
        undo();
        return;
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedItem) {
        // Don't trigger when the user is typing in an input
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return;
        }
        e.preventDefault();
        removeItem(selectedItem.instanceId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, removeItem, undo]);

  // ── Canvas click — deselect on background click ────────────────────────

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      // Only deselect if the click is directly on the canvas container
      // (not on a child element like a WorkspaceItem)
      if (e.target === e.currentTarget) {
        selectItem(null);
      }
    },
    [selectItem],
  );

  // ── Zoom handlers ─────────────────────────────────────────────────────

  const zoomIn = useCallback(() => {
    setZoomIndex(prev => Math.min(prev + 1, ZOOM_LEVELS.length - 1));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomIndex(prev => Math.max(prev - 1, 0));
  }, []);

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 overflow-hidden bg-slate-50"
      onClick={handleCanvasClick}
    >
      <CanvasGrid />

      {/* ── Zoomable inner container ─────────────────────────── */}
      <div
        className="absolute inset-0 origin-top-left"
        style={{
          transform: `scale(${currentZoom})`,
          width: `${100 / currentZoom}%`,
          height: `${100 / currentZoom}%`,
        }}
      >
        {isEmpty ? (
          <EmptyState />
        ) : (
          state.items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;

            return (
              <WorkspaceItem
                key={item.instanceId}
                item={item}
                product={product}
                isSelected={item.instanceId === state.selectedItemId}
                onSelect={selectItem}
                onRemove={removeItem}
                onMove={moveItem}
                canvasRef={canvasRef}
                snapToGrid={snapToGrid}
              />
            );
          })
        )}
      </div>

      {/* ── Zoom controls (bottom-right) ─────────────────────── */}
      <div className="absolute bottom-4 right-4 z-40 flex items-center gap-1 rounded-lg border border-slate-200 bg-white/85 px-2 py-1.5 shadow-sm backdrop-blur-md">
        <button
          type="button"
          onClick={zoomOut}
          disabled={zoomIndex === 0}
          className="flex h-7 w-7 items-center justify-center rounded text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          −
        </button>
        <span className="min-w-[3rem] text-center text-xs font-medium text-slate-700">
          {Math.round(currentZoom * 100)}%
        </span>
        <button
          type="button"
          onClick={zoomIn}
          disabled={zoomIndex === ZOOM_LEVELS.length - 1}
          className="flex h-7 w-7 items-center justify-center rounded text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
