import React, { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ClientStateContext } from 'src/modules/clients/clients/adapters/in/components/ClientStateContext';

function ClientStateTab() {
  const clientStateContext = useContext(ClientStateContext);

  const handleChange = (event: React.SyntheticEvent, newState: number) => {
    clientStateContext.setClientIndexState(newState);
  };
  return (
    <div>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
        <Tabs
          value={clientStateContext.indexState}
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

export default ClientStateTab;
