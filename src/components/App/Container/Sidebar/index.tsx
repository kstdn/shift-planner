import React, { FC, useState, useContext } from 'react';
import * as Styled from './styled';
import { MessageContext } from 'context/MessageContext';

export const Sidebar: FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);
  const { message } = useContext(MessageContext);


  return (
    <Styled.Sidebar open={open}>
      <Styled.MenuIconRow onClick={() => setOpen(!open)}>
        { message }
        <Styled.MenuIcon open={open} />
      </Styled.MenuIconRow>
      <Styled.SidebarContent>{children}</Styled.SidebarContent>
    </Styled.Sidebar>
  );
};
