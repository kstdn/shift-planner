import React, { FC, useState, useCallback } from 'react';
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
import { getAccessTokenPayload } from 'api/util';
import { logout as logoutAction } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutOutlined } from '@ant-design/icons';
import { getAuthStatus } from 'store/selectors/auth';
import { Status } from 'util/status';

export const App: FC = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);
  const [theme, toggleTheme] = useTheme();
  const [message, setMessage] = useState('Example');
  const accessTokenPayload = getAccessTokenPayload();

  // authStatus will be updated after a login action
  // accessTokenPayload will exist if the token is automatically refreshed
  const isLoggedIn = accessTokenPayload || authStatus === Status.Resolved

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle theme={theme} />
      <Container>
        <MessageContext.Provider value={{ message, setMessage }}>
          <Router history={history}>
            <Main>
              <Routes />
            </Main>
            <Sidebar>
              {!isLoggedIn && (
                <SidebarLink to={Route.Authentication} icon={<User />}>
                  Login
                </SidebarLink>
              )}
              {isLoggedIn && (
                <>
                  <SidebarLink to={Route.Calendar} icon={<Grid />}>
                    Calendar
                  </SidebarLink>
                  <SidebarLink to={Route.Workplaces} icon={<Briefcase />}>
                    Workplaces
                  </SidebarLink>
                  <SidebarLink onClick={logout} icon={<LogoutOutlined />}>
                    Logout
                  </SidebarLink>
                </>
              )}

              <Divider />
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </Sidebar>
          </Router>
        </MessageContext.Provider>
      </Container>
    </>
  );
};
