import { temporalId } from 'src/shared/Consts';

export const generateTemporalId = () => {
  const improvisedRamdonNumber = Math.random() * 1000 * Math.random() * 1000;
  return temporalId + improvisedRamdonNumber;
};
