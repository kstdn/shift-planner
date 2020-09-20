import React, { useState } from 'react';
import PositionVisualiser from 'shared/components/PositionVisualiser';
import { ShiftTypePosition } from 'api/modules/workplaces/dto/shift-type-position.enum';
import Modal from 'antd/lib/modal/Modal';
import { Divider } from 'antd';
import styled from 'styled-components';
import ColorPickerTile from '../ColorPickerTile';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

type VisualisationProps = {
  position: ShiftTypePosition;
  backgroundColor: string;
}

type Props = {
  position: ShiftTypePosition;
  backgroundColor: string;
  onChange: (properites: VisualisationProps) => any;
};

const VisualizationPicker = ({ position: positionProp, backgroundColor: backgroundColorProp, onChange }: Props) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(positionProp);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColorProp);
  
  const confirm = () => {
    setVisible(false);
    onChange({ position, backgroundColor });
  }

  const cancel = () => {
    setVisible(false);
    setPosition(positionProp);
    setBackgroundColor(backgroundColorProp);
  }

  return (
    <>
      <PositionVisualiser
        position={positionProp}
        color={backgroundColorProp}
        onClick={() => setVisible(prev => !prev)}
      />
      <Modal
        title='Visualization'
        visible={visible}
        onCancel={() => cancel()}
        onOk={() => confirm()}
      >
        <Divider orientation='left'>
          Color
        </Divider>
        <ColorPickerTile color={backgroundColor} onColorChange={color => setBackgroundColor(color)}/>

        <Divider orientation='left'>
          Position
        </Divider>
        <Row>
          <PositionVisualiser
            onClick={() => setPosition(ShiftTypePosition.Full)}
            highlight={position === ShiftTypePosition.Full}
            position={ShiftTypePosition.Full}
            color={backgroundColor}
          />
        </Row>

        <Divider />
        <Row>
          <PositionVisualiser
            onClick={() => setPosition(ShiftTypePosition.Top)}
            highlight={position === ShiftTypePosition.Top}
            position={ShiftTypePosition.Top}
            color={backgroundColor}
          />
          <PositionVisualiser
            onClick={() => setPosition(ShiftTypePosition.TopLeft)}
            highlight={position === ShiftTypePosition.TopLeft}
            position={ShiftTypePosition.TopLeft}
            color={backgroundColor}
          />
          <PositionVisualiser
            onClick={() => setPosition(ShiftTypePosition.TopRight)}
            highlight={position === ShiftTypePosition.TopRight}
            position={ShiftTypePosition.TopRight}
            color={backgroundColor}
          />
        </Row>

        <Divider />
        <Row>
          <PositionVisualiser
            onClick={() => setPosition(ShiftTypePosition.Bottom)}
            highlight={position === ShiftTypePosition.Bottom}
            position={ShiftTypePosition.Bottom}
            color={backgroundColor}
          />
          <PositionVisualiser
            onClick={() => setPosition(ShiftTypePosition.BottomLeft)}
            highlight={position === ShiftTypePosition.BottomLeft}
            position={ShiftTypePosition.BottomLeft}
            color={backgroundColor}
          />
          <PositionVisualiser
            onClick={() => setPosition(ShiftTypePosition.BottomRight)}
            highlight={position === ShiftTypePosition.BottomRight}
            position={ShiftTypePosition.BottomRight}
            color={backgroundColor}
          />
        </Row>
      </Modal>
    </>
  );
};

export default VisualizationPicker;
