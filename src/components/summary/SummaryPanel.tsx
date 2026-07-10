/**
 * SummaryPanel — right-hand panel showing the rental summary and pricing.
 *
 * @status implemented
 */

'use client';

import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById } from '@/data/products';
import { SummaryItem } from '@/components/summary/SummaryItem';
import { PriceBreakdown } from '@/components/summary/PriceBreakdown';
import { RentButton } from '@/components/summary/RentButton';

export function SummaryPanel() {
  const { state, removeItem, itemCount } = useWorkspace();

  return (
    <aside className="flex h-full flex-col bg-white/85 backdrop-blur-md">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-800">Your Workspace</h2>
        {itemCount > 0 && (
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
            {itemCount}
          </span>
        )}
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {itemCount === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center pt-12 text-center">
            <span className="mb-3 text-3xl" role="img" aria-label="house">
              🏠
            </span>
            <p className="text-sm text-slate-500">
              Your workspace is empty.
              <br />
              Add items to see your total.
            </p>
          </div>
        ) : (
          /* Items list */
          <div className="space-y-1">
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
        <div className="space-y-4 border-t border-slate-200 px-4 py-4">
          <PriceBreakdown items={state.items} />
          <RentButton disabled={false} />
        </div>
      )}
    </aside>
  );
}
