/**
 * Layout — top-level app shell.
 * Wraps the sidebar, canvas, and summary panel into the 3-column workspace layout.
 *
 * @status scaffold
 */

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {children}
    </div>
  );
}
