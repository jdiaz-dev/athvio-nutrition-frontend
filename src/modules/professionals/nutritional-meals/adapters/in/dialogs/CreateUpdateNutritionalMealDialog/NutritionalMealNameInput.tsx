import React from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as NutritionalMealBasicInfoSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealBasicInfo';
import { ReduxStates } from 'src/shared/types/types';

function NutritionalMealNameInput() {
  const mealNameBasicInfo = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMealBasicInfo);
  const dispatch = useDispatch();

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
        />
      </Box>
    </>
  );
}

export default NutritionalMealNameInput;
