import { createContext, useState } from 'react';

export const defaultPlanDay = 0;
export const PlanDialogContext = createContext<{
  planDay: number;
  setPlanDay: React.Dispatch<React.SetStateAction<number>>;
}>({ planDay: defaultPlanDay, setPlanDay: useState });
