import React, { useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';
import { Modules } from 'src/shared/Consts';
import { useTranslation } from 'react-i18next';

function CookingInstructions({ cookingInstructions }: { cookingInstructions: string }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const enableEditionContext = useContext(EnableEditionContext);
  const { t } = useTranslation();

  const { renameCookingInstruction } = useMealBuilderSlicers(currentModuleContext.currentModule);
  const dispatch = useDispatch();
  const isDisabled =
    currentModuleContext.currentModule === Modules.PROGRAMS ||
    currentModuleContext.currentModule === Modules.CLIENT_PLANS ||
    (currentModuleContext.currentModule === Modules.NUTRITIONAL_MEALS && enableEditionContext.enableEdition);

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
            label={t('mealBuilder.titles.cookingInstructions')}
            multiline
            fullWidth
            defaultValue={cookingInstructions}
            onChange={(e) => {
              dispatch(renameCookingInstruction(e.target.value));
            }}
            disabled={!isDisabled}
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
