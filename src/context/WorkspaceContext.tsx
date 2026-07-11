/**
 * WorkspaceContext — global state for the workspace designer.
 * Uses two separate contexts (state + dispatch) to prevent unnecessary re-renders.
 *
 * @status implemented
 */

'use client';

import React, { createContext, useReducer, type ReactNode } from 'react';
import type {
  Product,
  WorkspaceItem,
  WorkspaceState,
  WorkspaceAction,
  WorkspaceSlots,
  UndoAction,
  AccessorySlotKey,
} from '@/types';

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const initialSlots: WorkspaceSlots = {
  desk: null,
  chair: null,
  monitor: { productId: null },
  lamp: { productId: null },
  keyboard: { productId: null },
  mouse: { productId: null },
  plant: { productId: null },
  mousepad: { productId: null },
};

const initialState: WorkspaceState = {
  items: [],
  selectedItemId: null,
  undoStack: [],
  snapToGrid: false,
  slots: initialSlots,
};

// ---------------------------------------------------------------------------
// Contexts (split state / dispatch to minimise re-renders)
// ---------------------------------------------------------------------------

interface WorkspaceContextValue {
  state: WorkspaceState;
  dispatch: React.Dispatch<WorkspaceAction>;
}

export const WorkspaceStateContext = createContext<WorkspaceState>(initialState);
export const WorkspaceDispatchContext = createContext<React.Dispatch<WorkspaceAction>>(() => {});

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

/**
 * Pure reducer for all workspace actions.
 *
 * @param state  - Current workspace state.
 * @param action - Discriminated union action to apply.
 * @returns The next workspace state.
 */
export function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const instanceId = crypto.randomUUID();
      const newItem: WorkspaceItem = {
        instanceId,
        productId: action.product.id,
        position: action.position ?? { ...action.product.defaultPosition },
        quantity: 1,
      };
      const undoAction: UndoAction = { type: 'ADD_ITEM', instanceId };
      return {
        ...state,
        items: [...state.items, newItem],
        selectedItemId: instanceId, // Auto-select newly added item
        undoStack: [...state.undoStack.slice(-19), undoAction],
      };
    }

    case 'REMOVE_ITEM': {
      const removedItem = state.items.find(item => item.instanceId === action.instanceId);
      if (!removedItem) return state;
      const undoAction: UndoAction = { type: 'REMOVE_ITEM', item: removedItem };
      return {
        ...state,
        items: state.items.filter(item => item.instanceId !== action.instanceId),
        selectedItemId:
          state.selectedItemId === action.instanceId ? null : state.selectedItemId,
        undoStack: [...state.undoStack.slice(-19), undoAction],
      };
    }

    case 'MOVE_ITEM': {
      return {
        ...state,
        items: state.items.map(item =>
          item.instanceId === action.instanceId
            ? { ...item, position: action.position }
            : item,
        ),
      };
    }

    case 'SELECT_ITEM': {
      return {
        ...state,
        selectedItemId: action.instanceId,
      };
    }

    case 'CLEAR_ALL': {
      const undoAction: UndoAction = { type: 'CLEAR_ALL', previousItems: state.items };
      return {
        ...initialState,
        undoStack: [...state.undoStack.slice(-19), undoAction],
      };
    }

    case 'REPLACE_ITEM': {
      return {
        ...state,
        items: state.items.map(item =>
          item.instanceId === action.instanceId
            ? {
                ...item,
                productId: action.newProduct.id,
                position: { ...action.newProduct.defaultPosition },
              }
            : item,
        ),
      };
    }

    case 'TOGGLE_SNAP': {
      return {
        ...state,
        snapToGrid: !state.snapToGrid,
      };
    }

    // ── Slot-based actions ──────────────────────────────────────────

    case 'SET_DESK': {
      const productId = action.product.id;
      return {
        ...state,
        items: state.items.some((i) => i.productId === productId)
          ? state.items
          : [
              ...state.items,
              {
                instanceId: crypto.randomUUID(),
                productId,
                position: { ...action.product.defaultPosition },
                quantity: 1,
              },
            ],
        slots: {
          ...state.slots,
          desk: { productId, sizeVariant: action.sizeVariant },
        },
      };
    }

    case 'SET_CHAIR': {
      const productId = action.product.id;
      return {
        ...state,
        items: state.items.some((i) => i.productId === productId)
          ? state.items
          : [
              ...state.items,
              {
                instanceId: crypto.randomUUID(),
                productId,
                position: { ...action.product.defaultPosition },
                quantity: 1,
              },
            ],
        slots: {
          ...state.slots,
          chair: { productId, colorVariant: action.colorVariant },
        },
      };
    }

    case 'SET_ACCESSORY': {
      const slotKey = action.slot as AccessorySlotKey;
      const currentSlot = state.slots[slotKey];

      // If product is null, do nothing extra for items
      if (!action.product) {
        return {
          ...state,
          slots: {
            ...state.slots,
            [slotKey]: { productId: null },
          },
        };
      }

      const productId = action.product.id;
      return {
        ...state,
        items: state.items.some((i) => i.productId === productId)
          ? state.items
          : [
              ...state.items,
              {
                instanceId: crypto.randomUUID(),
                productId,
                position: { ...action.product.defaultPosition },
                quantity: 1,
              },
            ],
        slots: {
          ...state.slots,
          [slotKey]: { productId },
        },
      };
    }

    case 'CLEAR_SLOT': {
      const slotKey = action.slot;
      // For desk and chair, set to null; for accessories, set productId to null
      if (slotKey === 'desk' || slotKey === 'chair') {
        // Also remove the item from the items array
        const currentSlot = state.slots[slotKey];
        const productIdToRemove = currentSlot?.productId;
        return {
          ...state,
          items: productIdToRemove
            ? state.items.filter((i) => i.productId !== productIdToRemove)
            : state.items,
          slots: {
            ...state.slots,
            [slotKey]: null,
          },
        };
      }

      // Accessory slot
      const accessoryKey = slotKey as AccessorySlotKey;
      const productIdToRemove = state.slots[accessoryKey]?.productId;
      return {
        ...state,
        items: productIdToRemove
          ? state.items.filter((i) => i.productId !== productIdToRemove)
          : state.items,
        slots: {
          ...state.slots,
          [accessoryKey]: { productId: null },
        },
      };
    }

    case 'UNDO': {
      const stack = [...state.undoStack];
      const lastUndo = stack.pop();
      if (!lastUndo) return state;

      switch (lastUndo.type) {
        case 'ADD_ITEM': {
          return {
            ...state,
            items: state.items.filter(item => item.instanceId !== lastUndo.instanceId),
            selectedItemId:
              state.selectedItemId === lastUndo.instanceId ? null : state.selectedItemId,
            undoStack: stack,
          };
        }
        case 'REMOVE_ITEM': {
          return {
            ...state,
            items: [...state.items, lastUndo.item],
            undoStack: stack,
          };
        }
        case 'CLEAR_ALL': {
          return {
            ...state,
            items: lastUndo.previousItems,
            undoStack: stack,
          };
        }
      }
    }

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

/**
 * WorkspaceProvider — wraps children with state + dispatch contexts.
 *
 * @param props.children - Child react nodes.
 */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  return (
    <WorkspaceStateContext.Provider value={state}>
      <WorkspaceDispatchContext.Provider value={dispatch}>
        {children}
      </WorkspaceDispatchContext.Provider>
    </WorkspaceStateContext.Provider>
  );
}
