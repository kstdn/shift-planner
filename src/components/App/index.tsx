import React, { FC, useState, useCallback, useEffect } from 'react';
import { Grid, User, Briefcase, LogOut } from 'react-feather';
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
import { getAuthStatus } from 'store/selectors/auth';
import { Status } from 'util/status';
import { getRouterState } from 'store/selectors';
import InsertionModeSidebarItem from 'components/Calendar/InsertionModeSidebarItem';
import { InsertModeContext } from 'context/InsertModeContext';
import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';


export const App: FC = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);
  const {
    location: { pathname: activeRoute },
  } = useSelector(getRouterState);
  const [theme, toggleTheme] = useTheme();
  const [message, setMessage] = useState<string | undefined>();
  const [insertModeActive, setInsertModeActive] = useState<boolean>(false);
  const [insertDate, setInsertDate] = useState<Date>(new Date());
  const [insertModalVisible, setInsertModalVisible] = useState<boolean>(false);
  const [workplaces, setWorkplaces] = useState<WorkplaceDto[]>();
  const [mostRecentlyUsedWorkplace, setMostRecentlyUsedWorkplace] = useState<
    WorkplaceDto
  >();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const accessTokenPayload = getAccessTokenPayload();

  // authStatus will be updated after a login action
  // accessTokenPayload will exist if the token is automatically refreshed
  const isLoggedIn = accessTokenPayload || authStatus === Status.Resolved;

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  useEffect(() => {
    if(insertModeActive) {
      setSidebarOpen(false);
    }
  }, [insertModeActive]);

  useEffect(() => {
    if(insertModeActive) {
      setMessage('You are in Insert Mode');
    } else {
      setMessage(undefined);
    }
  }, [insertModeActive]);

  return (
    <>
      <GlobalStyle theme={theme} />
      <Container>
        <MessageContext.Provider value={{ message, setMessage }}>
          <InsertModeContext.Provider
            value={{
              insertModeActive,
              setInsertModeActive,
              insertDate,
              setInsertDate,
              insertModalVisible,
              setInsertModalVisible,
              workplaces,
              setWorkplaces,
              mostRecentlyUsedWorkplace,
              setMostRecentlyUsedWorkplace,
            }}
          >
            <Router history={history}>
              <Main>
                <Routes />
              </Main>
              <Sidebar
                open={sidebarOpen}
                toggle={() => setSidebarOpen(prev => !prev)}
              >
                {!isLoggedIn && (
                  <SidebarLink to={Route.Authentication} icon={<User />}>
                    Login
                  </SidebarLink>
                )}
                {isLoggedIn && (
                  <>
                    {activeRoute === '/calendar' && (
                      <InsertionModeSidebarItem
                        setWorkplaces={setWorkplaces}
                      />
                    )}
                    <SidebarLink to={Route.Calendar} icon={<Grid />}>
                      Calendar
                    </SidebarLink>
                    <SidebarLink to={Route.Workplaces} icon={<Briefcase />}>
                      Workplaces
                    </SidebarLink>
                    <SidebarLink onClick={logout} icon={<LogOut />}>
                      Logout
                    </SidebarLink>
                  </>
                )}
                <Divider />
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </Sidebar>
            </Router>
          </InsertModeContext.Provider>
        </MessageContext.Provider>
      </Container>
    </>
  );
};
