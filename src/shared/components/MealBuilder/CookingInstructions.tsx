import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';
import { Modules } from 'src/shared/Consts';
import { useTranslation } from 'react-i18next';
import { debounceTime, Subject } from 'rxjs';

function CookingInstructions({ cookingInstructions }: { cookingInstructions: string }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const enableEditionContext = useContext(EnableEditionContext);
  const { t } = useTranslation();
  const instructionSubject$ = useRef(new Subject<string>());

  const { renameCookingInstruction } = useMealBuilderSlicers(currentModuleContext.currentModule);
  const dispatch = useDispatch();
  const isDisabled =
    currentModuleContext.currentModule === Modules.PROGRAMS ||
    currentModuleContext.currentModule === Modules.CLIENT_PLANS ||
    (currentModuleContext.currentModule === Modules.NUTRITIONAL_MEALS && enableEditionContext.enableEdition);

  useEffect(() => {
    const subscription = instructionSubject$.current.pipe(debounceTime(300)).subscribe((value) => {
      dispatch(renameCookingInstruction(value));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
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
        <TextField
          id="outlined-textarea"
          label={t('mealBuilder.titles.cookingInstructions')}
          multiline
          fullWidth
          defaultValue={cookingInstructions}
          onChange={(e) => {
            const newValue = e.target.value;
            instructionSubject$.current.next(newValue);
          }}

          disabled={!isDisabled}
          sx={{
            '& .MuiOutlinedInput-input.Mui-disabled': {
              WebkitTextFillColor: '#b7afaf !important',
              cursor: 'not-allowed',
            },
          }}
        />
      </Box>
    </>
  );
}

export default CookingInstructions;
