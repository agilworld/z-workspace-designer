/**
 * SummaryPanel — right-hand panel with Quick-Add buttons,
 * rental summary, and pricing.
 *
 * @status updated — restructured with Quick-Add section
 */

'use client';

import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById, productsByCategory } from '@/data/products';
import { SummaryItem } from '@/components/summary/SummaryItem';
import { PriceBreakdown } from '@/components/summary/PriceBreakdown';
import { RentButton } from '@/components/summary/RentButton';

// ---------------------------------------------------------------------------
// Quick-add definitions — first product from common categories
// ---------------------------------------------------------------------------

interface QuickAddDef {
  label: string;
  category: keyof typeof productsByCategory;
}

const quickAddItems: QuickAddDef[] = [
  { label: '+ Monitor', category: 'monitors' },
  { label: '+ Keyboard', category: 'keyboards' },
  { label: '+ Mouse', category: 'mice' },
  { label: '+ Lamp', category: 'lamps' },
  { label: '+ Plant', category: 'plants' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SummaryPanel() {
  const { state, removeItem, addItem, itemCount, isEmpty } = useWorkspace();

  const handleQuickAdd = (category: keyof typeof productsByCategory) => {
    const product = productsByCategory[category]?.[0];
    if (product) {
      addItem(product);
    }
  };

  return (
    <aside className="flex h-full flex-col rounded-3xl bg-white/70 shadow-lg shadow-blue-100/20 backdrop-blur-xl">
      {/* ── Quick-Add Section ─────────────────────────── */}
      <div className="border-b border-white/30 px-4 pb-3 pt-4">
        <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Quick Add
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {quickAddItems.map((item) => {
            const product = productsByCategory[item.category]?.[0];
            const isAdded = product
              ? state.items.some((i) => i.productId === product.id)
              : false;
            return (
              <button
                key={item.category}
                type="button"
                onClick={() => handleQuickAdd(item.category)}
                disabled={!product || isAdded}
                className={`rounded-xl px-2.5 py-2 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                  isAdded
                    ? 'cursor-not-allowed bg-slate-100 text-slate-300'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm active:scale-[0.97]'
                }`}
              >
                {isAdded ? '✓ Added' : item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-white/30 px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Your Workspace
        </h2>
        {itemCount > 0 && (
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            {itemCount}
          </span>
        )}
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-smooth">
        {isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center pt-8 text-center">
            <span className="mb-2 text-2xl" role="img" aria-label="workspace">
              🖥️
            </span>
            <p className="text-xs text-slate-400">
              Your workspace is empty.
              <br />
              Add items from the sidebar or Quick Add.
            </p>
          </div>
        ) : (
          /* Items list */
          <div className="space-y-0.5">
            {state.items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <SummaryItem
                  key={item.instanceId}
                  item={item}
                  product={product}
                  onRemove={removeItem}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ── Footer (pricing + CTA) ─────────────────── */}
      {itemCount > 0 && (
        <div className="space-y-3 border-t border-white/30 px-4 py-3">
          <PriceBreakdown items={state.items} />
          <RentButton disabled={false} />
        </div>
      )}
    </aside>
  );
}
