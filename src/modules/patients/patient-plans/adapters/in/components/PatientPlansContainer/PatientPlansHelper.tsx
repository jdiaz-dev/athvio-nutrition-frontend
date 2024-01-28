/* eslint-disable max-len */
import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import CreatePatientPlanButton from 'src/modules/patients/patient-plans/adapters/in/components/PatientPlansContainer/CreatePatientPlanButton';
import PatientPlanBasicInformation from 'src/modules/patients/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlanBasicInformation';
import { PatientPlanDateExtendedProps } from 'src/modules/patients/patients/adapters/out/patient.types';
import PlanWrapper from 'src/shared/components/wrappers/PlanWrapper';
import WrapperItemButtons from 'src/shared/components/wrappers/WrapperItemButtons';

// it is a function not  a component, therefore doesn't support hooks
function PatientPlansHelper(arg: EventContentArg) {
  const { patient, patientPlanDayInfo, assignedDate } = arg.event.extendedProps as PatientPlanDateExtendedProps;
  if (patientPlanDayInfo._id === null) {
    return (
      <PlanWrapper>
        <WrapperItemButtons>
          <CreatePatientPlanButton patient={patient} assignedDate={assignedDate} />
        </WrapperItemButtons>
      </PlanWrapper>
    );
  } else {
    return (
      <PlanWrapper>
        <PatientPlanBasicInformation patient={patient} plan={patientPlanDayInfo} />;
      </PlanWrapper>
    );
  }
}

export default PatientPlansHelper;
