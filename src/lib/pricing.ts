/**
 * pricing — rental pricing calculation utilities.
 *
 * @status implemented
 */

import type { WorkspaceItem } from '@/types';
import { getProductById } from '@/data/products';

/**
 * Calculate the total weekly rental price for a set of workspace items.
 * Looks up each product's weekly price and multiplies by quantity.
 *
 * @param items - Workspace items placed on the canvas.
 * @returns Sum of weekly price × quantity for all items.
 */
export function calculateWeeklyTotal(items: WorkspaceItem[]): number {
  return items.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.estimatedPriceWeekly ?? 0) * item.quantity;
  }, 0);
}

/**
 * Calculate the total monthly rental price for a set of workspace items.
 * Looks up each product's monthly price and multiplies by quantity.
 *
 * @param items - Workspace items placed on the canvas.
 * @returns Sum of monthly price × quantity for all items.
 */
export function calculateMonthlyTotal(items: WorkspaceItem[]): number {
  return items.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.estimatedPriceMonthly ?? 0) * item.quantity;
  }, 0);
}

/**
 * Format a numeric price as a USD currency string (whole dollars, no cents).
 *
 * @param price - The price in whole dollars.
 * @returns Formatted string like "$1,200".
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
