import { configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/modules/security/users/adapters/in/UserSlice';
import customMealsReducer from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import programsReducer from 'src/modules/professionals/programs/adapters/in/ProgramSlice';

export default configureStore({
  reducer: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    users: usersReducer,
    customMeals: customMealsReducer,
    programs: programsReducer,
  },
});
