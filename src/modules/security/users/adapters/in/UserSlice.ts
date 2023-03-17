/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetUserInfo } from 'src/modules/security/users/adapters/out/user.types';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  countryCode: '',
  country: '',
  phone: '',
  acceptedTerms: false,
  professionalInfo: {
    businessName: '',
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserInfo: (state, action: PayloadAction<SetUserInfo>) => {
      console.log('-----action', action);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-param-reassign
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.country = action.payload.country;
      state.phone = action.payload.phone;
      state.professionalInfo.businessName = action.payload.businessName;
      console.log('-----state', state);
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    resetUser: (state) => {
      state = initialState;
      state;
      console.log('----state after', state);
    },
  },
});

export const { setUserInfo, setCountryCode, resetUser } = usersSlice.actions;
export default usersSlice.reducer;
