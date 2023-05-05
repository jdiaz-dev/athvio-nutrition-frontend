import React, { useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
import { useChooseSlicers } from 'src/shared/hooks/useChooseSlicers';

function CookingInstructions({ cookingInstructions }: { cookingInstructions: string }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const { renameCookingInstruction } = useChooseSlicers(currentModuleContext.currentModule);
  const dispatch = useDispatch();
  console.log('---------meal', currentModuleContext.currentModule);
  console.log('---------cookingInstructions', cookingInstructions);

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
          defaultValue={cookingInstructions}
          onChange={(e) => {
            dispatch(renameCookingInstruction(e.target.value));
          }}
        />
      </Box>
    </>
  );
}

export default CookingInstructions;
