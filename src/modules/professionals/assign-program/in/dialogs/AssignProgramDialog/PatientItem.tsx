import React, { useContext, useState } from 'react';
import { PatientBody } from 'src/modules/patients/patients/adapters/out/patient.types';
import { Navigate } from 'react-router-dom';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import PatientBasicInfo from 'src/shared/components/PatientList/PatientBasicInfo';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import SelectPatientButton from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/SelectPatientButton';

function PatientItem({ patient }: { patient: PatientBody }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const [goToPatientPlans, setGoToPatientPlans] = useState(false);

  if (currentModuleContext.currentModule === Modules.CLIENTS && goToPatientPlans) {
    const path = `/sidenav/Patients/${patient._id}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <StyledTableRow key={patient._id}>
        <StyledTableCell component="th" scope="row" onClick={() => setGoToPatientPlans(true)}>
          <PatientBasicInfo firstName={patient.user.firstName} lastName={patient.user.lastName} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <SelectPatientButton patient={{ _id: patient._id, firstName: patient.user.firstName, lastName: patient.user.lastName }} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default PatientItem;
