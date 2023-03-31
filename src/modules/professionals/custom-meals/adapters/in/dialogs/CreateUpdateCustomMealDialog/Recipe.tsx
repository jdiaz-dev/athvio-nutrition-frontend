import { Box, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import { ReduxStates } from 'src/shared/types/types';

function Recipe() {
  const dispatch = useDispatch();
  const recipe = useSelector((state: ReduxStates) => state.customMeals.customMealItem.recipe);

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
          defaultValue={recipe}
          onChange={(e) => {
            dispatch(updateRecipe(e.target.value));
          }}
        />
      </Box>
    </>
  );
}

export default Recipe;
