/**
 * SummaryItem — a single line item in the rental summary.
 *
 * @status implemented
 */

import Image from 'next/image';
import type { WorkspaceItem, Product } from '@/types';
import { formatPrice } from '@/lib/pricing';

interface SummaryItemProps {
  /** The workspace item instance to display. */
  item: WorkspaceItem;
  /** The resolved product for this item. */
  product: Product;
  /** Called when the user clicks the remove button. */
  onRemove: (instanceId: string) => void;
}

export function SummaryItem({ item, product, onRemove }: SummaryItemProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border-b border-white/30 px-2 py-1.5 transition-colors last:border-b-0 hover:bg-white/50">
      {/* Thumbnail */}
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          width={32}
          height={32}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>

      {/* Name + weekly price */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-xs font-medium text-slate-700">
          {product.name}
          {item.quantity > 1 && (
            <span className="ml-1 text-[10px] text-slate-400">&times;{item.quantity}</span>
          )}
        </p>
        <p className="text-[11px] font-semibold text-emerald-600">
          {formatPrice(product.estimatedPriceWeekly * item.quantity)}/wk
        </p>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(item.instanceId)}
        className="shrink-0 rounded-full p-1 text-slate-300 transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
        aria-label={`Remove ${product.name}`}
      >
        ✕
      </button>
    </div>
  );
}
