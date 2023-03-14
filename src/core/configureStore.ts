import { configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/modules/security/users/adapters/in/UserSlice';

export default configureStore({
  reducer: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    users: usersReducer,
  },
});
