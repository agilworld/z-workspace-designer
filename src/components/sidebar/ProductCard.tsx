/**
 * ProductCard — a single product thumbnail in the sidebar catalog.
 *
 * Renders product image, name, brand, weekly price, and an Add button.
 * When the product is already in the workspace, shows a muted "Added ✓" badge.
 * Falls back to a coloured placeholder with the product initial on image error.
 *
 * @status implemented
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProductCardProps {
  product: Product;
  /** Whether this product already exists in the workspace. */
  isInWorkspace: boolean;
  /** Called when the user clicks the Add button. */
  onAdd: (product: Product) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProductCard({ product, isInWorkspace, onAdd }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group cursor-pointer rounded-2xl border border-white/40 bg-white/80 p-3 shadow-sm shadow-blue-100/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/40">
      {/* ── Product image ──────────────────────────────── */}
      <div className="relative mb-2 h-20 w-full overflow-hidden rounded-xl">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100">
            <span
              className="select-none text-2xl font-bold text-slate-300"
              aria-hidden
            >
              {product.name.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            width={120}
            height={80}
            unoptimized
            className="h-full w-full rounded-xl object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* ── Product name ───────────────────────────────── */}
      <p className="truncate text-sm font-medium text-slate-800">
        {product.name}
      </p>

      {/* ── Brand ──────────────────────────────────────── */}
      <p className="text-xs text-slate-400">{product.brand}</p>

      {/* ── Price + Add button ─────────────────────────── */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-emerald-600">
          ${product.estimatedPriceWeekly}
          <span className="text-xs font-normal text-slate-400">/wk</span>
        </span>

        {isInWorkspace ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
            Added ✓
          </span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            className="rounded-full bg-blue-600 px-3 py-1 text-[11px] text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
