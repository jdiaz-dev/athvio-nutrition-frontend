import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import PatientBasicInfo from 'src/shared/components/PatientList/PatientBasicInfo';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import SelectPatientButton from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/SelectPatientButton';
import { PatientBody } from 'src/modules/patients/patients/adapters/out/patient.types';

function PatientItem({ patient }: { patient: PatientBody }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const [goToPatientPlans, setGoToPatientPlans] = useState(false);

  if (currentModuleContext.currentModule === Modules.CLIENTS && goToPatientPlans) {
    const path = `/professional/patients/${patient.uuid}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <StyledTableRow key={patient.uuid}>
        <StyledTableCell component="th" scope="row" onClick={() => setGoToPatientPlans(true)}>
          <PatientBasicInfo firstname={patient.user.firstname} lastname={patient.user.lastname} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <SelectPatientButton patient={{ uuid: patient.uuid, firstname: patient.user.firstname, lastname: patient.user.lastname }} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default PatientItem;
