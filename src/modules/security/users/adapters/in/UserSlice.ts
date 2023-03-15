/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  timezone: '',
  acceptedTerms: '',
  professionalInfo: {
    bussinesName: '',
    countryCode: '',
    phone: '',
    country: '',
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSignUp: (state, action: any) => {
      state;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-param-reassign
      state = action.payload;
    },
  },
});

export default usersSlice.reducer;
