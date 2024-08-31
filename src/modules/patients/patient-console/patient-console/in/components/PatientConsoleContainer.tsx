import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { usePatientConsole } from 'src/modules/patients/patient-console/patient-console/out/PatientConsoleActions';
import PatientPlansContainer from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansContainer';
import PatientSidebarContainer from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebarContainer';

function PatientConsoleContainer() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();
  const { getPatientForConsole } = usePatientConsole();

  if (patientId) {
    const professionalPatient = {
      professional: authContext.professional,
      patient: patientId,
    };
    getPatientForConsole({
      patientPlans: professionalPatient,
      chat: professionalPatient,
      patient: professionalPatient,
      professional: {
        professional: authContext.professional,
      },
    });
  }

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative', height: '91vh', overflow: 'hidden' }}>
        <PatientSidebarContainer />
        <PatientPlansContainer />
      </Box>
    </>
  );
}

export default PatientConsoleContainer;
