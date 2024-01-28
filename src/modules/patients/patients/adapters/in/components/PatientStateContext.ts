import { createContext, useState } from 'react';

export const PatientStateContext = createContext<{
  indexState: number;
  setPatientIndexState: React.Dispatch<React.SetStateAction<number>>;
}>({ indexState: 0, setPatientIndexState: useState });
