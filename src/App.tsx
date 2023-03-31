import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { checkAuthentication, getUserFromLocalStorage } from './shared/helpers/LocalStorage';
// import LogIn from './modules/security/security/adapters/in/components/LogIn';
import ClientsContainer from './modules/clients/clients/adapters/in/components/ClientsContainer';
import ProgramsContainer from './modules/professionals/programs/adapters/in/components/ProgramsContainer';
import { Drawer } from './shared/components/Drawer';
import { SignUp } from './modules/security/users/adapters/in/SignUp';
import { LogIn } from 'src/modules/security/security/adapters/in/LogIn';
import Test from 'src/modules/clients/clients/adapters/in/components/Test';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserType } from 'src/shared/Consts';
import CustomMealsContainer from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMealsContainer';

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
  professional: string;
  setProfessional: React.Dispatch<React.SetStateAction<string>>;
}>({ professional: '', setProfessional: useState });

function App() {
  // const loginClasses = loginStyles;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [professional, setProfessional] = useState('');

  const user = getUserFromLocalStorage();

  useEffect(() => {
    // setIsAuthenticated(checkAuthentication());
    // return () => {};
  }, [isAuthenticated]);

  useEffect(() => {
    setProfessional(user.userType === UserType.PROFESSIONAL ? user._id : '');
  }, [professional]);

  const authContext = {
    isAuthenticated,
    setIsAuthenticated,
  };

  const professionalContext = {
    professional,
    setProfessional,
  };
  console.log('--------app');
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthContext.Provider value={authContext}>
          <ProfessionalIdContext.Provider value={professionalContext}>
            <Routes>
              <Route path="*" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />

              {
                <Route path="sidenav" element={<Drawer />}>
                  <Route path="clients" element={<ClientsContainer />} />
                  <Route path="programs" element={<ProgramsContainer />} />
                  <Route path="Custom Meals" element={<CustomMealsContainer />} />
                  <Route path="test" element={<Test />} />
                </Route>
              }
            </Routes>
          </ProfessionalIdContext.Provider>
        </AuthContext.Provider>
      </LocalizationProvider>

      {/* <StrictMode>
        <Routes>
          <Route path="*" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          {
            <Route path="sidenav" element={<Drawer />}>
              <Route path="clients" element={<ClientsContainer />} />
              <Route path="programs" element={<ProgramsContainer />} />
              <Route path="Custom Meals" element={<CustomMealsContainer />} />
              <Route path="test" element={<Test />} />
            </Route>
          }
        </Routes>
      </StrictMode> */}
    </div>
  );
}

export default App;

/*
  - implement remove and edit ingredient previously added
  - searcher and paginator for custom meals
*/
