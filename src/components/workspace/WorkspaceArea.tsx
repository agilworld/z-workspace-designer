/**
 * WorkspaceArea — main workspace area containing the three boxes
 * (Desk, Chair, Accessories) laid out side by side.
 *
 * @status new
 */

import { DeskBox } from './DeskBox';
import { ChairBox } from './ChairBox';
import { AccessoryBox } from './AccessoryBox';

export function WorkspaceArea() {
  return (
    <div className="flex gap-4 h-full">
      {/* Desk box — takes up proportional width */}
      <div className="w-1/4 min-w-[200px]">
        <DeskBox />
      </div>

      {/* Chair box — takes up proportional width */}
      <div className="w-1/4 min-w-[200px]">
        <ChairBox />
      </div>

      {/* Accessories box — takes up remaining space */}
      <div className="flex-1 min-w-[300px]">
        <AccessoryBox />
      </div>
    </div>
  );
}
