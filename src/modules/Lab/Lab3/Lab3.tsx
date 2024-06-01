import { useState } from 'react';
import ClientSidebar from 'src/modules/Lab/Lab3/ClientSidebar';
import ExpandSidebar from 'src/modules/Lab/Lab3/ExpandSidebar';
import { SidebarContext } from 'src/modules/Lab/Lab3/SidebarContext';

const Lab3 = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
        <ClientSidebar />
        <ExpandSidebar />
      </SidebarContext.Provider>
    </>
  );
};

export default Lab3;
