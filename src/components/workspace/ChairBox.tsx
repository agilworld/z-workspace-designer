/**
 * ChairBox — slot for selecting a chair with color variant.
 *
 * Shows the selected chair image + color radio buttons, or a placeholder.
 * Supports fullscreen image modal via explicit expand button and double-click.
 *
 * @status updated — added fullscreen image modal
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById } from '@/data/products';
import { BoxPlaceholder } from './BoxPlaceholder';
import { ImageModal } from '@/components/ui/ImageModal';
import type { ChairSlot } from '@/types';

const COLOR_VARIANTS: { value: ChairSlot['colorVariant']; label: string; colorClass: string }[] = [
  { value: 'black', label: 'Black', colorClass: 'bg-gray-900' },
  { value: 'red-strip', label: 'Red Strip', colorClass: 'bg-red-500' },
  { value: 'blue-strip', label: 'Blue Strip', colorClass: 'bg-blue-500' },
  { value: 'green-strip', label: 'Green Strip', colorClass: 'bg-green-500' },
];

export function ChairBox() {
  const { slots, setChair, clearSlot } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const chairSlot = slots.chair;
  const product = chairSlot ? getProductById(chairSlot.productId) ?? null : null;

  const handleColorChange = (colorVariant: ChairSlot['colorVariant']) => {
    if (product) {
      setChair(product, colorVariant);
    }
  };

  const handleRemove = () => {
    clearSlot('chair');
  };

  if (!product || !chairSlot) {
    return (
      <div className="flex flex-col rounded-2xl bg-white shadow-lg border border-slate-200 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-700">Chair</h3>
        <div className="flex-1">
          <BoxPlaceholder
            icon="🪑"
            label="Select a chair"
            sublabel="Choose from the scroller below"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-white shadow-lg border border-slate-200 p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700">Chair</h3>
          <button
            type="button"
            onClick={handleRemove}
            className="rounded-full p-1 text-slate-300 transition-all hover:bg-red-50 hover:text-red-500"
            aria-label="Remove chair"
          >
            ✕
          </button>
        </div>

        {/* Product image with expand + double-click */}
        <div
          className="relative mb-3 h-28 w-full overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in group"
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
            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs text-slate-600 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-white"
            aria-label={`View ${product.name} fullscreen`}
          >
            ↗
          </button>
        </div>

        {/* Product name */}
        <p className="mb-2 text-xs font-medium text-slate-700 truncate">{product.name}</p>

        {/* Color variants */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-slate-500">Color:</p>
          <div className="flex flex-col gap-1.5">
            {COLOR_VARIANTS.map((v) => (
              <label
                key={v.value}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                  chairSlot.colorVariant === v.value
                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-300'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="chair-color"
                  value={v.value}
                  checked={chairSlot.colorVariant === v.value}
                  onChange={() => handleColorChange(v.value)}
                  className="h-3 w-3 accent-blue-600"
                />
                <span
                  className={`inline-block h-3 w-3 rounded-full ${v.colorClass}`}
                />
                {v.label}
              </label>
            ))}
          </div>
        </div>
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
