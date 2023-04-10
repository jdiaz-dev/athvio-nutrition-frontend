import React, { useContext, useEffect } from 'react';
import { IngredientType } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { EDAMAN_ANALISIS_APP_KEY, EDAMAN_ANALISIS_NUTRITION_DATA, EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID } from 'src/shared/Consts';
import { AnalisysNutritionDataResponse } from 'src/modules/professionals/custom-recipes/adapters/out/Edaman.types';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { useChooseSlicers } from 'src/shared/hooks/useChooseSlicers';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';

function Ingredient({ ingredient: { name, amount, unit, ...rest } }: { ingredient: IngredientType }) {
  const dispatch = useDispatch();
  const foddAddedContext = useContext(FoddAddedContext);
  const currentModuleContext = useContext(CurrentModuleContext);

  const { addMacrosToIngredient } = useChooseSlicers(currentModuleContext.currentModule);

  useEffect(() => {
    const caculateMacros = () => {
      fetch(
        // eslint-disable-next-line max-len
        `${EDAMAN_ANALISIS_NUTRITION_DATA}?app_id=${EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID}&app_key=${EDAMAN_ANALISIS_APP_KEY}&nutrition-type=cooking&ingr=${amount}g ${name}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((nutritionData: AnalisysNutritionDataResponse) => {
          console.log('----------EDAMAN called');
          const _ingredient: IngredientType = {
            name,
            amount,
            unit,
            protein: parseFloat(nutritionData.totalNutrients.PROCNT.quantity.toFixed(2)),
            carbs: parseFloat(nutritionData.totalNutrients.CHOCDF.quantity.toFixed(2)),
            fat: parseFloat(nutritionData.totalNutrients.FAT.quantity.toFixed(2)),
            calories: parseFloat(nutritionData.calories.toFixed(2)),
          };
          dispatch(addMacrosToIngredient(_ingredient));
        })
        .catch((error) => console.log('-----error', error));
    };

    if (foddAddedContext.foodAdded) {
      console.log('---------->>>>>>>>>>', foddAddedContext.foodAdded);
      caculateMacros();
      foddAddedContext.setFoodAdded(false);
    }

    /* return () => {
      foddAddedContext.setFoodAdded(false);
    }; */
  }, [amount]);

  return (
    <>
      <StyledTableRow key={name}>
        <StyledTableCell align="right">{amount}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {name}
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
