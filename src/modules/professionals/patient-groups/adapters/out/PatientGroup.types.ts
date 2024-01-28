import { PatientGroup } from 'src/shared/types/types';

type PatientGroupBody = {
  professional: string;
  groupName: string;
};

export type CreatePatientGroupRequest = {
  input: PatientGroupBody;
};

export type CreatePatientGroupResponse = {
  createPatientGroup: PatientGroup;
};

export type UpdatePatientGroupsResponse = {
  updatePatientGroup: PatientGroup;
};

export type UpdatePatientGroupsRequest = {
  input: {
    professional: string;
    patientGroup: string;
    groupName: string;
  };
};

export type GetPatientGroupsResponse = {
  getPatientGroups: PatientGroup[];
};

export type GetPatientGroupsRequest = {
  input: {
    professional: string;
  };
};

export type DeletePatientGroupsRequest = {
  input: {
    professional: string;
    patientGroup: string;
  };
};

export type DeletePatientGroupsResponse = {
  getPatientGroups: PatientGroup[];
};
