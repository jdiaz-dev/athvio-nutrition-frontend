import { Box } from '@mui/system';
import React from 'react';
import { usePatientConsole } from 'src/modules/patients/patient-console/patient-console/out/PatientConsoleActions';
import PatientPlansContainer from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansContainer';
import PatientSidebarContainer from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebarContainer';
import ChatContainer from 'src/modules/patients/patient-console/chat/adapters/in/components/ChatContainer';

function PatientConsoleContainer() {
  const { getPatientForConsole } = usePatientConsole();
  getPatientForConsole({
    patientPlans: {
      professional: '6673734729a8ffa437766dac',
      patient: '66738999b3b27e362bca7ba7',
    },
    chat: {
      professional: '6673734729a8ffa437766dac',
      patient: '66738999b3b27e362bca7ba7',
    },
    patient: {
      professional: '6673734729a8ffa437766dac',
      patient: '66738999b3b27e362bca7ba7',
    },
    professional: {
      professional: '6673734729a8ffa437766dac',
    },
  });
  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative', height: '91vh', overflow: 'hidden' }}>
        <PatientSidebarContainer />
        <PatientPlansContainer />
      </Box>
      <ChatContainer />
    </>
  );
}

export default PatientConsoleContainer;
