import { createContext } from 'react';
import { Modules } from 'src/shared/Consts';

export const CurrentModuleContext = createContext<{
  currentModule: Modules;
}>({ currentModule: Modules.CUSTOM_RECIPES });
