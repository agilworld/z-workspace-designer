/**
 * AccessoryBox — container for all accessory slots (Monitor, Lamps, Keyboard, etc.).
 *
 * Renders a vertical stack of AccessorySlot components.
 *
 * @status new
 */

import { AccessorySlot } from './AccessorySlot';
import type { AccessorySlotKey } from '@/types';

interface AccessorySlotDef {
  label: string;
  slotKey: AccessorySlotKey;
  icon: string;
}

const ACCESSORY_SLOTS: AccessorySlotDef[] = [
  { label: 'Monitor', slotKey: 'monitor', icon: '🖥️' },
  { label: 'Lamps', slotKey: 'lamp', icon: '💡' },
  { label: 'Keyboard', slotKey: 'keyboard', icon: '⌨️' },
  { label: 'Mouse', slotKey: 'mouse', icon: '🖱️' },
  { label: 'Plant', slotKey: 'plant', icon: '🌿' },
  { label: 'Mousepad', slotKey: 'mousepad', icon: '🟫' },
];

export function AccessoryBox() {
  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-md hover:shadow-lg border border-slate-200 hover:border-slate-300 p-5 transition-all duration-300">
      <h3 className="mb-3 text-base font-bold text-slate-700">Accessories</h3>
      <div className="flex flex-col gap-2">
        {ACCESSORY_SLOTS.map((def) => (
          <AccessorySlot
            key={def.slotKey}
            label={def.label}
            slotKey={def.slotKey}
            icon={def.icon}
          />
        ))}
      </div>
    </div>
  );
}
