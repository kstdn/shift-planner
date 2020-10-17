import { Modal, Select } from 'antd';
import { InsertModeContext } from 'context/InsertModeContext';
import React, { useContext, useState } from 'react';
import PositionVisualiser from 'shared/components/PositionVisualiser';
import styled from 'styled-components';
import { format } from 'date-fns';
import { createShiftType, createShift } from 'api/modules/workplaces';
import { showErrorMessage, showSuccessMessage } from 'util/messages';
import { ShiftDto } from 'api/modules/workplaces/dto/shift.dto';

const StyledShiftTypesContainer = styled.div`
  display: flex;
  margin-top: 12px;

  & > *:not(:last-of-type) {
    margin-right: 12px;
  }
`;

const StyledShiftTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const { Option } = Select;

type Props = {
  onInsertSuccess: (shift: ShiftDto) => any;
};

const InsertModal = ({ onInsertSuccess }: Props) => {
  const {
    setInsertModalVisible,
    workplaces,
    mostRecentlyUsedWorkplace,
    insertDate,
    setMostRecentlyUsedWorkplace,
  } = useContext(InsertModeContext);

  const [selectedWorkplace, setSelectedWorkplace] = useState(
    mostRecentlyUsedWorkplace || workplaces?.[0],
  );
  const [selectedShiftType, setSelectedShiftType] = useState(
    selectedWorkplace?.shiftTypes?.[0],
  );

  const onSelectedWorkplaceChange = (workplaceId: string) => {
    const workplace = workplaces?.find(wp => wp.id === workplaceId);
    setMostRecentlyUsedWorkplace(workplace);
    setSelectedWorkplace(workplace);
  };

  const onOk = () => {
    insertConfirmed();
  };

  const insertConfirmed = () => {
    setInsertModalVisible(false);
    setSelectedShiftType(selectedWorkplace?.shiftTypes?.[0]);
    createShift(selectedWorkplace!.id, {
      startDate: insertDate.toISOString(),
      shiftTypeId: selectedShiftType!.id!,
    })
      .then(shift => {
        showSuccessMessage();
        onInsertSuccess(shift);
      })
      .catch(showErrorMessage);
  };

  return (
    <Modal
      centered
      title={`Add shift for ${format(insertDate, 'dd/MM')}`}
      visible={true}
      onOk={onOk}
      onCancel={() =>  setInsertModalVisible(false)}
      okButtonProps={{
        disabled: !insertDate || !selectedWorkplace || !selectedShiftType,
      }}
    >
      <div>
        <Select
          defaultValue={selectedWorkplace?.id}
          style={{ width: '100%' }}
          size={'large'}
          onChange={onSelectedWorkplaceChange}
        >
          {(workplaces || []).map(wp => (
            <Option value={wp.id} key={wp.id}>
              {wp.name}
            </Option>
          ))}
        </Select>
        <StyledShiftTypesContainer>
          {selectedWorkplace?.shiftTypes?.map(st => (
            <StyledShiftTypeContainer key={st.id}>
              <div>{st.name}</div>
              <PositionVisualiser
                position={st.position}
                color={st.backgroundColor}
                highlight={st.id === selectedShiftType?.id}
                onClick={() => setSelectedShiftType(st)}
              />
            </StyledShiftTypeContainer>
          ))}
        </StyledShiftTypesContainer>
      </div>
    </Modal>
  );
};

export default InsertModal;
