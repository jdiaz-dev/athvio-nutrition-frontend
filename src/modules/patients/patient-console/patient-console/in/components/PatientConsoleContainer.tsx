import { Box } from '@mui/system';
import React from 'react';
import PatientPlansContainer from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansContainer';
import PatientSidebarContainer from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebarContainer';

function PatientConsoleContainer() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <PatientSidebarContainer />
        <PatientPlansContainer />
      </Box>
      {/* chat */}
    </>
  );
}

export default PatientConsoleContainer;
