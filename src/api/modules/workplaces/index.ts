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
