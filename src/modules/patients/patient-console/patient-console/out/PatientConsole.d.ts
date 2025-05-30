import { ChatBody } from 'src/modules/patients/patient-console/chat/adapters/out/chat';
import { PatientPlanBody } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { PatientBody } from 'src/modules/patients/patient-console/patient/adapters/out/patient';
import { ProfessionalBody } from 'src/modules/professionals/professional/adapters/out/professional';

export type GetPatientForConsoleRequest = {
  patientPlans: {
    patient: string;
    startDate: string;
    endDate: string;
  };
  chat: {
    professional: string;
    patient: string;
  };
  patient: {
    professional: string;
    patient: string;
  };
  professional: {
    professional: string;
  };
};

export type GetPatientForConsoleResponse = {
  getPatientPlansForWeb: PatientPlanBody[];
  getChat: ChatBody;
  getPatientForWeb: PatientBody;
  getProfessional: ProfessionalBody;
};
