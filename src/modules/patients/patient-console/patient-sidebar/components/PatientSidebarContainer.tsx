import { useState } from 'react';
import PatientSidebar from 'src/modules/patients/patient-console/patient-sidebar/components/PatientSidebar';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';

const PatientSidebarContainer = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
        <PatientSidebar />
      </SidebarContext.Provider>
    </>
  );
};

export default PatientSidebarContainer;
