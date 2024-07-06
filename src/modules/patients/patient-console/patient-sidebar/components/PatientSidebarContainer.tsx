import { useState } from 'react';
import PatientSidebar from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebar';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import ChatContainer from 'src/modules/patients/patient-console/chat/adapters/in/components/ChatContainer';
import { ChatContext } from 'src/modules/patients/patient-console/patient-sidebar/context/ChatContext';
import { SelelecteSlideContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SelectedSlideContext';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

const PatientSidebarContainer = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<AvailableSlides | null>(null);

  return (
    <>
      <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
        <SelelecteSlideContext.Provider value={{ selectedSlide, setSelectedSlide }}>
          <ChatContext.Provider value={{ openChat, setOpenChat }}>
            <PatientSidebar />
            <div style={{ width: '150px', color:'white' }}>v: {selectedSlide}</div>
          </ChatContext.Provider>
        </SelelecteSlideContext.Provider>
      </SidebarContext.Provider>
      <ChatContainer />
    </>
  );
};

export default PatientSidebarContainer;
