import { PatientGroup } from 'src/shared/types/types';

export type PatientBody = {
  uuid: string;
  user: {
    firstname: string;
    lastname: string;
    email?: string;
    photo?: string;
  };
  height: number;
  weight: number;
  birthday: string;
  gender: string;
  groups: PatientGroup[];
  state: string;
};

export type AcceptNewPatient = PatientBody;
export type PatientInitialState = AcceptNewPatient;

export type GetPatientForConsoleRequest = {
  patient: {
    professional: string;
    patient: string;
  };
};

export type GetPatientForConsoleResponse = {
  getPatientForWeb: PatientBody;
};
