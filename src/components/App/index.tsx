import React, { FC, useState } from 'react';
import { Grid, User, Briefcase } from 'react-feather';
import { Router } from 'react-router-dom';
import { Divider } from 'shared/components/Divider';
import { GlobalStyle } from 'styles/global.style';
import history from 'util/history';
import { Route } from 'util/route.enum';
import { Container } from './Container';
import { Main } from './Container/Main';
import { Sidebar } from './Container/Sidebar';
import { SidebarLink } from './Container/Sidebar/SidebarLink';
import { ThemeToggle } from './Container/Sidebar/ThemeToggle';
import { Routes } from './Routes';
import { useTheme } from './useTheme';
import { MessageContext } from 'context/MessageContext';

export const App: FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [message, setMessage] = useState('Example');

  return (
    <>
      <GlobalStyle theme={theme} />
      <Container>
        <MessageContext.Provider value={{message, setMessage}}>
          <Router history={history}>
            <Main>
              <Routes />
            </Main>
            <Sidebar>
              <SidebarLink to={Route.Authentication} icon={<User />}>
                Login
              </SidebarLink>
              <SidebarLink to={Route.Calendar} icon={<Grid />}>
                Calendar
              </SidebarLink>
              <SidebarLink to={Route.Workplaces} icon={<Briefcase />}>
                Workplaces
              </SidebarLink>
              <Divider />
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </Sidebar>
          </Router>
        </MessageContext.Provider>
      </Container>
    </>
  );
};
