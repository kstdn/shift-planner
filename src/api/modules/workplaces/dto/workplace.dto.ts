import { ShiftTypeDto } from './shift-type.dto';

export type WorkplaceDto = {
  id: string;
  name: string;
  shiftTypes?: ShiftTypeDto[];
}