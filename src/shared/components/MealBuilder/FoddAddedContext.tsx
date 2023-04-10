import { createContext, useState } from 'react';

export const FoddAddedContext = createContext<{
  foodAdded: boolean;
  setFoodAdded: React.Dispatch<React.SetStateAction<boolean>>;
}>({ foodAdded: false, setFoodAdded: useState });
