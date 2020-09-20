import React, { FC } from 'react';
import { Moon, Sun } from 'react-feather';
import { SidebarLink } from 'components/App/Container/Sidebar/SidebarLink';
import { ThemeMode } from 'components/App/useTheme';

type Props = {
  theme: ThemeMode;
  onToggle: Function;
};

export const ThemeToggle: FC<Props> = ({ children, ...props }) => {
  const isLight = props.theme === 'light';
  return (
    <SidebarLink icon={isLight ? <Sun /> : <Moon />} onClick={props.onToggle}>
      { isLight ? 'Light Mode' : 'Dark Mode' }
    </SidebarLink>
  );
};
