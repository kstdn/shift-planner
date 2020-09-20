import styled from 'styled-components';
import React from 'react';
import { Loader as LoaderIcon } from 'react-feather';

export const StyledLoader = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => {
  return <StyledLoader>
    <LoaderIcon />
  </StyledLoader>
}