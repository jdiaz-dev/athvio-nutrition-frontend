import { configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/modules/authentication/authentication/adapters/in/UserSlice';
import nutritionalMealReducers from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealSlice';
import programsReducer from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import assignProgramReducer from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';
import patientPlansReducer from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';
import ChatReducer from 'src/modules/patients/patient-console/chat/adapters/in/slicers/ChatSlice';
import PatientReducer from 'src/modules/patients/patient-console/patient/adapters/in/slicers/PatientSlice';
import ProfessionalReducer from 'src/modules/professionals/professional/adapters/in/slicers/ProfessionalSlice';
import QuestionaryConfigReducer from 'src/modules/professionals/questionary-config/adapters/in/slicers/QuestionaryConfigSlice';
import NutritionBuilderReducer from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';

import thunk from 'redux-thunk';

// Note passing middleware as the last argument to createStore requires redux@>=3.1.0
// const store = createStore(reducer);
export default configureStore({
  reducer: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    users: usersReducer, //todo: change to authentification reducer
    nutritionalMeals: nutritionalMealReducers,
    programs: programsReducer,
    assignProgram: assignProgramReducer,
    patientPlans: patientPlansReducer,
    chat: ChatReducer,
    patient: PatientReducer,
    professional: ProfessionalReducer,
    questionaryConfig: QuestionaryConfigReducer,
    nutritionBuilder: NutritionBuilderReducer,
  },
  devTools: true,
});
