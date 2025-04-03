import React, { useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as NutritionalMealBasicInfoSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealBasicInfo';
import { ReduxStates } from 'src/shared/types/types';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';

function NutritionalMealNameInput() {
  const enableEditionContext = useContext(EnableEditionContext);
  const mealNameBasicInfo = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealBasicInfo);
  const dispatch = useDispatch();
  const isDisabled = !enableEditionContext.enableEdition;

  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          marginBottom: '10px',
        }}
      >
        <TextField
          fullWidth
          id="fullWidth"
          label="Meal name"
          autoComplete="off"
          value={mealNameBasicInfo.name}
          onChange={(e) => dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(e.target.value))}
          disabled={isDisabled}
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

export default NutritionalMealNameInput;
