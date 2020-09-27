import React from 'react';
import styled, { css } from 'styled-components';
import { ShiftTypePosition } from 'api/modules/workplaces/dto/shift-type-position.enum';

type ContainerProps = {
  highlight: boolean;
  transparent?: boolean;
  fillContainer?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: inline-block;
  width: 100%;
  height: 100%;
  width: 50px;
  height: 50px;
  position: relative;
  ${props => !!props.transparent ? 'background-color: transparent;' : 'background-color: white; box-shadow: 0 0 0 1px rgba(0,0,0,.1);'}
  ${props => !!props.onClick ? 'cursor: pointer;' : ''}
  ${props => !!props.highlight ? 'outline: 2px solid var(--primary);' : ''}
  ${props => !!props.fillContainer ? 'width: 100%; height: 100%;' : ''}
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
  margin: var(--offset);

  ${ props => {
    switch (props.position) {
      case ShiftTypePosition.Full:
        return css`
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        `;
      case ShiftTypePosition.Top:
        return css`
          top: 0;
          right: 0;
          bottom: 50%;
          left: 0;
        `;
      case ShiftTypePosition.TopLeft:
        return css`
          top: 0;
          right: 50%;
          bottom: 50%;
          left: 0;
        `;
      case ShiftTypePosition.TopRight:
        return css`
          top: 0;
          right: 0;
          bottom: 50%;
          left: 50%;
        `;
      case ShiftTypePosition.Bottom:
        return css`
          top: 50%;
          right: 0;
          bottom: 0;
          left: 0;
        `;
      case ShiftTypePosition.BottomLeft:
        return css`
          top: 50%;
          right: 50%;
          bottom: 0;
          left: 0;
        `;
      case ShiftTypePosition.BottomRight:
        return css`
          top: 50%;
          right: 0;
          bottom: 0;
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
  noBackground?: boolean;
  fillContainer?: boolean;
  onClick?: () => any;
};

const PositionVisualiser = ({ position, color, noBackground, fillContainer, highlight = false, onClick }: Props) => {
  return (
    <Container onClick={onClick} highlight={highlight} transparent={noBackground} fillContainer={fillContainer} >
      <PositionTile position={position} color={color} />
    </Container>
  );
};

export default PositionVisualiser;
