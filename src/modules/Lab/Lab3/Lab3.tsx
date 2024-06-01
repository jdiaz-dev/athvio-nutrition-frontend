import { useState } from 'react';
import PatientSidebar from 'src/modules/Lab/Lab3/PatientSidebar';
import { SidebarContext } from 'src/modules/Lab/Lab3/SidebarContext';

const Lab3 = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
        <PatientSidebar />
      </SidebarContext.Provider>
    </>
  );
};

export default Lab3;
