import { ApiRoute } from 'api/api-route';
import { httpClient } from 'util/http-client';
import { WorkplaceDto } from './dto/workplace.dto';
import { ShiftTypeDto } from './dto/shift-type.dto';

export const getWorkplaces = () => {
  return httpClient.get<WorkplaceDto[], WorkplaceDto[]>(ApiRoute.Workplaces);
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
