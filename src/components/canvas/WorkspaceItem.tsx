/**
 * WorkspaceItem — a placed product instance on the canvas.
 *
 * Renders the product image at the item's position, supports dragging via
 * the `useDragPosition` hook, shows a selection ring when active, and
 * displays a remove button on hover/selection.
 *
 * @status implemented
 */

'use client';

import Image from 'next/image';
import { useDragPosition } from '@/hooks/useDragPosition';
import type { WorkspaceItem, Product } from '@/types';

interface WorkspaceItemProps {
  item: WorkspaceItem;
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, pos: { x: number; y: number }) => void;
  canvasRef: React.RefObject<HTMLElement | null>;
}

export function WorkspaceItem({
  item,
  product,
  isSelected,
  onSelect,
  onRemove,
  onMove,
  canvasRef,
}: WorkspaceItemProps) {
  // ── Drag ──────────────────────────────────────────────────────────────

  const { isDragging, position, handleMouseDown, handleTouchStart } =
    useDragPosition(item.position, canvasRef, (pos) => {
      onMove(item.instanceId, pos);
    });

  // ── Handlers ──────────────────────────────────────────────────────────

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(item.instanceId);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.instanceId);
  };

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div
      className={`
        absolute cursor-grab select-none
        ${isDragging ? 'cursor-grabbing opacity-80' : ''}
        ${isSelected ? 'ring-2 ring-blue-400' : ''}
        overflow-hidden rounded-md bg-white shadow-sm transition-shadow hover:shadow-md
      `}
      style={{
        left: position.x,
        top: position.y,
        width: product.dimensions.width,
        height: product.dimensions.height,
        zIndex: product.zIndex,
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="button"
      tabIndex={0}
      aria-label={product.name}
      aria-grabbed={isDragging}
    >
      {/* ── Product image ─────────────────────────── */}
      <Image
        src={product.image}
        alt={product.name}
        fill
        unoptimized
        className="pointer-events-none"
        style={{ objectFit: 'contain' }}
        draggable={false}
      />

      {/* ── Selection label (bottom overlay) ──────── */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1 py-0.5 text-center text-[10px] leading-tight text-white">
          {product.name}
        </div>
      )}

      {/* ── Remove button (visible when selected) ─── */}
      {isSelected && (
        <button
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={handleRemove}
          aria-label={`Remove ${product.name}`}
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
}
