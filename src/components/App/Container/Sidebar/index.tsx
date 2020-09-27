import { MessageContext } from 'context/MessageContext';
import React, { FC, ReactNode, useContext } from 'react';
import * as Styled from './styled';

type Props = {
  open: boolean;
  toggle: () => any;
  children: ReactNode;
} 

export const Sidebar: FC<Props> = ({ open, toggle, children }: Props) => {
  const { message } = useContext(MessageContext);

  return (
    <Styled.Sidebar open={open}>
      <Styled.MenuIconRow onClick={toggle}>
        { message }
        <Styled.MenuIcon open={open} />
      </Styled.MenuIconRow>
      <Styled.SidebarContent>{children}</Styled.SidebarContent>
    </Styled.Sidebar>
  );
};
