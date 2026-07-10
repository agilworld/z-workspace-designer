/**
 * pricing — rental pricing calculation utilities.
 *
 * @status scaffold
 */

/**
 * Calculate the total rental price for a set of items.
 * @param items - Array of { price, quantity } tuples.
 * @returns The sum of price × quantity for all items.
 */
export function calculateTotal(
  items: Array<{ price: number; quantity: number }>,
): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
