import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ChatContainer from 'src/modules/patients/patient-console/chat/adapters/in/components/ChatContainer';

import PatientSidebarContainer from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebarContainer';
import { ChatContext } from 'src/modules/patients/patient-console/patient-sidebar/context/ChatContext';
import { SelelectePanelContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SelectedPanelContext';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

function PatientConsoleContainer() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<AvailableSlides>(AvailableSlides.PLANS);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          height: '91vh',
          overflow: 'hidden',
        }}
      >
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
          <ChatContext.Provider value={{ openChat, setOpenChat }}>
            <SelelectePanelContext.Provider value={{ selectedPanel, setSelectedPanel }}>
              <PatientSidebarContainer />
            </SelelectePanelContext.Provider>
            {openChat && <ChatContainer />}
          </ChatContext.Provider>
          <Outlet />
        </SidebarContext.Provider>
      </Box>
    </>
  );
}

export default PatientConsoleContainer;
