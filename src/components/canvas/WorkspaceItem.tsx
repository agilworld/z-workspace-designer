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

import { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);

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
          ${isSelected ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
          animate-fade-in-scale overflow-hidden rounded-xl bg-white/90 shadow-sm shadow-blue-100/20 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
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
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <span
              className="select-none text-lg font-bold text-slate-300"
              aria-hidden
            >
              {product.name.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            className="pointer-events-none"
            style={{ objectFit: 'contain' }}
            draggable={false}
            onError={() => setImageError(true)}
          />
        )}

        {/* ── Selection label (bottom overlay) ──────── */}
        {isSelected && (
          <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-gradient-to-t from-black/60 to-transparent px-1 pb-1 pt-3 text-center text-[10px] leading-tight text-white">
            {product.name}
          </div>
        )}

        {/* ── Remove button (visible when selected) ─── */}
        {isSelected && (
          <button
            className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
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
