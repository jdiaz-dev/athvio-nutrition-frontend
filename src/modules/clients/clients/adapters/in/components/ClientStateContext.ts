import { createContext, useState } from 'react';

export const ClientStateContext = createContext<{
  indexState: number;
  setClientIndexState: React.Dispatch<React.SetStateAction<number>>;
}>({ indexState: 0, setClientIndexState: useState });
