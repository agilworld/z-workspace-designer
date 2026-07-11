/**
 * WorkspaceArea — main workspace area containing the three boxes
 * (Desk, Chair, Accessories) laid out side by side with flex proportions.
 *
 * Desk and Chair get flex-1 (equal share), Accessories get flex-[2]
 * (twice the share) since it has 6 slots.
 *
 * @status updated — flex-based proportions for more spacious layout
 */

import { DeskBox } from './DeskBox';
import { ChairBox } from './ChairBox';
import { AccessoryBox } from './AccessoryBox';

export function WorkspaceArea() {
  return (
    <div className="flex gap-6 h-full items-stretch">
      {/* Desk box — flex-1 (equal share) */}
      <div className="flex-1 min-w-[260px]">
        <DeskBox />
      </div>

      {/* Chair box — flex-1 (equal share) */}
      <div className="flex-1 min-w-[260px]">
        <ChairBox />
      </div>

      {/* Accessories box — flex-[2] (twice the share, 6 slots) */}
      <div className="flex-[2] min-w-[320px]">
        <AccessoryBox />
      </div>
    </div>
  );
}
