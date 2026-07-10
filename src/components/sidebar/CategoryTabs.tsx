/**
 * CategoryTabs — horizontal tab bar to filter products by category.
 *
 * Renders pill-shaped tabs for "All", each ProductCategory, and a combined
 * "Keyboards & Mice" tab that maps to both `keyboards` and `mice` categories.
 *
 * @status implemented
 */

import type { ProductCategory } from '@/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A category filter value — either `'all'` or a specific ProductCategory. */
export type CategoryFilter = ProductCategory | 'all';

interface CategoryTabsProps {
  selectedCategory: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

interface TabDef {
  label: string;
  value: CategoryFilter;
}

const tabs: TabDef[] = [
  { label: 'All', value: 'all' },
  { label: 'Desks', value: 'desks' },
  { label: 'Chairs', value: 'chairs' },
  { label: 'Monitors', value: 'monitors' },
  { label: 'Keyboards & Mice', value: 'keyboards' },
  { label: 'Computers', value: 'computers' },
  { label: 'Lamps', value: 'lamps' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Plants', value: 'plants' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CategoryTabs({ selectedCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onSelect(tab.value)}
          className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
            selectedCategory === tab.value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
