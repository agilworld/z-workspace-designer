/**
 * AccessorySlot — individual accessory slot in the accessory box.
 *
 * Shows product image if filled, or a placeholder icon + label if empty.
 *
 * @status new
 */

'use client';

import Image from 'next/image';
import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById } from '@/data/products';
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
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
        <span className="text-xl" role="img" aria-label={label}>
          {icon}
        </span>
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <span className="ml-auto text-[10px] text-slate-300">Empty</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all hover:shadow-md">
      {/* Product thumbnail */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-xs font-medium text-slate-700">{product.name}</p>
        <p className="text-[11px] font-semibold text-emerald-600">
          ${product.estimatedPriceWeekly}/wk
        </p>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={handleClick}
        className="shrink-0 rounded-full p-1 text-slate-300 transition-all hover:bg-red-50 hover:text-red-500"
        aria-label={`Remove ${product.name}`}
      >
        ✕
      </button>
    </div>
  );
}
