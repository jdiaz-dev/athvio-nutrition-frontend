import { createContext } from 'react';

export type EnableEditionData = {
  enableEdition: boolean;
};
export const EnableEditionContext = createContext<EnableEditionData>({ enableEdition: false });
