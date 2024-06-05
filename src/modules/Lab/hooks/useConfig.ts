import { useContext } from 'react';
import { ConfigContext } from '../../../shared/context/ConfigContext';

// ==============================|| CONFIG - HOOKS ||============================== //

const useConfig = () => useContext(ConfigContext);

export default useConfig;
