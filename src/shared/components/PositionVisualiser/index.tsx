import React from 'react';
import styled, { css } from 'styled-components';
import { ShiftTypePosition } from 'api/modules/workplaces/dto/shift-type-position.enum';

type ContainerProps = {
  highlight: boolean;
}

const Container = styled.div<ContainerProps>`
  display: inline-block;
  width: 100%;
  height: 100%;
  width: 50px;
  height: 50px;
  position: relative;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  background-color: white;
  ${props => !!props.onClick ? 'cursor: pointer;' : ''}
  ${props => !!props.highlight ? 'box-shadow: 0 0 2px 0;' : ''}
`;

type PositionTileProps = {
  position: ShiftTypePosition;
  color: string;
};

const PositionTile = styled.div<PositionTileProps>`
  --offset: 2px;
  position: absolute;
  border-radius: 2px;
  background-color: ${ props => props.color };
  ${ props => {
    switch (props.position) {
      case ShiftTypePosition.Full:
        return css`
          top: var(--offset);
          right: var(--offset);
          bottom: var(--offset);
          left: var(--offset);
        `;
      case ShiftTypePosition.Top:
        return css`
          top: var(--offset);
          right: var(--offset);
          bottom: 50%;
          left: var(--offset);
        `;
      case ShiftTypePosition.TopLeft:
        return css`
          top: var(--offset);
          right: 50%;
          bottom: 50%;
          left: var(--offset);
        `;
      case ShiftTypePosition.TopRight:
        return css`
          top: var(--offset);
          right: var(--offset);
          bottom: 50%;
          left: 50%;
        `;
      case ShiftTypePosition.Bottom:
        return css`
          top: 50%;
          right: var(--offset);
          bottom: var(--offset);
          left: var(--offset);
        `;
      case ShiftTypePosition.BottomLeft:
        return css`
          top: 50%;
          right: 50%;
          bottom: var(--offset);
          left: var(--offset);
        `;
      case ShiftTypePosition.BottomRight:
        return css`
          top: 50%;
          right: var(--offset);
          bottom: var(--offset);
          left: 50%;
        `;
      default:
        break;
    }
  }}
`;

type Props = {
  position: ShiftTypePosition;
  color: string;
  highlight?: boolean;
  onClick?: () => any;
};

const PositionVisualiser = ({ position, color, highlight = false, onClick }: Props) => {
  return (
    <Container onClick={onClick} highlight={highlight}>
      <PositionTile position={position} color={color} />
    </Container>
  );
};

export default PositionVisualiser;
