/**
 * Tooltip — hover tooltip that displays above the wrapped children.
 *
 * Shows a small floating label when the user hovers over the trigger area.
 * Positioned above and centered relative to the trigger.
 *
 * @status implemented
 */

'use client';

import { useState, type ReactNode } from 'react';

interface TooltipProps {
  /** Content to display inside the tooltip bubble. */
  content: ReactNode;
  /** The element that triggers the tooltip on hover. */
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-xs text-white shadow-lg">
          {content}
          {/* Arrow */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}
