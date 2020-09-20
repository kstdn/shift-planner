import styled from 'styled-components';
import { GithubPicker } from 'react-color';

export const ColorTile = styled.div`
    padding: 2px;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    cursor: pointer;
`;

export const Color = styled.div`
    width: 36px;
    height: 14px;
    border-radius: 2px;
    background: ${props => props.color};
`;

export const ColorPicker = styled(GithubPicker).attrs({
  triangle: 'top-right',
})`
  position: absolute !important;
  top: 100%;
  right: calc(100% - 50px);
`;