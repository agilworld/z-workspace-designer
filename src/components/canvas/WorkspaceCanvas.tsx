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
 *
 * @status implemented
 */

'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById } from '@/data/products';
import { CanvasGrid } from './CanvasGrid';
import { EmptyState } from './EmptyState';
import { WorkspaceItem } from './WorkspaceItem';

export function WorkspaceCanvas() {
  const { state, selectItem, removeItem, moveItem, isEmpty, selectedItem } =
    useWorkspace();

  const canvasRef = useRef<HTMLDivElement>(null);

  // ── Keyboard: Delete / Backspace removes selected item ────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [selectedItem, removeItem]);

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

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 overflow-hidden bg-slate-50"
      onClick={handleCanvasClick}
    >
      <CanvasGrid />

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
            />
          );
        })
      )}
    </div>
  );
}
