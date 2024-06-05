import { useContext } from 'react';
import { ConfigContext } from 'src/shared/context/ConfigContext';

export default function useConfig() {
  return useContext(ConfigContext);
}
