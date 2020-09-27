import { Modal, Select } from 'antd';
import { WorkplacesContext } from 'context/WorkplacesContext';
import React, { useContext, useState } from 'react';
import PositionVisualiser from 'shared/components/PositionVisualiser';
import styled from 'styled-components';

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
  visible: boolean;
  insertConfirmed: () => any;
  insertCanceled: () => any;
};

const InsertModal = ({ visible, insertConfirmed, insertCanceled }: Props) => {
  const {
    workplaces,
    mostRecentlyUsedWorkplace,
    setMostRecentlyUsedWorkplace,
  } = useContext(WorkplacesContext);

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

  return (
    <Modal
      centered
      title='Add shift'
      visible={visible}
      onOk={onOk}
      onCancel={insertCanceled}
      okButtonProps={{
        disabled: !selectedShiftType
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
            <Option value={wp.id} key={wp.id}>{wp.name}</Option>
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
