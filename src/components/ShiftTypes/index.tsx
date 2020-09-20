import { getShiftTypes, updateShiftType, deleteShiftType, createShiftType } from 'api/modules/workplaces';
import { ShiftTypeDto } from 'api/modules/workplaces/dto/shift-type.dto';
import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';
import React, { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { Loader } from 'shared/components/Loader';
import { NoResults } from 'shared/components/NoResults';
import { PageError } from 'shared/components/PageError';
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from 'util/messages';
import { Status } from 'util/status';
import { ShiftTypesTable } from './ShiftTypesTable';
import * as Styled from './styled';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShiftTypePosition } from 'api/modules/workplaces/dto/shift-type-position.enum';

const { confirm } = Modal;

const showDeletionConfirm = (onOk: (shiftTypeDto: ShiftTypeDto) => any) => {
  confirm({
    title: 'Do you want to delete this shift type?',
    icon: <ExclamationCircleOutlined />,
    onOk,
  });
};

type Props = {
  workplace: WorkplaceDto;
};

const ShiftTypes = ({ workplace }: Props) => {
  const [status, setStatus] = useState(Status.Idle);
  const [shiftTypes, setShiftTypes] = useState<ShiftTypeDto[]>([]);

  const onAddClick = () => {
    showLoadingMessage();
    createShiftType(workplace.id, {
      name: 'New Shift Type',
      sortOrder: 1,
      position: ShiftTypePosition.TopLeft,
      backgroundColor: 'blue',
    })
    .then(shiftTypeDto => {
      setShiftTypes(prev => [shiftTypeDto, ...prev]);
      showSuccessMessage();
    })
    .catch(showErrorMessage);
  }

  const onPropChange = (changes: Partial<ShiftTypeDto>, recordId: string) => {
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

  const onDeleteConfirmed = (shiftTypeDto: ShiftTypeDto) => {
    showLoadingMessage();
    deleteShiftType(shiftTypeDto)
      .then(() => {
        setShiftTypes(prev => prev.filter(item => item.id !== shiftTypeDto.id));
        showSuccessMessage();
      })
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
      <Styled.ShiftTypesContainer>
        {status === Status.Loading && <Loader />}
        {status === Status.Rejected && <PageError />}
        {status === Status.Resolved && !shiftTypes!.length && <NoResults />}
        {status === Status.Resolved && !!shiftTypes!.length && (
          <>
            <Styled.TableHeader>
              <span>Shift Types</span>
              <Plus onClick={onAddClick} />
            </Styled.TableHeader>
            <ShiftTypesTable
              data={shiftTypes}
              onPropChange={onPropChange}
              onDeleteClick={shiftTypeDto => showDeletionConfirm(() => onDeleteConfirmed(shiftTypeDto))}
            />
          </>
        )}
      </Styled.ShiftTypesContainer>
    </>
  );
};

export default ShiftTypes;
