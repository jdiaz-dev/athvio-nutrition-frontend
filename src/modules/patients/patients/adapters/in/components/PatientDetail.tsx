import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import PatientBasicInfo from 'src/shared/components/PatientList/PatientBasicInfo';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import ManagePatientGroup from 'src/modules/patients/patients/adapters/in/components/ManagePatientGroup';
import PatientOptions from 'src/modules/patients/patients/adapters/in/components/PatientOptions';
import { PatientBody } from 'src/modules/patients/patients/adapters/out/patient.types';
import ResendPatientInvitationEmail from 'src/modules/patients/patients/adapters/in/components/ResendPatientInvitationEmail';
import { Chip } from '@mui/material';

enum PatientStates {
  ACTIVE = 'active',
  INVITATION_PENDING = 'invitation_pending',
  ARCHIVED = 'archived',
}
function PatientDetail({ patient }: { patient: PatientBody }) {
  const [goToPatientPlans, setGoToPatientPlans] = useState(false);
  if (goToPatientPlans) {
    const path = `/professional/patients/${patient.uuid}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <StyledTableRow key={patient.uuid}>
        <StyledTableCell component="th" scope="row" onClick={() => setGoToPatientPlans(true)}>
          <PatientBasicInfo firstname={patient.user.firstname} lastname={patient.user.lastname} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" style={{ cursor: 'pointer' }}>
          {patient.state === PatientStates.ACTIVE ? (
            <Chip
              label="Activo"
              // onClick={handleChipClick}
              // deleteIcon={<KeyboardArrowDownIcon fontSize="small" />}
              // onDelete={handleChipClick}
              sx={{
                'backgroundColor': '#1DA65D',
                'color': 'white',
                'fontWeight': 500,
                'fontSize': '0.75rem',
                'cursor': 'pointer',
                '& .MuiChip-deleteIcon': {
                  color: 'warning.dark',
                  transition: 'transform 0.15s',
                  // transform: open ? 'rotate(180deg)' : 'none',
                },
              }}
            />
          ) : (
            <ResendPatientInvitationEmail patient={patient} />
          )}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <ManagePatientGroup patient={patient.uuid} assignedGroups={patient.groups || []} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <PatientOptions patient={patient.uuid} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default PatientDetail;
