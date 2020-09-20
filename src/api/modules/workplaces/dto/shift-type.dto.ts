import { ShiftTypePosition } from './shift-type-position.enum';

export type ShiftTypeDto = {
  id: string;
  name: string;
  sortOrder: number;
  position: ShiftTypePosition;
  backgroundColor: string;
  workplaceId: string;
};
