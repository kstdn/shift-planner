import styled from 'styled-components';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const StyledSidebarLink = styled.div<any>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: var(--base-padding);
  justify-content: flex-end;
`;

const IconWrapper = styled.span`
  padding-left: var(--base-padding);
  line-height: 0;
`;

const Link = styled(RouterLink)`
  display: contents;
`;

type Props = {
  icon: JSX.Element;
  children: any;
  onClick?: Function;
  to?: string;
};

const Content = ({ icon, children }: Pick<Props, 'icon' | 'children'>) => (
  <>
    {children}
    <IconWrapper>{icon}</IconWrapper>
  </>
);

export const SidebarLink: FC<Props> = ({ icon, children, onClick, to }) => (
  <StyledSidebarLink onClick={onClick}>
    {to ? (
      <Link to={to}>
        <Content icon={icon}>{children}</Content>
      </Link>
    ) : (
      <Content icon={icon}>{children}</Content>
    )}
  </StyledSidebarLink>
);
