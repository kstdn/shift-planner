import styled from 'styled-components';
import { SwatchesPicker } from 'react-color';

export const ColorTile = styled.div`
    padding: 2px;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    cursor: pointer;
    position: relative;
`;

export const Color = styled.div`
    width: 36px;
    height: 14px;
    border-radius: 2px;
    background: ${props => props.color};
`;

export const ColorPicker = styled(SwatchesPicker).attrs({
  triangle: 'top-left',
  width: 366,
})`
  position: absolute !important;
  top: 150%;
  left: -10px;
  z-index: 1;
`;