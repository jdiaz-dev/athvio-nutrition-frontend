import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';

export const customRecipeName = createSlice({
  name: 'customRecipes',
  initialState: customRecipeInitialState.customRecipeName,
  reducers: {
    renameRecipeName: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { renameRecipeName } = customRecipeName.actions;
