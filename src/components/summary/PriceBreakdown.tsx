/**
 * PriceBreakdown — totals, savings, and pricing disclaimers.
 *
 * @status implemented
 */

import type { WorkspaceItem } from '@/types';
import { calculateWeeklyTotal, calculateMonthlyTotal, formatPrice } from '@/lib/pricing';

interface PriceBreakdownProps {
  /** The workspace items to compute pricing for. */
  items: WorkspaceItem[];
}

export function PriceBreakdown({ items }: PriceBreakdownProps) {
  if (items.length === 0) return null;

  const weeklyTotal = calculateWeeklyTotal(items);
  const monthlyTotal = calculateMonthlyTotal(items);

  // Calculate savings percentage when monthly is cheaper than weekly × 4
  const weeklyTimesFour = weeklyTotal * 4;
  const savingsPct =
    monthlyTotal > 0 && monthlyTotal < weeklyTimesFour
      ? Math.round((1 - monthlyTotal / weeklyTimesFour) * 100)
      : 0;

  return (
    <div className="space-y-2 pt-2">
      {/* Section title */}
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Price Summary
      </p>

      {/* Weekly total */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Weekly</span>
        <span className="text-sm font-bold text-slate-700">
          {formatPrice(weeklyTotal)}
        </span>
      </div>

      {/* Monthly total */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Monthly</span>
        <span className="text-sm font-bold text-slate-700">
          {formatPrice(monthlyTotal)}
        </span>
      </div>

      {/* Savings indicator */}
      {savingsPct > 0 && (
        <div className="rounded-lg bg-emerald-50/80 px-2.5 py-1.5 text-center text-[10px] font-medium text-emerald-700">
          Save {savingsPct}% with monthly rental
        </div>
      )}

      {/* Delivery note */}
      <p className="text-[10px] italic text-slate-400">
        Delivery fee calculated at checkout
      </p>

      {/* Pricing disclaimer */}
      <p className="text-[10px] text-amber-600">
        Prices are estimates — final pricing at checkout
      </p>
    </div>
  );
}
