import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import PatientsContainer from './modules/patients/patients/adapters/in/components/PatientsContainer';
import ProgramsContainer from './modules/professionals/programs/adapters/in/components/ProgramsContainer';
import { Drawer } from './shared/components/Drawer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomRecipesContainer from 'src/modules/professionals/custom-recipes/adapters/in/components/CustomRecipesContainer';
import ProgramPlansContainer from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansContainer';
import PrivateRoute from './core/router/PrivateRoute';
import PublicRoute from './core/router/PublicRoute';
import SignIn from './modules/authentication/authentication/adapters/in/components/singIn/SignIn';
import SignUpProfessional from './modules/authentication/authentication/adapters/in/components/SignUpProfessional/SingUpProfessional';
import PatientConsoleContainer from 'src/modules/patients/patient-console/patient-console/in/components/PatientConsoleContainer';
import QuestionaryDetailContainer from 'src/modules/professionals/questionary-config/adapters/in/components/QuestionaryDetailContainer';
import ActivatePatient from 'src/modules/authentication/authentication/adapters/in/components/ActivatePatient/ActivatePatient';
import Congratulations from 'src/modules/authentication/authentication/adapters/in/components/Congratulations';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route
            path="signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUpProfessional />
              </PublicRoute>
            }
          />
          <Route
            path="activate/:user"
            element={
              <PublicRoute>
                <ActivatePatient />
              </PublicRoute>
            }
          />
          <Route
            path="congratulations"
            element={
              <PublicRoute>
                <Congratulations />
              </PublicRoute>
            }
          />
          <Route
            path="professional"
            element={
              <PrivateRoute>
                <Drawer />
              </PrivateRoute>
            }
          >
            <Route path="patients" element={<PatientsContainer />} />
            {/* <Route path="patients/:patientId/plans" element={<PatientPlansContainer />} /> */}
            <Route path="patients/:patientId/plans" element={<PatientConsoleContainer />} />
            <Route path="professional" element={<PatientConsoleContainer />} />
            <Route path="professional/preferences" element={<QuestionaryDetailContainer />} />
            <Route path="custom Recipes" element={<CustomRecipesContainer />} />
            <Route path="programs" element={<ProgramsContainer />} />
            <Route path="programs/:programId/plans" element={<ProgramPlansContainer />} />
          </Route>
          {<Route path="*" element={<div>404</div>} />}
        </Routes>
      </LocalizationProvider>
    </div>
  );
}

export default App;

/*
  TODO
  - fix delay data after to update recipe (programs module)
  - fix button touched but doesn't increment ingredient amount in program plans

  - rename export interface RecipeBody
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

  urgent users submodules
    - realize import in backend
    - goals
    - notes

    - statistics
    - meditions: antropometric meditions, analytic meditions
    - nutrium: planification: macronutrien planification(planification time)

  urgent technical fix
    tdd patient chat


*/

/* 
  - implement addProgramPlan and mealCrud in PlanDetailDialog component (1 day)
  - implements meals array slice as store (crud), we already have meal slice (1 day)
  - implement addMeal, updateMeal and deleteMeal pointing to redux store in mealDetail (1 day)
  - refactor to point to meals array slice from MealDetail component (1 day)

  - endpoint to create patient plan (1 day)
  - complete implementation with (2 days)
*/

/* 
  prioritary backlog
  - fix: cooking instructions is too slow (web app)
  - remove: remove icon at side of calendar
  - fix: add name of patient in program plans
  - fix: when I have program plans created, and add another program plan, the amount of programs is being reduced
  - analysis: planify logging
  - feat: implement logging
  - security: void ddos attack  
  - fix: validation of loging against backend 
  - logo: use react logo
  - add name of the patient
  - fix: is receiving 3 messsages when subscribe to web socket  in chat (mobile) 
  - fix: security with database ip address
  - fix: security with graphql 
  - fix: security with cors, grqphql and websockets
*/

/* 
  cancer
  diabetes
  osteoarthritis

*/
