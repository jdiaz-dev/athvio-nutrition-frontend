import { createContext, useState } from 'react';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

export const SelelecteṔanelContext = createContext<{
  selectedPanel: AvailableSlides | null;
  setSelectedPanel: React.Dispatch<React.SetStateAction<AvailableSlides | null>>;
}>({ selectedPanel: null, setSelectedPanel: useState });