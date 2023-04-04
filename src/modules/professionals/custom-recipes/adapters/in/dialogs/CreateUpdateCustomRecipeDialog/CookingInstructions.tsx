import { Box, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameCookingInstruction } from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import { ReduxStates } from 'src/shared/types/types';

function CookingInstructions() {
  const dispatch = useDispatch();
  const cookingInstruction = useSelector((state: ReduxStates) => state.customRecipes.customRecipe.cookingInstruction);

  return (
    <>
      <Box
        sx={{
          // width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          fullWidth
          defaultValue={cookingInstruction}
          onChange={(e) => {
            dispatch(renameCookingInstruction(e.target.value));
          }}
        />
      </Box>
    </>
  );
}

export default CookingInstructions;
