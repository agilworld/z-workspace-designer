/**
 * SummaryPanel — right-hand panel showing slot-based selections,
 * prices, and rental CTA.
 *
 * Reads from WorkspaceSlots instead of the old items array.
 *
 * @status updated — slot-based
 */

'use client';

import Image from 'next/image';
import { useWorkspace } from '@/hooks/useWorkspace';
import { getProductById } from '@/data/products';
import { PriceBreakdown } from '@/components/summary/PriceBreakdown';
import { RentButton } from '@/components/summary/RentButton';
import { formatPrice } from '@/lib/pricing';
import type { SlotKey, WorkspaceSlots, AccessorySlotKey, Product } from '@/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface SlotItem {
  slotKey: SlotKey;
  label: string;
  product: Product;
  variant?: string;
  icon: string;
}

function collectSlotItems(slots: WorkspaceSlots): SlotItem[] {
  const items: SlotItem[] = [];

  // Desk
  if (slots.desk) {
    const product = getProductById(slots.desk.productId);
    if (product) {
      items.push({
        slotKey: 'desk',
        label: 'Desk',
        product,
        variant: slots.desk.sizeVariant,
        icon: '🪑',
      });
    }
  }

  // Chair
  if (slots.chair) {
    const product = getProductById(slots.chair.productId);
    if (product) {
      items.push({
        slotKey: 'chair',
        label: 'Chair',
        product,
        variant: slots.chair.colorVariant,
        icon: '🪑',
      });
    }
  }

  // Accessories
  const accessorySlots: { key: AccessorySlotKey; label: string; icon: string }[] = [
    { key: 'monitor', label: 'Monitor', icon: '🖥️' },
    { key: 'lamp', label: 'Lamp', icon: '💡' },
    { key: 'keyboard', label: 'Keyboard', icon: '⌨️' },
    { key: 'mouse', label: 'Mouse', icon: '🖱️' },
    { key: 'plant', label: 'Plant', icon: '🌿' },
    { key: 'mousepad', label: 'Mousepad', icon: '🟫' },
  ];

  for (const acc of accessorySlots) {
    const slot = slots[acc.key];
    if (slot?.productId) {
      const product = getProductById(slot.productId);
      if (product) {
        items.push({
          slotKey: acc.key,
          label: acc.label,
          product,
          icon: acc.icon,
        });
      }
    }
  }

  return items;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SummaryPanel() {
  const { state, slots, clearSlot } = useWorkspace();
  const slotItems = collectSlotItems(slots);
  const itemCount = slotItems.length;
  const isEmpty = itemCount === 0;

  return (
    <aside className="flex flex-col rounded-none">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
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
              Select products from the scroller below.
            </p>
          </div>
        ) : (
          /* Items list */
          <div className="space-y-1">
            {slotItems.map((item) => (
              <div
                key={item.slotKey}
                className="flex items-center gap-2 rounded-lg border-b border-slate-200 px-2 py-1.5 transition-colors last:border-b-0 hover:bg-slate-50"
              >
                {/* Thumbnail */}
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>

                {/* Name + variant + price */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium text-slate-700">
                    {item.product.name}
                  </p>
                  {item.variant && (
                    <p className="text-[10px] text-slate-400">
                      {item.variant.replace('-', ' ')}
                    </p>
                  )}
                  <p className="text-[11px] font-semibold text-emerald-600">
                    {formatPrice(item.product.estimatedPriceWeekly)}/wk
                  </p>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => clearSlot(item.slotKey)}
                  className="shrink-0 rounded-full p-1 text-slate-300 transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                  aria-label={`Remove ${item.product.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer (pricing + CTA) ─────────────────── */}
      {itemCount > 0 && (
        <div className="space-y-3 border-t border-slate-200 px-4 py-3">
          <PriceBreakdown items={state.items} />
          <RentButton disabled={false} />
        </div>
      )}
    </aside>
  );
}
