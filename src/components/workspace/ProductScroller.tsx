/**
 * ProductScroller — horizontal scrolling product list at the bottom.
 *
 * Shows all products as small cards. Clicking a card adds it to the
 * appropriate slot based on its category.
 *
 * @status new
 */

'use client';

import Image from 'next/image';
import { useWorkspace } from '@/hooks/useWorkspace';
import { products } from '@/data/products';
import type { Product, AccessorySlotKey } from '@/types';

// ---------------------------------------------------------------------------
// Mapping: product category → slot key
// ---------------------------------------------------------------------------

function getSlotForProduct(product: Product): { type: 'desk' } | { type: 'chair' } | { type: 'accessory'; key: AccessorySlotKey } | null {
  switch (product.category) {
    case 'desks':
      return { type: 'desk' };
    case 'chairs':
      return { type: 'chair' };
    case 'monitors':
      return { type: 'accessory', key: 'monitor' };
    case 'lamps':
      return { type: 'accessory', key: 'lamp' };
    case 'keyboards':
      return { type: 'accessory', key: 'keyboard' };
    case 'mice':
      return { type: 'accessory', key: 'mouse' };
    case 'plants':
      return { type: 'accessory', key: 'plant' };
    case 'accessories': {
      // Map specific accessories to their slots
      if (product.id === 'mouse-pad') return { type: 'accessory', key: 'mousepad' };
      // Other accessories (laptop stand, converter hub) don't have a specific slot
      return null;
    }
    case 'computers':
      // Computers don't have a slot in this design
      return null;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Scroller Card
// ---------------------------------------------------------------------------

interface ProductScrollerCardProps {
  product: Product;
}

function ProductScrollerCard({ product }: ProductScrollerCardProps) {
  const { slots, setDesk, setChair, setAccessory } = useWorkspace();

  const slotInfo = getSlotForProduct(product);

  const isActive = (() => {
    if (!slotInfo) return false;
    if (slotInfo.type === 'desk') return slots.desk?.productId === product.id;
    if (slotInfo.type === 'chair') return slots.chair?.productId === product.id;
    if (slotInfo.type === 'accessory') return slots[slotInfo.key]?.productId === product.id;
    return false;
  })();

  const handleClick = () => {
    if (!slotInfo) return;

    switch (slotInfo.type) {
      case 'desk':
        setDesk(product, '120x60'); // default size
        break;
      case 'chair':
        setChair(product, 'black'); // default color
        break;
      case 'accessory':
        setAccessory(slotInfo.key, product);
        break;
    }
  };

  if (!slotInfo) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex shrink-0 flex-col items-center gap-1.5 rounded-xl border-2 p-2.5 transition-all duration-200 w-[120px] ${
        isActive
          ? 'border-blue-400 bg-blue-50 shadow-md'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-16 w-full overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Name */}
      <p className="w-full truncate text-[11px] font-medium text-slate-700 text-center">
        {product.name}
      </p>

      {/* Price */}
      <p className="text-[10px] font-semibold text-emerald-600">
        ${product.estimatedPriceWeekly}/wk
      </p>

      {/* Active indicator */}
      {isActive && (
        <span className="text-[10px] font-medium text-blue-600">✓ Selected</span>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// ProductScroller
// ---------------------------------------------------------------------------

export function ProductScroller() {
  return (
    <div className="w-full">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-smooth">
        {products.map((product) => (
          <ProductScrollerCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
