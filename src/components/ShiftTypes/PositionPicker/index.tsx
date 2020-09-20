import React, { useState } from 'react';
import PositionVisualiser from 'shared/components/PositionVisualiser';
import { ShiftTypePosition } from 'api/modules/workplaces/dto/shift-type-position.enum';
import Modal from 'antd/lib/modal/Modal';
import { Divider } from 'antd';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  position: ShiftTypePosition;
  color: string;
  onChange: (position: ShiftTypePosition) => any;
};

const PositionPicker = ({ position, color, onChange }: Props) => {
  const [visible, setVisible] = useState(false);

  const handlePicked = (position: ShiftTypePosition) => {
    onChange(position);
    setVisible(false);
  };

  return (
    <>
      <PositionVisualiser
        onClick={() => setVisible(prev => !prev)}
        position={position}
        color={color}
      />
      <Modal
        title='Pick a position'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Divider orientation='left' plain>
          Full
        </Divider>
        <Row>
          <PositionVisualiser
            onClick={() => handlePicked(ShiftTypePosition.Full)}
            position={ShiftTypePosition.Full}
            color={color}
          />
        </Row>

        <Divider orientation='left' plain>
          Top
        </Divider>
        <Row>
          <PositionVisualiser
            onClick={() => handlePicked(ShiftTypePosition.Top)}
            position={ShiftTypePosition.Top}
            color={color}
          />
          <PositionVisualiser
            onClick={() => handlePicked(ShiftTypePosition.TopLeft)}
            position={ShiftTypePosition.TopLeft}
            color={color}
          />
          <PositionVisualiser
            onClick={() => handlePicked(ShiftTypePosition.TopRight)}
            position={ShiftTypePosition.TopRight}
            color={color}
          />
        </Row>

        <Divider orientation='left' plain>
          Bottom
        </Divider>
        <Row>
          <PositionVisualiser
            onClick={() => handlePicked(ShiftTypePosition.Bottom)}
            position={ShiftTypePosition.Bottom}
            color={color}
          />
          <PositionVisualiser
            onClick={() => handlePicked(ShiftTypePosition.BottomLeft)}
            position={ShiftTypePosition.BottomLeft}
            color={color}
          />
          <PositionVisualiser
            onClick={() => handlePicked(ShiftTypePosition.BottomRight)}
            position={ShiftTypePosition.BottomRight}
            color={color}
          />
        </Row>
      </Modal>
    </>
  );
};

export default PositionPicker;
