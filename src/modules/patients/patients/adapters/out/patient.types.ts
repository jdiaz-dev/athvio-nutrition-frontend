import { Dayjs } from 'dayjs';
import { PatientBody } from 'src/modules/patients/patient-console/patient/adapters/out/patient';
import { PatientStates, ManagePatientGroupEnum } from 'src/shared/Consts';
import { MetadataRecords } from 'src/shared/types/get-records.types';
import { PatientGroup, GraphQLInput, PlanDayInfo } from 'src/shared/types/types';

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
  _id: string;
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
    _id: string;
    groups: {
      _id: string;
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
    _id: string;
    groups: string[];
  };
};

export type PatientPlanDateExtendedProps = {
  patientPlanDayInfo: PlanDayInfo;
  patient: string;
  assignedDate: Date;
};
