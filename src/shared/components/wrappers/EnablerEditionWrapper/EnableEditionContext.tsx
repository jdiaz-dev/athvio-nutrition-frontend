import { createContext } from 'react';

export const EnableEditionContext = createContext<{
  enableEdition: boolean;
}>({ enableEdition: false });
