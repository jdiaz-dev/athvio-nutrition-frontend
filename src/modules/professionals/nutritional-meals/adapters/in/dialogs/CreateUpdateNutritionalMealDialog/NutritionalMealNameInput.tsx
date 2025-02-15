import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as NutritionalMealBasicInfoSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealBasicInfo';
import { defaultNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealInitialState';

function NutritionalMealNameInput({ nutritionalMeal, parentComponentTouched }: { nutritionalMeal: string; parentComponentTouched: boolean }) {
  const dispatch = useDispatch();
  const [_nutritonalMeal, _setNutritonalMeal] = useState(nutritionalMeal);
  const [isInputBlur, setIsInputBlur] = useState(false);

  useEffect(() => {
    if (isInputBlur) {
      if (_nutritonalMeal.length === 0) {
        dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(nutritionalMeal));
      } else {
        dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(_nutritonalMeal));
      }
      setIsInputBlur(false);
    }

    return () => {
      if (!parentComponentTouched && !isInputBlur) {
        dispatch(NutritionalMealBasicInfoSlice.renameNutritionalMeal(defaultNutritionalMeal));
      }
    };
  }, [isInputBlur, nutritionalMeal]);

  const mouseLeaveHandler = () => {
    if (_nutritonalMeal.length === 0) {
      _setNutritonalMeal(nutritionalMeal);
    }
    setIsInputBlur(true);
  };
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
          value={_nutritonalMeal}
          onChange={(e) => _setNutritonalMeal(e.target.value)}
          onMouseLeave={mouseLeaveHandler}
        />
      </Box>
    </>
  );
}

export default NutritionalMealNameInput;
