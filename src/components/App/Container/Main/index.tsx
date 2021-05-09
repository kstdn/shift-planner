import React, { FC } from 'react';
import styled from 'styled-components';

const StyledMain = styled.main`
  flex: 1;
  background: var(--bg-body);
  color: var(--text-color);
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: min(100%, var(--max-main-width));
  padding-bottom: var(--sidebar-closed-height);
`;

export const Main: FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
