/**
 * ProductSidebar — left-hand panel listing available products by category.
 *
 * Top section: "Products" title + category filter tabs.
 * Bottom section: scrollable grid of product cards filtered by the active tab.
 * The "Keyboards & Mice" tab shows products from both categories.
 *
 * @status implemented
 */

'use client';

import { useState } from 'react';
import { products, productsByCategory } from '@/data/products';
import { useWorkspace } from '@/hooks/useWorkspace';
import { CategoryTabs } from './CategoryTabs';
import { ProductCard } from './ProductCard';
import type { ProductCategory } from '@/types';
import type { CategoryFilter } from './CategoryTabs';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProductSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const { state, addItem } = useWorkspace();

  // -------------------------------------------------------------------------
  // Filter products based on selected category
  // -------------------------------------------------------------------------

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : selectedCategory === 'keyboards'
        ? [
            ...(productsByCategory['keyboards'] ?? []),
            ...(productsByCategory['mice'] ?? []),
          ]
        : productsByCategory[selectedCategory as ProductCategory] ?? [];

  return (
    <aside className="flex h-full flex-col overflow-y-auto rounded-2xl bg-white/85 shadow-lg backdrop-blur-md">
      {/* ── Title + Category tabs ─────────────────────── */}
      <div className="px-5 pb-3 pt-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Products
        </h2>
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* ── Product grid ──────────────────────────────── */}
      <div className="grid flex-1 grid-cols-1 gap-3 px-5 pb-5 animate-fadeIn">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInWorkspace={state.items.some(
              (item) => item.productId === product.id,
            )}
            onAdd={(p) => addItem(p)}
          />
        ))}
      </div>

      {/* Empty state when no products match */}
      {filteredProducts.length === 0 && (
        <p className="px-4 text-sm text-slate-400">
          No products in this category.
        </p>
      )}
    </aside>
  );
}
