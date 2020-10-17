import React, { Dispatch, SetStateAction } from 'react';
import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';

export const InsertModeContext = React.createContext<{
  insertModeActive: boolean;
  setInsertModeActive: Dispatch<SetStateAction<boolean>>;
  insertModalVisible: boolean;
  setInsertModalVisible: Dispatch<SetStateAction<boolean>>;
  insertDate: Date;
  setInsertDate: Dispatch<SetStateAction<Date>>;
  workplaces: WorkplaceDto[] | undefined,
  setWorkplaces: Dispatch<SetStateAction<WorkplaceDto[] | undefined>>;
  mostRecentlyUsedWorkplace: WorkplaceDto | undefined;
  setMostRecentlyUsedWorkplace: Dispatch<SetStateAction<WorkplaceDto | undefined>>;
}>({ 
  insertModeActive: false,
  setInsertModeActive: () => {},
  insertModalVisible: false,
  setInsertModalVisible: () => {},
  insertDate: new Date(),
  setInsertDate: () => {},
  workplaces: undefined,
  setWorkplaces: () => {},
  mostRecentlyUsedWorkplace: undefined,
  setMostRecentlyUsedWorkplace: () => {},
});