import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { checkAuthentication } from './shared/helpers/LocalStorage';
// import LogIn from './modules/security/security/adapters/in/components/LogIn';
import ClientsContainer from './modules/clients/clients/adapters/in/ClientsContainer';
import ProgramsContainer from './modules/professionals/programs/adapters/in/ProgramsContainer';
import { Drawer } from './shared/components/Drawer';
import { SignUp } from './modules/security/users/adapters/in/SignUp';

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
function App() {
  // const loginClasses = loginStyles;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(checkAuthentication());

    // return () => {};
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
  };
  value;
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<SignUp />} /> */}
        <Route path="*" element={<SignUp />} />
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
          />
        )} */}

        {/* <Route path="sidenav" element={<SideNav />}> */}
        {
          /* isAuthenticated && */ <Route path="sidenav" element={<Drawer />}>
            <Route path="clients" element={<ClientsContainer />} />
            {/* <Route path="Abridores" element={<OpenersContainer />} /> */}
            <Route path="programs" element={<ProgramsContainer />} />
          </Route>
        }

        {/* default route */}
        {/* <Route path="*" element={<Navigate to={isAuthenticated ? '/sidenav/Tickets' : '/login'} />} /> */}
      </Routes>
    </div>
  );
}

export default App;

/*
  - break down SignUp.tsx into smaller components and use redux
  - learn 1 hour of redux
  - make validations
*/
