import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import PatientsContainer from './modules/patients/patients/adapters/in/components/PatientsContainer';
import ProgramsContainer from './modules/professionals/programs/adapters/in/components/ProgramsContainer';
import { Drawer } from './shared/components/Drawer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NutritionalMealsContainer from 'src/modules/professionals/nutritional-meals/adapters/in/components/NutritionalMealsContainer';
import ProgramPlansContainer from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansContainer';
import PrivateRoute from './core/router/PrivateRoute';
import PublicRoute from './core/router/PublicRoute';
import SignIn from './modules/authentication/authentication/adapters/in/components/singIn/SignIn';
import SignUpProfessional from './modules/authentication/authentication/adapters/in/components/SignUpProfessional/SingUpProfessional';
import PatientConsoleContainer from 'src/modules/patients/patient-console/patient-console/in/components/PatientConsoleContainer';
import QuestionaryDetailContainer from 'src/modules/questionaries/professional-questionaries/adapters/in/components/QuestionaryDetailContainer';
import ActivatePatient from 'src/modules/authentication/authentication/adapters/in/components/ActivatePatient/ActivatePatient';
import Congratulations from 'src/modules/authentication/authentication/adapters/in/components/Congratulations';
import PatientPlansCalendar from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansCalendar';
import CaloriesContainer from 'src/modules/patients/patient-console/calories/adapters/in/CaloriesContainer';
import NotesContainer from 'src/modules/patients/patient-console/notes/adapters/in/components/NotesContainer';
import PatientQuestionaryContainer from 'src/modules/questionaries/patient-questionaries/adapters/in/components/PatientQuestionaryContainer';
import PatientProfileContainer from 'src/modules/patients/patient-console/profile/in/components/PatientProfileContainer';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
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
            <Route path="patients" element={<PatientsContainer />}></Route>
            <Route path="patients/:patientId" element={<PatientConsoleContainer />}>
              <Route path="plans" element={<PatientPlansCalendar />} />
              <Route path="calories" element={<CaloriesContainer />} />
              <Route path="notes" element={<NotesContainer />} />
              <Route path="questionary" element={<PatientQuestionaryContainer />} />
              <Route path="profile" element={<PatientProfileContainer />} />
            </Route>
            <Route path="professional" element={<PatientConsoleContainer />} />
            <Route path="professional/preferences" element={<QuestionaryDetailContainer />} />
            <Route path="meals" element={<NutritionalMealsContainer />} />
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
