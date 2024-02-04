/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetUserInfo, SignUpProfessionalModel } from '../out/authentication.types';

const initialState: SignUpProfessionalModel = {
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

//TODO: remove this slicer
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

    setUserInfo: (state, action: PayloadAction<SetUserInfo>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-param-reassign
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.country = action.payload.country;
      state.phone = action.payload.phone;
      // state.professionalInfo.businessName = action.payload.businessName;
      return state;
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
      return state;
    },
    resetUser: (state) => {
      state = initialState;
      state;
      return state;
    },
  },
});

export const { setUserInfo, setCountryCode, resetUser } = usersSlice.actions;
export default usersSlice.reducer;
