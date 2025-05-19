import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import CaloriesContainer from 'src/modules/patients/patient-console/calories/adapters/in/CaloriesContainer';
import ChatContainer from 'src/modules/patients/patient-console/chat/adapters/in/components/ChatContainer';
import NotesContainer from 'src/modules/patients/patient-console/notes/adapters/in/components/NotesContainer';
import { usePatientConsole } from 'src/modules/patients/patient-console/patient-console/out/PatientConsoleActions';
import { DateSet } from 'src/modules/patients/patient-console/patient-plans/adapters/helpers/PatientPlans';
import PatientPlansCalendar from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansCalendar';
import PatientSidebarContainer from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebarContainer';
import { ChatContext } from 'src/modules/patients/patient-console/patient-sidebar/context/ChatContext';
import { SelelectePanelContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SelectedPanelContext';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

function PatientConsoleContainer() {
  const authContext = useContext(AuthContext);
  const { patientId } = useParams();
  const { getPatientForConsole } = usePatientConsole();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<AvailableSlides>(AvailableSlides.PLANS);
  const [dateSet, setDateSet] = useState<DateSet | null>(null);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (patientId && dateSet != null && firstLoad) {
      const professionalPatient = {
        professional: authContext.professional,
        patient: patientId,
      };
      getPatientForConsole({
        patientPlans: { patient: patientId, startDate: dateSet.dateStart.toISOString(), endDate: dateSet.dateEnd.toISOString() },
        chat: professionalPatient,
        patient: professionalPatient,
        professional: {
          professional: authContext.professional,
        },
      });
      setFirstLoad(false);
    }
  }, [patientId, dateSet]);

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

          {selectedPanel === AvailableSlides.PLANS && <PatientPlansCalendar dateSet={dateSet} setDateSet={setDateSet} />}
          {selectedPanel === AvailableSlides.CALORIES && <CaloriesContainer />}
          {selectedPanel === AvailableSlides.CLINICAL_NOTES && <NotesContainer />}
        </SidebarContext.Provider>
      </Box>
    </>
  );
}

export default PatientConsoleContainer;
