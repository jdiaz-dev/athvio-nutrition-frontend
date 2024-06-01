import { createContext, useState } from 'react';

export const SidebarContext = createContext<{
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>({ openSidebar: false, setOpenSidebar: useState });
