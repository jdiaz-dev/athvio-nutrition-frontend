import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import PatientBasicInfo from 'src/shared/components/PatientList/PatientBasicInfo';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import SelectPatientButton from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/SelectPatientButton';
import { PatientBody } from 'src/modules/patients/patient-console/patient/adapters/out/patient';

function PatientItem({ patient }: { patient: PatientBody }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const [goToPatientPlans, setGoToPatientPlans] = useState(false);

  if (currentModuleContext.currentModule === Modules.CLIENTS && goToPatientPlans) {
    const path = `/professional/patients/${patient._id}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <StyledTableRow key={patient._id}>
        <StyledTableCell component="th" scope="row" onClick={() => setGoToPatientPlans(true)}>
          <PatientBasicInfo firstname={patient.user.firstname} lastname={patient.user.lastname} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <SelectPatientButton patient={{ _id: patient._id, firstname: patient.user.firstname, lastname: patient.user.lastname }} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default PatientItem;
