import { createContext } from 'react';

export const PlanContext = createContext<{
  isFromRecentlyCreatedPlan: boolean;
}>({ isFromRecentlyCreatedPlan: false });
