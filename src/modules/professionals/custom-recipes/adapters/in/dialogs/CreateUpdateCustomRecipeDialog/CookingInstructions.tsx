import React from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { renameCookingInstruction } from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';

function CookingInstructions({ cookingInstruction }: { cookingInstruction: string }) {
  const dispatch = useDispatch();

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
