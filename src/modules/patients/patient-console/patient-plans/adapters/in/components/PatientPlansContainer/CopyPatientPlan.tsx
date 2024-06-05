import React from 'react';
// import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import { useDispatch } from 'react-redux';
import CustomCopyIcon from 'src/shared/components/Icons/CustomCopyIcon';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';

function CopyPatientPlan({ plan }: { plan: string }) {
  const dispatch = useDispatch();

  const copyPatientPlanHandler = () => {
    dispatch(PatientPlanSlice.duplicatingPatientPlan({ _id: plan }));
  };

  return <CustomCopyIcon handler={copyPatientPlanHandler} />;
}

export default CopyPatientPlan;
