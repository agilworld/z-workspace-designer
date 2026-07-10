/**
 * WorkspaceContext — global state for the workspace designer.
 * Manages placed items, selected category, and rental summary.
 *
 * @status scaffold
 */

import { createContext } from "react";

export interface WorkspaceState {
  /** Placeholder */
  items: unknown[];
}

export const WorkspaceContext = createContext<WorkspaceState | null>(null);
