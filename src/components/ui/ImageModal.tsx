/**
 * ImageModal — accessible full-screen image modal.
 *
 * Renders a backdrop + centered image with close-on-ESC, focus trap,
 * body scroll lock, and proper ARIA attributes.
 *
 * @status new
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  /** Image source URL. */
  src: string;
  /** Alt text for the image. */
  alt: string;
  /** Whether the modal is open. */
  isOpen: boolean;
  /** Called when the user requests to close the modal. */
  onClose: () => void;
}

export function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // ── Body scroll lock + focus management ────────────────────────────────

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Simple focus trap: keep focus within the modal
      if (e.key === 'Tab') {
        const modal = closeButtonRef.current?.closest('[role="dialog"]');
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Focus the close button after render
    const raf = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    // Listen for keyboard events
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to the previously active element
      previousActiveElement.current?.focus();
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
        aria-label="Close image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          className="h-auto w-auto max-h-[85vh] rounded-lg object-contain shadow-2xl"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
