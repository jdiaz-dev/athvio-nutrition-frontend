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
import SignIn from './modules/auth/auth/adapters/in/components/singIn/SignIn';
import SignUpProfessional from './modules/auth/auth/adapters/in/components/SignUpProfessional/SingUpProfessional';
import PatientConsoleContainer from 'src/modules/patients/patient-console/patient-console/in/components/PatientConsoleContainer';
import QuestionaryDetailContainer from 'src/modules/professionals/professional-questionaries/adapters/in/components/QuestionaryDetailContainer';
import PatientPlansCalendar from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansCalendar';
import PlanificationContainer from 'src/modules/patients/patient-console/planifications/adapters/in/components/PlanificationContainer';
import NotesContainer from 'src/modules/patients/patient-console/notes/adapters/in/components/NotesContainer';
import PatientQuestionaryContainer from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/PatientQuestionaryContainer';
import PatientProfileContainer from 'src/modules/patients/patient-console/profile/in/components/PatientProfileContainer';
import LandingPage from 'src/core/components/LandingPage/LandingPage';
import Lab from 'src/modules/Lab';
import UnauthorizedDialog from 'src/modules/auth/auth/adapters/in/dialogs/UnauthorizedDialog';
import PlantDosificator from 'src/plant-dosificator/PlantDosificator';
import BiologicalTerrainAssessmentContainer from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/BiologicalTerrainAssessmentContainer';
import { routes } from 'src/shared/Consts';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path={routes.landing.path} element={<LandingPage />} />
          <Route path="/" element={<Navigate to={`/${routes.signin.path}`} replace />} />
          <Route
            path={routes.signin.path}
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />

          <Route
            path={routes.signup.path}
            element={
              <PublicRoute>
                <SignUpProfessional />
              </PublicRoute>
            }
          />

          <Route
            path={routes.professional.path}
            element={
              <PrivateRoute>
                <Drawer />
              </PrivateRoute>
            }
          >
            <Route path={routes.professional.children.patients.path} element={<PatientsContainer />} />

            <Route path={routes.professional.children.patientDetail.path} element={<PatientConsoleContainer />}>
              <Route path={routes.professional.children.patientDetail.children.plans.path} element={<PatientPlansCalendar />} />
              <Route path={routes.professional.children.patientDetail.children.planification.path} element={<PlanificationContainer />} />
              <Route path={routes.professional.children.patientDetail.children.notes.path} element={<NotesContainer />} />
              <Route
                path={routes.professional.children.patientDetail.children.questionary.path}
                element={<PatientQuestionaryContainer />}
              />
              <Route path={routes.professional.children.patientDetail.children.profile.path} element={<PatientProfileContainer />} />
              <Route
                path={routes.professional.children.patientDetail.children.biologicalTerrainAssessment.path}
                element={<BiologicalTerrainAssessmentContainer />}
              />
            </Route>

            <Route path={routes.professional.children.professional.path} element={<PatientConsoleContainer />} />

            <Route path={routes.professional.children.preferences.path} element={<QuestionaryDetailContainer />} />

            <Route path={routes.professional.children.meals.path} element={<NutritionalMealsContainer />} />

            <Route path={routes.professional.children.programs.path} element={<ProgramsContainer />} />

            <Route path={routes.professional.children.programPlans.path} element={<ProgramPlansContainer />} />

            <Route path={routes.professional.children.lab.path} element={<Lab />} />
          </Route>

          <Route path="plant-dosificator" element={<PlantDosificator />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </LocalizationProvider>

      <UnauthorizedDialog />
    </div>
  );
}

export default App;
