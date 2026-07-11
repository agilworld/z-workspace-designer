/**
 * AccessorySlot — individual accessory slot in the accessory box.
 *
 * Shows product image if filled, or a placeholder icon + label if empty.
 * Supports fullscreen image modal via explicit expand button and double-click.
 *
 * @status updated — larger images + fullscreen modal
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById } from '@/data/products';
import { ImageModal } from '@/components/ui/ImageModal';
import type { AccessorySlotKey } from '@/types';

interface AccessorySlotProps {
  /** Display label for the slot. */
  label: string;
  /** The slot key in WorkspaceSlots. */
  slotKey: AccessorySlotKey;
  /** Emoji icon to show when empty. */
  icon: string;
}

export function AccessorySlot({ label, slotKey, icon }: AccessorySlotProps) {
  const { slots, clearSlot } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const slot = slots[slotKey];
  const productId = slot?.productId ?? null;
  const product = productId ? getProductById(productId) ?? null : null;

  const handleClick = () => {
    if (product) {
      clearSlot(slotKey);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-slate-300 transition-colors duration-200">
        <span className="text-xl" role="img" aria-label={label}>
          {icon}
        </span>
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        <span className="ml-auto text-xs font-medium text-slate-300">Empty</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-slate-300 transition-colors duration-200 animate-fade-in-scale">
        {/* Product thumbnail with expand + double-click */}
        <div
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 cursor-zoom-in group"
          onDoubleClick={() => setModalOpen(true)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />

          {/* Expand button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[10px] text-slate-600 opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white"
            aria-label={`View ${product.name} fullscreen`}
          >
            <Maximize2 size={12} />
          </button>
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-slate-700">{product.name}</p>
          <p className="text-sm font-bold text-emerald-600">
            ${product.estimatedPriceWeekly}/wk
          </p>
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={handleClick}
          className="shrink-0 rounded-full p-1 text-slate-300 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white"
          aria-label={`Remove ${product.name}`}
        >
          <X size={14} />
        </button>
      </div>

      {/* Fullscreen image modal */}
      <ImageModal
        src={product.image}
        alt={product.name}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
