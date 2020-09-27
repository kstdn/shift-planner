import React from 'react';
import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';

export const WorkplacesContext = React.createContext<{
  workplaces: WorkplaceDto[] | undefined,
  setWorkplaces: Function;
  mostRecentlyUsedWorkplace: WorkplaceDto | undefined;
  setMostRecentlyUsedWorkplace: Function;
}>({ 
  workplaces: undefined,
  setWorkplaces: () => {},
  mostRecentlyUsedWorkplace: undefined,
  setMostRecentlyUsedWorkplace: () => {},
});