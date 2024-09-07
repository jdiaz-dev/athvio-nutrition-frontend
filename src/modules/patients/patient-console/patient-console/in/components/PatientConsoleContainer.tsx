import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import ChatContainer from 'src/modules/patients/patient-console/chat/adapters/in/components/ChatContainer';
import { usePatientConsole } from 'src/modules/patients/patient-console/patient-console/out/PatientConsoleActions';
import PatientPlansContainer from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansContainer';
import PatientSidebarContainer from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebarContainer';
import { ChatContext } from 'src/modules/patients/patient-console/patient-sidebar/context/ChatContext';
import { SelelecteṔanelContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SelectedPanelContext';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

function PatientConsoleContainer() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();
  const { getPatientForConsole } = usePatientConsole();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<AvailableSlides | null>(null);

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
        <ChatContext.Provider value={{ openChat, setOpenChat }}>
          <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
            <SelelecteṔanelContext.Provider value={{ selectedPanel, setSelectedPanel }}>
              <PatientSidebarContainer />
              <div style={{ width: '150px', color: 'white' }}>v: {selectedPanel}</div>
            </SelelecteṔanelContext.Provider>
          </SidebarContext.Provider>
          {openChat && <ChatContainer />}
        </ChatContext.Provider>

        <PatientPlansContainer />
      </Box>
    </>
  );
}

export default PatientConsoleContainer;
