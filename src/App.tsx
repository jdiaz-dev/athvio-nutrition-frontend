import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { checkAuthentication, getUserFromLocalStorage } from './shared/helpers/LocalStorage';
// import LogIn from './modules/security/security/adapters/in/components/LogIn';
import ClientsContainer from './modules/clients/clients/adapters/in/components/ClientsContainer';
import ProgramsContainer from './modules/professionals/programs/adapters/in/ProgramsContainer';
import { Drawer } from './shared/components/Drawer';
import { SignUp } from './modules/security/users/adapters/in/SignUp';
import { LogIn } from 'src/modules/security/security/adapters/in/LogIn';
import Test from 'src/modules/clients/clients/adapters/in/components/Test';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserType } from 'src/shared/Consts';
import { ClientGroup } from 'src/shared/types';

/* const loginStyles = makeStyles({
  container: {
    height: '100vh',
    position: 'relative',
  },
  login: {
    width: '100%',
  },
});
 */

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isAuthenticated: true, setIsAuthenticated: useState });

export const ProfessionalIdContext = createContext<{
  professionalId: string;
  setProfessionalId: React.Dispatch<React.SetStateAction<string>>;
}>({ professionalId: '', setProfessionalId: useState });

export const ClientGroupsContext = createContext<{
  clientGroupList: ClientGroup[];
  setClientGroupList: React.Dispatch<React.SetStateAction<ClientGroup[]>>;
}>({ clientGroupList: [], setClientGroupList: useState });

export const ReloadClientListContext = createContext<{
  reloadClientList: boolean;
  setReloadClientList: React.Dispatch<React.SetStateAction<boolean>>;
}>({ reloadClientList: false, setReloadClientList: useState });

function App() {
  // const loginClasses = loginStyles;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [professionalId, setProfessionalId] = useState('');
  const [clientGroupList, setClientGroupList] = useState<ClientGroup[]>([]);
  const [reloadClientList, setReloadClientList] = useState(false);

  const user = getUserFromLocalStorage();

  useEffect(() => {
    setIsAuthenticated(checkAuthentication());
    setProfessionalId(user.userType === UserType.PROFESSIONAL ? user._id : '');
    // return () => {};
  }, [isAuthenticated]);

  const authContext = {
    isAuthenticated,
    setIsAuthenticated,
  };

  const professionalContext = {
    professionalId,
    setProfessionalId,
  };
  const clientGroupContext = {
    clientGroupList,
    setClientGroupList,
  };

  const reloadClientListContext = {
    reloadClientList,
    setReloadClientList,
  };
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthContext.Provider value={authContext}>
          <ProfessionalIdContext.Provider value={professionalContext}>
            <ClientGroupsContext.Provider value={clientGroupContext}>
              <ReloadClientListContext.Provider value={reloadClientListContext}>
                <Routes>
                  {/* <Route path="/" element={<SignUp />} /> */}
                  <Route path="*" element={<LogIn />} />
                  <Route path="signup" element={<SignUp />} />

                  {/* wrapping entire al  routes between Routes  */}
                  {/*
            {!isAuthenticated && (
              <Route
                path="/login"
                element={
                  <div>
                    <LogIn />
                  </div>
                }
              />p
            )} */}

                  {/* <Route path="sidenav" element={<SideNav />}> */}
                  {
                    /* isAuthenticated && */ <Route path="sidenav" element={<Drawer />}>
                      <Route path="clients" element={<ClientsContainer />} />
                      {/* <Route path="Abridores" element={<OpenersContainer />} /> */}
                      <Route path="programs" element={<ProgramsContainer />} />
                      <Route path="test" element={<Test />} />
                    </Route>
                  }

                  {/* default route */}
                  {/* <Route path="*" element={<Navigate to={isAuthenticated ? '/sidenav/Tickets' : '/login'} />} /> */}
                </Routes>
              </ReloadClientListContext.Provider>
            </ClientGroupsContext.Provider>
          </ProfessionalIdContext.Provider>
        </AuthContext.Provider>
      </LocalizationProvider>
    </div>
  );
}

export default App;

/*
  - break down SignUp.tsx into smaller components and use redux
  - learn 1 hour of redux
  - make validations

  - make refactor to manageClientGroup

*/
