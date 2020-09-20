import { getShiftTypes, updateShiftType } from 'api/modules/workplaces';
import { ShiftTypeDto } from 'api/modules/workplaces/dto/shift-type.dto';
import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';
import React, { useEffect, useState } from 'react';
import { Loader, Plus } from 'react-feather';
import { NoResults } from 'shared/components/NoResults';
import { PageError } from 'shared/components/PageError';
import { Status } from 'util/status';
import { ShiftTypesTable } from './ShiftTypesTable';
import * as Styled from './styled';
import { showLoadingMessage, showSuccessMessage, showErrorMessage } from 'util/messages';

type Props = {
  workplace: WorkplaceDto;
};

const ShiftTypes = ({ workplace }: Props) => {
  const [status, setStatus] = useState(Status.Idle);
  const [shiftTypes, setShiftTypes] = useState<ShiftTypeDto[]>([]);

  const onPropChange = (
    changes: Partial<ShiftTypeDto>,
    recordId: string,
  ) => {
    const newData = [...shiftTypes];
    const index = newData.findIndex(item => recordId === item.id);
    const item = shiftTypes[index];
    const updatedItem = {
      ...item,
      ...changes,
    };
    newData.splice(index, 1, updatedItem);
    setShiftTypes(newData);

    showLoadingMessage();
    updateShiftType(updatedItem)
      .then(showSuccessMessage)
      .catch(showErrorMessage);
  };

  useEffect(() => {
    setStatus(Status.Loading);
    getShiftTypes(workplace.id)
      .then(result => {
        setShiftTypes(result);
        setStatus(Status.Resolved);
      })
      .catch(error => {
        setStatus(Status.Rejected);
      });
  }, [workplace]);

  const initCreatingShiftType = () => {};

  return (
    <>
      {status === Status.Loading && <Loader />}
      {status === Status.Rejected && <PageError />}
      {status === Status.Resolved && !shiftTypes!.length && <NoResults />}
      {status === Status.Resolved && !!shiftTypes!.length && (
        <Styled.ShiftTypesContainer>
          <Styled.TableHeader>
            <span>Shift Types</span>
            <Plus onClick={initCreatingShiftType} />
          </Styled.TableHeader>
          <ShiftTypesTable data={shiftTypes} onPropChange={onPropChange} />
        </Styled.ShiftTypesContainer>
      )}
    </>
  );
};

export default ShiftTypes;
