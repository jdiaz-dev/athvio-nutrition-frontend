import React, { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { PatientStateContext } from 'src/modules/patients/patients/adapters/in/components/PatientStateContext';

function PatientStateTab() {
  const patientStateContext = useContext(PatientStateContext);

  const handleChange = (event: React.SyntheticEvent, newState: number) => {
    patientStateContext.setPatientIndexState(newState);
  };
  return (
    <div>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
        <Tabs
          value={patientStateContext.indexState}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab label="Activated" />
          <Tab label="Archived" />
        </Tabs>
      </Box>
    </div>
  );
}

export default PatientStateTab;
