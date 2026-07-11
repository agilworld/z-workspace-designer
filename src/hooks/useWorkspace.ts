/**
 * useWorkspace — convenience hook to read from and write to WorkspaceContext.
 * Provides memoised action dispatchers and computed values.
 *
 * @status implemented
 */

'use client';

import { useContext, useCallback } from 'react';
import { WorkspaceStateContext, WorkspaceDispatchContext } from '@/context/WorkspaceContext';
import { getProductById } from '@/data/products';
import type { Product, DeskSlot, ChairSlot, SlotKey, AccessorySlotKey } from '@/types';

export function useWorkspace() {
  const state = useContext(WorkspaceStateContext);
  const dispatch = useContext(WorkspaceDispatchContext);

  // ---------------------------------------------------------------------------
  // Memoised action dispatchers
  // ---------------------------------------------------------------------------

  const addItem = useCallback(
    (product: Product, position?: { x: number; y: number }) => {
      dispatch({ type: 'ADD_ITEM', product, position });
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (instanceId: string) => {
      dispatch({ type: 'REMOVE_ITEM', instanceId });
    },
    [dispatch],
  );

  const moveItem = useCallback(
    (instanceId: string, position: { x: number; y: number }) => {
      dispatch({ type: 'MOVE_ITEM', instanceId, position });
    },
    [dispatch],
  );

  const selectItem = useCallback(
    (instanceId: string | null) => {
      dispatch({ type: 'SELECT_ITEM', instanceId });
    },
    [dispatch],
  );

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, [dispatch]);

  const replaceItem = useCallback(
    (instanceId: string, newProduct: Product) => {
      dispatch({ type: 'REPLACE_ITEM', instanceId, newProduct });
    },
    [dispatch],
  );

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, [dispatch]);

  const toggleSnap = useCallback(() => {
    dispatch({ type: 'TOGGLE_SNAP' });
  }, [dispatch]);

  // ── Slot-based actions ──────────────────────────────────────────────

  const setDesk = useCallback(
    (product: Product, sizeVariant: DeskSlot['sizeVariant']) => {
      dispatch({ type: 'SET_DESK', product, sizeVariant });
    },
    [dispatch],
  );

  const setChair = useCallback(
    (product: Product, colorVariant: ChairSlot['colorVariant']) => {
      dispatch({ type: 'SET_CHAIR', product, colorVariant });
    },
    [dispatch],
  );

  const setAccessory = useCallback(
    (slot: AccessorySlotKey, product: Product | null) => {
      dispatch({ type: 'SET_ACCESSORY', slot, product });
    },
    [dispatch],
  );

  const clearSlot = useCallback(
    (slot: SlotKey) => {
      dispatch({ type: 'CLEAR_SLOT', slot });
    },
    [dispatch],
  );

  // ---------------------------------------------------------------------------
  // Computed values
  // ---------------------------------------------------------------------------

  /** Get the Product object for a given slot, or null if empty. */
  const getSlotProduct = useCallback(
    (slot: SlotKey): Product | null => {
      if (slot === 'desk' || slot === 'chair') {
        const s = state.slots[slot];
        return s ? getProductById(s.productId) ?? null : null;
      }
      const s = state.slots[slot];
      if (!s?.productId) return null;
      return getProductById(s.productId) ?? null;
    },
    [state.slots],
  );

  /** Count of filled slots. */
  const filledSlotCount = useCallback((): number => {
    let count = 0;
    if (state.slots.desk) count++;
    if (state.slots.chair) count++;
    if (state.slots.monitor.productId) count++;
    if (state.slots.lamp.productId) count++;
    if (state.slots.keyboard.productId) count++;
    if (state.slots.mouse.productId) count++;
    if (state.slots.plant.productId) count++;
    if (state.slots.mousepad.productId) count++;
    return count;
  }, [state.slots]);

  return {
    state,
    dispatch,
    addItem,
    removeItem,
    moveItem,
    selectItem,
    clearAll,
    replaceItem,
    undo,
    toggleSnap,
    // ── Slot-based ──
    setDesk,
    setChair,
    setAccessory,
    clearSlot,
    getSlotProduct,
    filledSlotCount,
    slots: state.slots,
    itemCount: state.items.length,
    isEmpty: state.items.length === 0,
    canUndo: state.undoStack.length > 0,
    snapToGrid: state.snapToGrid,
    selectedItem: state.items.find(item => item.instanceId === state.selectedItemId) ?? null,
  };
}
