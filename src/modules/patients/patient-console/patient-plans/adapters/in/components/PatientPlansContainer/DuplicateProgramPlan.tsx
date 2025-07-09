import React, { useContext } from 'react';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';
import CustomPasteIcon from 'src/shared/components/Icons/CustomPasteIcon';
import { usePatientPlan } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanActions';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function DuplicatePatientPlan({ patient, assignedDate }: { patient: string; assignedDate: string }) {
  const authContext = useContext(AuthContext);
  const patientPlanState = useSelector((state: ReduxStates) => state.patientPlans.patientPlan);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const { duplicatePatientPlan } = usePatientPlan();
  const duplicatePatientPlanHandler = async () => {
    await duplicatePatientPlan({
      professional: authContext.professional,
      patient: patient,
      patientPlan: patientPlanState.uuid,
      assignedDate: assignedDate,
    });
    reloadRecordListContext.setReloadRecordList(true);
  };

  return <CustomPasteIcon handler={duplicatePatientPlanHandler} />;
}

export default DuplicatePatientPlan;
