import React, { useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';

function CookingInstructions({ cookingInstructions }: { cookingInstructions: string }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const enableEditionContext = useContext(EnableEditionContext);

  const { renameCookingInstruction } = useMealBuilderSlicers(currentModuleContext.currentModule);
  const dispatch = useDispatch();
  const isDisabled = !enableEditionContext.enableEdition;
  return (
    <>
      <Box
        component="form"
        sx={{
          maxWidth: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-textarea"
            label="Directions"
            multiline
            fullWidth
            defaultValue={cookingInstructions}
            onChange={(e) => {
              dispatch(renameCookingInstruction(e.target.value));
            }}
            disabled={isDisabled}
            sx={{
              '& .MuiOutlinedInput-input.Mui-disabled': {
                WebkitTextFillColor: '#b7afaf !important',
                cursor: 'not-allowed',
              },
            }}
          />
        </div>
      </Box>
    </>
  );
}

export default CookingInstructions;
