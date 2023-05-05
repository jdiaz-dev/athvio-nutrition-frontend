import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';

export const customRecipeName = createSlice({
  name: 'customRecipeBasicInfo',
  initialState: customRecipeInitialState.customRecipeBasicInfo,
  reducers: {
    renameRecipeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      return state;
    },
  },
});

export const { renameRecipeName } = customRecipeName.actions;
