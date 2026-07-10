/**
 * RentCta — bottom-of-page CTA showing "Ready to Rent?" text
 * and a prominent "Rent Your Setup!" button.
 *
 * Only visible when the workspace has items.
 *
 * @status implemented
 */

'use client';

import { useWorkspace } from '@/hooks/useWorkspace';
import { RentButton } from '@/components/summary/RentButton';

export function RentCta() {
  const { isEmpty } = useWorkspace();

  if (isEmpty) return null;

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-lg font-semibold text-slate-800">Ready to Rent?</p>
        <p className="text-sm text-slate-500">
          Your perfect setup is just a click away.
        </p>
      </div>
      <div className="w-64">
        <RentButton disabled={false} />
      </div>
    </div>
  );
}
