import { useContext } from 'react';
import { ConfigContext } from 'src/modules/Lab/contexts/ConfigContext';

// ==============================|| CONFIG - HOOKS ||============================== //

export default function useConfig() {
  return useContext(ConfigContext);
}
