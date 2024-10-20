import { PatientGroup } from "src/shared/types/types";

export type PatientBody = {
  _id: string;
  user: {
    firstname: string;
    lastname: string;
    email?: string;
    photo?: string;
  };
  groups: PatientGroup[];
  state: string;
};

export type AcceptNewPatient = Pick<PatientBody, '_id' | 'user'>;
export type PatientInitialState = AcceptNewPatient;
