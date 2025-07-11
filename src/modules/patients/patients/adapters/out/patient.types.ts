import { Dayjs } from 'dayjs';
import { PatientStates, ManagePatientGroupEnum } from 'src/shared/Consts';
import { MetadataRecords } from 'src/shared/types/get-records.types';
import { GraphQLInput, PatientGroup, PlanDayInfo } from 'src/shared/types/types';

export type PatientBody = {
  uuid: string;
  user: {
    uuid: string;
    firstname: string;
    lastname: string;
    email?: string;
    photo?: string;
    countryCode?: string;
    phone?: string;
  };
  height?: number;
  weight?: number;
  birthday?: string;
  gender?: string;
  groups?: PatientGroup[];
  state?: string;
};

export type AcceptNewPatient = PatientBody;
export type PatientInitialState = AcceptNewPatient;

export interface GraphQLPatientInput extends GraphQLInput {
  state: PatientStates;
}
export type UserInfoForPatient = {
  firstname: string;
  lastname: string;
  email: string;
};

export type AdditionalInfo = {
  location?: string;
  timezone?: string;
  height?: number | null;
  weight?: number | null;
  birthday?: Dayjs | null | string;
  gender?: string;
  photo?: string;
  countryCode?: string;
  country?: string;
  phone?: string;
};
export type PatientData = UserInfoForPatient & AdditionalInfo;

export type BodyPatient = {
  professional: string;
  userInfo: UserInfoForPatient;
  additionalInfo: AdditionalInfo;
};
export interface SignUpPatientRequest {
  input: BodyPatient;
}

export type PatientBodyResponse = {
  uuid: string;
  userInfo: UserInfoForPatient;
};

export type SignUpPatientResponse = {
  signUpPatient: PatientBodyResponse;
};

export type GetPatientsRequest = {
  input: {
    professional: string;
    offset: number;
    limit: number;
    state: string;
    search?: string[];
  };
};

export type GetPatientResponse = {
  getPatients: {
    data: PatientBody[];
    meta: MetadataRecords;
  };
};

export type UpdatePatientForWebInput = {
  professional: string;
  patient: string;
  height: number;
  weight: number;
  birthday: string;
  gender: string;
};
export type UpdatePatientForWebRequest = {
  patient: UpdatePatientForWebInput;
};
export type UpdatePatientForWebResponse = {
  updatePatientForWeb: {
    uuid: string;
    height: number;
    weight: number;
    birthday: string;
    gender: string;
  };
};

export type GetPatientForConsoleRequest = {
  patient: {
    professional: string;
    patient: string;
  };
};

export type GetPatientForConsoleResponse = {
  getPatientForWeb: PatientBody;
};

export type ManagePatientGroupRequest = {
  input: {
    professional: string;
    patient: string;
    patientGroup: string;
    action: ManagePatientGroupEnum;
  };
};

export type ManagePatientGroupResponse = {
  input: {
    uuid: string;
    groups: {
      uuid: string;
      groupName: string;
    }[];
  };
};

export type ManagePatientStateRequest = {
  input: {
    professional: string;
    patient: string;
    state: PatientStates;
  };
};

export type ManagePatientStateResponse = {
  managePatientState: {
    uuid: string;
    groups: string[];
  };
};

export type PatientPlanDateExtendedProps = {
  patientPlanDayInfo: PlanDayInfo;
  patient: string;
  assignedDate: string;
};
