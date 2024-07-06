import { createContext, useState } from 'react';

export const ChatContext = createContext<{
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}>({ openChat: false, setOpenChat: useState });
