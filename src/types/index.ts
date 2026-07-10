/**
 * Shared TypeScript types for the Workspace Designer.
 *
 * @status scaffold
 */

/** A 2D position on the canvas. */
export interface Position {
  x: number;
  y: number;
}

/** Dimensions of a placed item. */
export interface Size {
  width: number;
  height: number;
}

/** A product instance placed on the canvas. */
export interface PlacedItem {
  id: string;
  productId: string;
  position: Position;
  size: Size;
  quantity: number;
}
