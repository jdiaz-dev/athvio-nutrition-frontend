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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserType } from 'src/shared/Consts';
import CustomRecipesContainer from 'src/modules/professionals/custom-recipes/adapters/in/components/CustomRecipesContainer';
import ProgramPlansContainer from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansContainer';
import Lab from 'src/modules/Lab';
import ClientPlansContainer from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/ClientPlansContainer';

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

  /* useEffect(() => {
    // setIsAuthenticated(checkAuthentication());
    // return () => {};
  }, [isAuthenticated]); */

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
  // console.log('--------app');

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
                  <Route path="clients/:clientId/plans" element={<ClientPlansContainer />} />
                  <Route path="Custom Recipes" element={<CustomRecipesContainer />} />
                  <Route path="Programs" element={<ProgramsContainer />} />
                  <Route path="Programs/:programId/plans" element={<ProgramPlansContainer />} />
                  <Route path="Lab" element={<Lab />} />
                </Route>
              }
            </Routes>
          </ProfessionalIdContext.Provider>
        </AuthContext.Provider>
      </LocalizationProvider>
    </div>
  );
}

export default App;

/*
  TODO
  - implement remove and edit ingredient previously added
  - searcher and paginator for custom Recipes
  - fix delay data after to update recipe (programs module)
  - fix button touched but doesn't increment ingredient amount in program plans
  - fix create meal plan (at momemt to choose meal name from wilcalrd call inmediatly to the backend) in MealDetail component

  - rename export interface RecipeBody
  - fix bug at moment to add ingredient and some macros is 0, NaN  is the  result trying to add ingredient
  - fix : only use one call to server in clientList component (void call by default, use skip call for it)
  - fix. refactor food list component ot better understand
  - fix: refactor - at moment to get info from ALL database, it is not capable to get the meal searched in the search
*/

/*
  REDUX
  to check again:
    Reducers Should Own the State Shape

  to apply now:
    Treat Reducers as State Machines - very important
    Allow Many Reducers to Respond to the Same Action

    Call useSelector Multiple Times in Function Components  ---> extremely important
*/

/*
  todo now
  - eliminate plan from program
  - copy plan to another day

  urgent
  - import meal from custom recipes
    - realize import in backend
    - add pagination to custom recipes
*/

/* 
  actually working
    -refactoring PlanDetailDialog.tsx
*/
