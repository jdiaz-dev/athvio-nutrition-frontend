import { createContext, useState } from 'react';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

export const SelelectePanelContext = createContext<{
  selectedPanel: AvailableSlides | null;
  setSelectedPanel: React.Dispatch<React.SetStateAction<AvailableSlides>>;
}>({ selectedPanel: AvailableSlides.PLANS, setSelectedPanel: useState });
