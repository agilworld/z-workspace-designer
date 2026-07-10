/**
 * useWorkspace — convenience hook to read from and write to WorkspaceContext.
 * Provides memoised action dispatchers and computed values.
 *
 * @status implemented
 */

'use client';

import { useContext, useCallback } from 'react';
import { WorkspaceStateContext, WorkspaceDispatchContext } from '@/context/WorkspaceContext';
import type { Product } from '@/types';

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

  // ---------------------------------------------------------------------------
  // Computed values
  // ---------------------------------------------------------------------------

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
    itemCount: state.items.length,
    isEmpty: state.items.length === 0,
    canUndo: state.undoStack.length > 0,
    snapToGrid: state.snapToGrid,
    selectedItem: state.items.find(item => item.instanceId === state.selectedItemId) ?? null,
  };
}
