import React, { useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';

function CookingInstructions({ cookingInstructions }: { cookingInstructions: string }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const { renameCookingInstruction } = useMealBuilderSlicers(currentModuleContext.currentModule);
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
          label="Directions"
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
