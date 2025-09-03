import { configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/modules/authentication/authentication/adapters/in/UserSlice';
import nutritionalMealReducers from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealSlice';
import programsReducer from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import assignProgramReducer from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';
import planificationsReducer from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';
import patientPlansReducer from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';
import notesSlice from 'src/modules/patients/patient-console/notes/adapters/in/slicers/NotesSlice';
import ChatReducer from 'src/modules/patients/patient-console/chat/adapters/in/slicers/ChatSlice';
import PatientReducer from 'src/modules/patients/patients/adapters/in/slicers/PatientSlice';
import ProfessionalReducer from 'src/modules/professionals/professional/adapters/in/slicers/ProfessionalSlice';
import ProfessionalQuestionaryReducer from 'src/modules/professionals/professional-questionaries/adapters/in/slicers/ProfessionalQuestionarySlice';
import PatientQuestionaryReducer from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';
import FoodAnalyzerReducer from 'src/modules/food-analyzers/adapters/in/slicers/FoodAnalyzerSlice';
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
    patient: PatientReducer,
    planifications: planificationsReducer,
    patientPlans: patientPlansReducer,
    chat: ChatReducer,
    notes: notesSlice,
    professional: ProfessionalReducer,
    professionalQuestionary: ProfessionalQuestionaryReducer,
    patientQuestionary: PatientQuestionaryReducer,
    foodAnalyzers: FoodAnalyzerReducer,
    nutritionBuilder: NutritionBuilderReducer,
  },
  devTools: true,
});
