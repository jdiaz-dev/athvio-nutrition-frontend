import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { getUserFromLocalStorage } from './shared/helpers/LocalStorage';
import PatientsContainer from './modules/patients/patients/adapters/in/components/PatientsContainer';
import ProgramsContainer from './modules/professionals/programs/adapters/in/components/ProgramsContainer';
import { Drawer } from './shared/components/Drawer';
import { SignUp } from './modules/authentication/authentication/adapters/in/SignUp';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserType } from 'src/shared/Consts';
import CustomRecipesContainer from 'src/modules/professionals/custom-recipes/adapters/in/components/CustomRecipesContainer';
import ProgramPlansContainer from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansContainer';
import Lab from 'src/modules/Lab';
import PatientPlansContainer from 'src/modules/patients/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansContainer';
import SignIn from './modules/authentication/security/adapters/in/SignIn';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isAuthenticated: true, setIsAuthenticated: useState });

export const ProfessionalIdContext = createContext<{
  professional: string;
  setProfessional: React.Dispatch<React.SetStateAction<string>>;
}>({ professional: '', setProfessional: useState });

function App() {

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
              <Route path="*" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />

              {
                <Route path="sidenav" element={<Drawer />}>
                  <Route path="patients" element={<PatientsContainer />} />
                  <Route path="patients/:patientId/plans" element={<PatientPlansContainer />} />
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
  - fix : only use one call to server in patientList component (void call by default, use skip call for it)
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
    - realize import in backend
*/
