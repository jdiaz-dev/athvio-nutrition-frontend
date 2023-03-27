import { Box, TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateRecipe } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';

function Recipe() {
  const dispatch = useDispatch();
  return (
    <div>
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
          defaultValue={''}
          onChange={(e) => {
            dispatch(updateRecipe(e.target.value));
          }}
        />
      </Box>
    </div>
  );
}

export default Recipe;
