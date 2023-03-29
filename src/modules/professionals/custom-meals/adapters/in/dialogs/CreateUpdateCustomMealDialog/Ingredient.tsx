import React, { useContext, useEffect, useState } from 'react';
import { IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import {
  EDAMAN_ANALISIS_APP_KEY,
  EDAMAN_ANALISIS_NUTRITION_DATA,
  EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID,
} from 'src/shared/Consts';
import { AnalisysNutritionDataResponse } from 'src/modules/professionals/custom-meals/adapters/out/Edaman.types';
import {
  resetCustomMealItem,
  updateIngredient,
} from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import { useDispatch } from 'react-redux';
import { FoddAddedContext } from 'src/App';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';

function Ingredient({ ingredientName, amount, unit, ...rest }: IngredientType) {
  const dispatch = useDispatch();
  const foddAddedContext = useContext(FoddAddedContext);

  const [macrosCalculated, setMacrosCalculated] = useState(false);

  useEffect(() => {
    const caculateMacros = () => {
      fetch(
        // eslint-disable-next-line max-len
        `${EDAMAN_ANALISIS_NUTRITION_DATA}?app_id=${EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID}&app_key=${EDAMAN_ANALISIS_APP_KEY}&nutrition-type=cooking&ingr=${amount}g ${ingredientName}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((nutritionData: AnalisysNutritionDataResponse) => {
          console.log('-------------nutritionData', nutritionData);
          const _ingredient: IngredientType = {
            ingredientName,
            amount,
            unit,
            protein: parseFloat(nutritionData.totalNutrients.PROCNT.quantity.toFixed(1)),
            carbs: parseFloat(nutritionData.totalNutrients.CHOCDF.quantity.toFixed(1)),
            fat: parseFloat(nutritionData.totalNutrients.FAT.quantity.toFixed(1)),
            calories: parseFloat(nutritionData.calories.toFixed(1)),
          };
          dispatch(updateIngredient(_ingredient));
        })
        .catch((error) => console.log('-----error', error));
    };

    if (!macrosCalculated && !rest.calories && !rest.carbs && !rest.fat && !rest.protein) {
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
      <StyledTableRow key={ingredientName}>
        <StyledTableCell align="right">{amount}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {ingredientName}
        </StyledTableCell>
        <StyledTableCell align="right">{rest.protein}</StyledTableCell>
        <StyledTableCell align="right">{rest.carbs}</StyledTableCell>
        <StyledTableCell align="right">{rest.fat}</StyledTableCell>
        <StyledTableCell align="right">{rest.calories}</StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default Ingredient;
