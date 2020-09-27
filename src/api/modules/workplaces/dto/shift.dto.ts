import { ShiftTypeDto } from './shift-type.dto';

export interface ShiftDto {
  id?: string;
  startDate: Date;
  shiftTypeId: string;
  shiftType: ShiftTypeDto;
}