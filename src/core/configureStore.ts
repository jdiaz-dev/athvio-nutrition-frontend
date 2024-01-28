import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/modules/authentication/authentication/adapters/in/UserSlice';
import customRecipeReducers from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeSlice';
import programsReducer from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import patientPlansReducer from 'src/modules/patients/patient-plans/adapters/in/slicers/PatientPlanSlice';
import assignProgramReducer from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';

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
    users: usersReducer,
    customRecipes: customRecipeReducers,
    programs: programsReducer,
    assignProgram: assignProgramReducer,
    patientPlans: patientPlansReducer,
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
