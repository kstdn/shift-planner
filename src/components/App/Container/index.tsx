import React, { FC } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
`;

export const Container: FC = ({ children, ...props }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
