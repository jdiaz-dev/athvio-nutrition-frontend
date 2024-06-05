import { useContext } from 'react';
import { ConfigContext } from 'src/shared/context/ConfigContext';

// ==============================|| CONFIG - HOOKS ||============================== //

export default function useConfig() {
  return useContext(ConfigContext);
}
