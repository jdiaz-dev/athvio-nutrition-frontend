import React from 'react';
import { Box, TextField } from '@mui/material';
import { updateCustomMealName } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import { useDispatch } from 'react-redux';

function CustomMealName() {
  const dispatch = useDispatch();
  return (
    <div>
      <Box
        sx={{
          maxWidth: '100%',
        }}
      >
        <TextField
          fullWidth
          label="Custom meal name"
          id="fullWidth"
          onChange={(e) => {
            dispatch(updateCustomMealName(e.target.value));
          }}
        />
      </Box>
    </div>
  );
}

export default CustomMealName;
