import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import PatientBasicInfo from 'src/shared/components/PatientList/PatientBasicInfo';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import ManagePatientGroup from 'src/modules/patients/patients/adapters/in/components/ManagePatientGroup';
import PatientOptions from 'src/modules/patients/patients/adapters/in/components/PatientOptions';
import { PatientBody } from 'src/modules/patients/patient-console/patient/adapters/out/patient';

function PatientDetail({ patient }: { patient: PatientBody }) {
  const [goToPatientPlans, setGoToPatientPlans] = useState(false);
  if (goToPatientPlans) {
    const path = `/coach/patients/${patient._id}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <StyledTableRow key={patient._id}>
        <StyledTableCell component="th" scope="row" onClick={() => setGoToPatientPlans(true)}>
          <PatientBasicInfo firstname={patient.user.firstname} lastname={patient.user.lastname} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {patient.state}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <ManagePatientGroup patient={patient._id} assignedGroups={patient.groups} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <PatientOptions patient={patient._id} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default PatientDetail;
