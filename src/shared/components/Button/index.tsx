import React, { forwardRef } from 'react';
import * as Styled from './styled';

export const Button = forwardRef<HTMLButtonElement, any>(
  ({ children, ...buttonProps }, ref) => {
    return (
      <Styled.Button {...buttonProps} ref={ref}>
        {children}
      </Styled.Button>
    );
  },
);
