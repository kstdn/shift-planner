import { getShiftTypes } from 'api/modules/workplaces';
import { ShiftTypePosition } from 'api/modules/workplaces/dto/shift-type-position.enum';
import { ShiftTypeDto } from 'api/modules/workplaces/dto/shift-type.dto';
import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';
import React, { useEffect, useState } from 'react';
import { Loader, Plus } from 'react-feather';
import { NoResults } from 'shared/components/NoResults';
import { PageError } from 'shared/components/PageError';
import { Status } from 'util/status';
import { ShiftTypesTable } from './ShiftTypesTable';
import * as Styled from './styled';

type Props = {
  workplace: WorkplaceDto;
};

const ShiftTypes = ({ workplace }: Props) => {
  const [status, setStatus] = useState(Status.Idle);
  const [shiftTypes, setShiftTypes] = useState<ShiftTypeDto[]>([]);

  const handleSave = (record: ShiftTypeDto) => {
    const newData = [...shiftTypes];
    const index = newData.findIndex(item => record.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...record,
    });
    setShiftTypes(newData);
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

  const onPositionChange = (position: ShiftTypePosition, index: number) =>
    setShiftTypes(prev => {
      prev![index].position = position;
      return [...prev!];
    });

  const onColorChange = (color: string, index: number) =>
    setShiftTypes(prev => {
      prev![index].backgroundColor = color;
      return [...prev!];
    });

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
          <ShiftTypesTable
            data={shiftTypes}
            onPositionChange={onPositionChange}
            onColorChange={onColorChange}
            handleSave={handleSave}
          />
        </Styled.ShiftTypesContainer>
      )}
    </>
  );
};

export default ShiftTypes;
