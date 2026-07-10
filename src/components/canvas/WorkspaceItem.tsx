/**
 * WorkspaceItem — a placed product instance on the canvas.
 *
 * Renders the product image at the item's position, supports dragging via
 * the `useDragPosition` hook, shows a selection ring when active, displays
 * a tooltip on hover, and shows a remove button on selection.
 *
 * @status implemented
 */

'use client';

import Image from 'next/image';
import { useDragPosition } from '@/hooks/useDragPosition';
import { Tooltip } from '@/components/ui/Tooltip';
import type { WorkspaceItem, Product } from '@/types';

interface WorkspaceItemProps {
  item: WorkspaceItem;
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, pos: { x: number; y: number }) => void;
  canvasRef: React.RefObject<HTMLElement | null>;
  snapToGrid?: boolean;
}

export function WorkspaceItem({
  item,
  product,
  isSelected,
  onSelect,
  onRemove,
  onMove,
  canvasRef,
  snapToGrid = false,
}: WorkspaceItemProps) {
  // ── Drag ──────────────────────────────────────────────────────────────

  const { isDragging, position, handleMouseDown, handleTouchStart } =
    useDragPosition(item.position, canvasRef, (pos) => {
      onMove(item.instanceId, pos);
    }, snapToGrid);

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
    <Tooltip
      content={
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">{product.name}</span>
          <span className="text-slate-300">{product.brand}</span>
          <span className="text-green-300">${product.estimatedPriceWeekly}/week</span>
        </div>
      }
    >
      <div
        className={`
          absolute cursor-grab select-none
          ${isDragging ? 'cursor-grabbing opacity-80' : ''}
          ${isSelected ? 'ring-2 ring-blue-400' : ''}
          animate-fade-in-scale overflow-hidden rounded-md bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          ${!isDragging ? 'hover:scale-[1.02]' : ''}
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
    </Tooltip>
  );
}
