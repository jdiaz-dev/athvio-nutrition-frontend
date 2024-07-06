import { createContext, useState } from 'react';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

export const SelelecteSlideContext = createContext<{
  selectedSlide: AvailableSlides | null;
  setSelectedSlide: React.Dispatch<React.SetStateAction<AvailableSlides | null>>;
}>({ selectedSlide: null, setSelectedSlide: useState });
