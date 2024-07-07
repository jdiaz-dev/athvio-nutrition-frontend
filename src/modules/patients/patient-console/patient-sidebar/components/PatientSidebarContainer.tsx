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
      <ChatContext.Provider value={{ openChat, setOpenChat }}>
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
          <SelelecteSlideContext.Provider value={{ selectedSlide, setSelectedSlide }}>
            <PatientSidebar />
            <div style={{ width: '150px', color: 'white' }}>v: {selectedSlide}</div>
          </SelelecteSlideContext.Provider>
        </SidebarContext.Provider>
        {openChat && <ChatContainer />}
      </ChatContext.Provider>
    </>
  );
};

export default PatientSidebarContainer;
