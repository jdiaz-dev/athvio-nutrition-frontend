import React, { useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import { useChooseSlicers } from 'src/shared/hooks/useChooseSlicers';

function CookingInstructions({ cookingInstruction }: { cookingInstruction: string }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const { renameCookingInstruction } = useChooseSlicers(currentModuleContext.currentModule);
  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{
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
