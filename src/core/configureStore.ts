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
import DiseasesReducer from 'src/modules/diseases/adapters/in/slicers/DiseasesSlice';

// const {applyMiddleware, combineReducers, createStore} = require('redux');
import thunk from 'redux-thunk';

/* const middleware = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return (process.env.NODE_ENV !== 'production' ? [await import('redux-immutable-state-invariant'), thunk] : [thunk]) as any;
}; */

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
    diseases: DiseasesReducer,
  },
  devTools: true,
  // enhancers

  /* middleware: [
    () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
      return (process.env.NODE_ENV !== 'production' ? [import('redux-immutable-state-invariant'), thunk] : [thunk]) as any;
    },
  ], */
});
