import { ApiRoute } from 'api/api-route';
import { httpClient } from 'util/http-client';
import { WorkplaceDto } from './dto/workplace.dto';
import { ShiftTypeDto } from './dto/shift-type.dto';
import { ShiftDto } from './dto/shift.dto';

export const getWorkplaces = (includeShiftTypes: boolean) => {
  return httpClient.get<WorkplaceDto[], WorkplaceDto[]>(ApiRoute.Workplaces, {
    params: {
      includeShiftTypes
    }
  });
};

export const getShiftTypes = (workplaceId: string) => {
  return httpClient.get<ShiftTypeDto[], ShiftTypeDto[]>(ApiRoute.ShiftTypes(workplaceId));
};

export const createShiftType = (workplaceId: string, shiftTypeDto: ShiftTypeDto) => {
  return httpClient.post<ShiftTypeDto, ShiftTypeDto>(ApiRoute.ShiftTypes(workplaceId), shiftTypeDto);
};

export const updateShiftType = (shiftTypeDto: ShiftTypeDto) => {
  return httpClient.patch<ShiftTypeDto, ShiftTypeDto>(`${ApiRoute.ShiftTypes(shiftTypeDto.workplaceId!)}/${shiftTypeDto.id}`, shiftTypeDto);
};

export const deleteShiftType = (shiftTypeDto: ShiftTypeDto) => {
  return httpClient.delete<ShiftTypeDto, ShiftTypeDto>(`${ApiRoute.ShiftTypes(shiftTypeDto.workplaceId!)}/${shiftTypeDto.id}`);
};

export const getShifts = (from: Date, to: Date) => {
  return httpClient.get<ShiftDto[], ShiftDto[]>(ApiRoute.Shifts, {
    params: {
      from: from.toISOString(),
      to: to.toISOString(),
    }
  });
};

export const createShift = (workplaceId: string, shiftDto: ShiftDto) => {
  return httpClient.post<ShiftDto, ShiftDto>(ApiRoute.WorkplaceShifts(workplaceId), shiftDto);
};

export const deleteShift = (workplaceId: string, shiftId: string) => {
  return httpClient.delete<ShiftDto, ShiftDto>(`${ApiRoute.WorkplaceShifts(workplaceId)}/${shiftId}`);
};
