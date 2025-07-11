import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { patientIntialState } from 'src/modules/patients/patient-console/profile/in/slicers/PatientInitialState';
import { AcceptNewPatient } from 'src/modules/patients/patients/adapters/out/patient.types';

const patientSlice = createSlice({
  name: 'patient',
  initialState: patientIntialState,
  reducers: {
    acceptNewPatient: (state, action: PayloadAction<AcceptNewPatient>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { acceptNewPatient } = patientSlice.actions;

export default patientSlice.reducer;
