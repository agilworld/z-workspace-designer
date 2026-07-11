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

// ---------------------------------------------------------------------------
// Product catalog types
// ---------------------------------------------------------------------------

/**
 * Categories available in the product catalog.
 * Maps to the sections on monis.rent.
 */
export type ProductCategory =
  | 'desks'
  | 'chairs'
  | 'monitors'
  | 'computers'
  | 'keyboards'
  | 'mice'
  | 'lamps'
  | 'accessories'
  | 'plants';

/** A rentable (or decorative) product that can be placed on the canvas. */
export interface Product {
  /** Unique identifier (kebab-case). */
  id: string;
  /** Display name. */
  name: string;
  /** Product category. */
  category: ProductCategory;
  /** Manufacturer / brand. */
  brand: string;
  /** Short description (one or two sentences). */
  description: string;
  /** Image URL (Strapi-hosted or Unsplash fallback). */
  image: string;
  /** Estimated weekly rental price in USD. */
  estimatedPriceWeekly: number;
  /** Estimated monthly rental price in USD. */
  estimatedPriceMonthly: number;
  /** Link to the monis.rent category page. */
  monisUrl: string;
  /** Default canvas position. */
  defaultPosition: Position;
  /** Visual footprint on the canvas. */
  dimensions: Size;
  /** Stacking order (higher = on top). */
  zIndex: number;
  /** Arbitrary tags (e.g. "decorative", "popular"). */
  tags: string[];
}

// ---------------------------------------------------------------------------
// Workspace state types
// ---------------------------------------------------------------------------

/** A product instance placed on the workspace canvas. */
export interface WorkspaceItem {
  /** Unique instance identifier (generated via crypto.randomUUID). */
  instanceId: string;
  /** References Product.id. */
  productId: string;
  /** Position on the canvas grid. */
  position: Position;
  /** Number of units placed. */
  quantity: number;
}

/** A snapshot of a reversible action for undo support. */
export type UndoAction =
  | { type: 'ADD_ITEM'; instanceId: string }
  | { type: 'REMOVE_ITEM'; item: WorkspaceItem }
  | { type: 'CLEAR_ALL'; previousItems: WorkspaceItem[] };

// ---------------------------------------------------------------------------
// Slot-based workspace types
// ---------------------------------------------------------------------------

/** Desk slot with size variant selection. */
export interface DeskSlot {
  productId: string;
  sizeVariant: '120x60' | '140x60' | '140x70';
}

/** Chair slot with color variant selection. */
export interface ChairSlot {
  productId: string;
  colorVariant: 'black' | 'red-strip' | 'blue-strip' | 'green-strip';
}

/** An accessory slot (can be null when empty). */
export interface AccessorySlot {
  productId: string | null;
}

/** All workspace slots in a structured layout. */
export interface WorkspaceSlots {
  desk: DeskSlot | null;
  chair: ChairSlot | null;
  monitor: AccessorySlot;
  lamp: AccessorySlot;
  keyboard: AccessorySlot;
  mouse: AccessorySlot;
  plant: AccessorySlot;
  mousepad: AccessorySlot;
}

/** Keys for accessory slots (all slots except desk and chair). */
export type AccessorySlotKey = keyof Omit<WorkspaceSlots, 'desk' | 'chair'>;

/** All slot keys. */
export type SlotKey = keyof WorkspaceSlots;

/** Global workspace state. */
export interface WorkspaceState {
  /** All placed items on the canvas (kept for backward compat). */
  items: WorkspaceItem[];
  /** Currently selected item's instanceId (null if none). */
  selectedItemId: string | null;
  /** History of undoable actions (last 20). */
  undoStack: UndoAction[];
  /** Whether snap-to-grid is enabled. */
  snapToGrid: boolean;
  /** Structured slot-based selections. */
  slots: WorkspaceSlots;
}

/** Discriminated union of all workspace actions. */
export type WorkspaceAction =
  | { type: 'ADD_ITEM'; product: Product; position?: { x: number; y: number } }
  | { type: 'REMOVE_ITEM'; instanceId: string }
  | { type: 'MOVE_ITEM'; instanceId: string; position: { x: number; y: number } }
  | { type: 'SELECT_ITEM'; instanceId: string | null }
  | { type: 'CLEAR_ALL' }
  | { type: 'REPLACE_ITEM'; instanceId: string; newProduct: Product }
  | { type: 'UNDO' }
  | { type: 'TOGGLE_SNAP' }
  // ── Slot-based actions ──────────────────────────────────────────────
  | { type: 'SET_DESK'; product: Product; sizeVariant: DeskSlot['sizeVariant'] }
  | { type: 'SET_CHAIR'; product: Product; colorVariant: ChairSlot['colorVariant'] }
  | { type: 'SET_ACCESSORY'; slot: AccessorySlotKey; product: Product | null }
  | { type: 'CLEAR_SLOT'; slot: SlotKey };
