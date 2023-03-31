import React, { useContext, useEffect } from 'react';
import { IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import {
  EDAMAN_ANALISIS_APP_KEY,
  EDAMAN_ANALISIS_NUTRITION_DATA,
  EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID,
} from 'src/shared/Consts';
import { AnalisysNutritionDataResponse } from 'src/modules/professionals/custom-meals/adapters/out/Edaman.types';
import { updateIngredient } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
// eslint-disable-next-line max-len
import { FoddAddedContext } from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/IngredientList';

function Ingredient({ ingredient: { ingredientName, amount, unit, ...rest } }: { ingredient: IngredientType }) {
  const dispatch = useDispatch();
  const foddAddedContext = useContext(FoddAddedContext);

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
          console.log('----------EDAMAN called');
          const _ingredient: IngredientType = {
            ingredientName,
            amount,
            unit,
            protein: parseFloat(nutritionData.totalNutrients.PROCNT.quantity.toFixed(2)),
            carbs: parseFloat(nutritionData.totalNutrients.CHOCDF.quantity.toFixed(2)),
            fat: parseFloat(nutritionData.totalNutrients.FAT.quantity.toFixed(2)),
            calories: parseFloat(nutritionData.calories.toFixed(2)),
          };
          dispatch(updateIngredient(_ingredient));
        })
        .catch((error) => console.log('-----error', error));
    };

    if (foddAddedContext.foodAdded) {
      caculateMacros();
      foddAddedContext.setFoodAdded(false);
    }

    return () => {
      foddAddedContext.setFoodAdded(false);
    };
  }, [amount]);

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
