import React, { useContext, useEffect, useState } from 'react';
import { TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import {
  EDAMAN_ANALISIS_APP_KEY,
  EDAMAN_ANALISIS_NUTRITION_DATA,
  EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID,
} from 'src/shared/Consts';
import { AnalisysNutritionDataResponse } from 'src/modules/professionals/custom-meals/adapters/out/Edaman.types';
import { updateIngredient } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import { useDispatch } from 'react-redux';
import { FoddAddedContext } from 'src/App';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Ingredient(ingredient: IngredientType) {
  const dispatch = useDispatch();
  const foddAddedContext = useContext(FoddAddedContext);

  const [macrosCalculated, setMacrosCalculated] = useState(false);
  useEffect(() => {
    const caculateMacros = () => {
      fetch(
        // eslint-disable-next-line max-len
        `${EDAMAN_ANALISIS_NUTRITION_DATA}?app_id=${EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID}&app_key=${EDAMAN_ANALISIS_APP_KEY}&nutrition-type=cooking&ingr=${ingredient.amount}g ${ingredient.ingredientName}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((nutritionData: AnalisysNutritionDataResponse) => {
          console.log('-------------nutritionData', nutritionData);
          const _ingredient: IngredientType = {
            ...ingredient,
            protein: parseFloat(nutritionData.totalNutrients.PROCNT.quantity.toFixed(1)),
            carbs: parseFloat(nutritionData.totalNutrients.CHOCDF.quantity.toFixed(1)),
            fat: parseFloat(nutritionData.totalNutrients.FAT.quantity.toFixed(1)),
            calories: parseFloat(nutritionData.calories.toFixed(1)),
          };
          dispatch(updateIngredient(_ingredient));
        })
        .catch((error) => console.log('-----error', error));
    };

    if (!macrosCalculated) {
      caculateMacros();
      setMacrosCalculated(true);
    }
    if (foddAddedContext.foodAdded) {
      caculateMacros();
      foddAddedContext.setFoodAdded(false);
    }
  }, [macrosCalculated, foddAddedContext.foodAdded]);

  return (
    <>
      <StyledTableRow key={ingredient.ingredientName}>
        <StyledTableCell align="right">{ingredient.amount}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {ingredient.ingredientName}
        </StyledTableCell>
        <StyledTableCell align="right">{ingredient.protein}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.carbs}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.fat}</StyledTableCell>
        <StyledTableCell align="right">{ingredient.calories}</StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default Ingredient;
