/**
 * ProductScroller — horizontal scrolling product list at the bottom
 * with category tab filtering. Collapsible with localStorage persistence.
 *
 * Shows products filtered by category tabs. Clicking a card adds it to the
 * appropriate slot based on its category.
 *
 * @status updated — collapsible with localStorage toggle
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useWorkspace } from '@/hooks/useWorkspace';
import { products } from '@/data/products';
import type { Product, ProductCategory, AccessorySlotKey } from '@/types';

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
  // Collapsible state persisted in localStorage
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('scroller-expanded') !== 'false';
    }
    return true;
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('scroller-expanded', String(isExpanded));
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  // Derive unique visible categories from products that have a slot mapping
  const visibleCategories = useMemo(() => {
    const cats = new Set<ProductCategory>();
    for (const product of products) {
      if (getSlotForProduct(product) !== null) {
        cats.add(product.category);
      }
    }
    return Array.from(cats).sort();
  }, []);

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full">
      {/* ── Toggle bar ──────────────────────────────────── */}
      <button
        type="button"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span className="flex items-center gap-2">
          <span>Products</span>
          <span className="text-[10px] text-slate-400">{filteredProducts.length} items</span>
        </span>
        <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          ▲
        </span>
      </button>

      {/* ── Collapsible content ─────────────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-3">
          {/* ── Category tabs ────────────────────────────── */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {visibleCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Scroller cards ───────────────────────────── */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-smooth">
            {filteredProducts.map((product) => (
              <ProductScrollerCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
