import { configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/modules/security/users/adapters/in/UserSlice';
import customMealReducer from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';

export default configureStore({
  reducer: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    users: usersReducer,
    customMeals: customMealReducer,
  },
});
