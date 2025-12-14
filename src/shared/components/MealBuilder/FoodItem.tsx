import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import { Food, FoodManager, Measure } from 'src/shared/components/MealBuilder/food.types';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { FoodDatabases, IngredientType, MeasureSizes, SupportedLanguages } from 'src/shared/Consts';
import { IngredientDetail } from 'src/shared/components/MealBuilder/MealBuilder.types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';
import { useTranslation } from 'react-i18next';
import { getShortLang } from 'src/shared/internationalization/getShortLang';
import FoodMeasureManager from 'src/shared/components/MealBuilder/FoodMeasureManager';

function FoodItem({ food }: { food: Food }) {
  const foddAddedContext = useContext(FoddAddedContext);
  const currentModuleContext = useContext(CurrentModuleContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { addIngredient } = useMealBuilderSlicers(currentModuleContext.currentModule);
  const [foodManager, setFoodManager] = useState<FoodManager | null>(null);
  const [measure, setMeasure] = useState<string | null>(null);
  const language = getShortLang();

  useEffect(() => {
    const prepareFoodManager = () => {
      const defaultMeasure: Measure = food.availableMeasures?.find((measure) =>
        language === SupportedLanguages.ENGLISH
          ? measure.label === MeasureSizes.GRAM_LABEL_ENGLISH
          : measure.spanishLabel === MeasureSizes.GRAM_LABEL_SPANISH,
      ) as Measure;
      const defaultMeasureValue = `${defaultMeasure?.spanishLabel || defaultMeasure?.label} ${defaultMeasure?.weightInGrams || ''}`;
      setMeasure(defaultMeasureValue);
      setFoodManager({
        ...food,
        currentMeasure: {
          amount: food.macros.weightInGrams,
          label: (language === SupportedLanguages.ENGLISH ? MeasureSizes.GRAM_LABEL_ENGLISH : MeasureSizes.GRAM_LABEL_SPANISH) as string,
          weightInGrams: defaultMeasure.weightInGrams,
          uri: defaultMeasure.uri,
        },
      });
    };
    prepareFoodManager();
  }, [food]);

  const chooseIngredient = () => {
    if (foodManager !== null && foodManager.currentMeasure.amount > 0 && foodManager.foodDatabase === FoodDatabases.SYSTEM) {
      const ingredientDetailCustomRecipe: IngredientDetail = {
        ingredientType: IngredientType.UNIQUE_INGREDIENT,
        ingredient: {
          internalFood: foodManager.uuid,
          name: foodManager.name,
          label:
            foodManager.currentMeasure.label === MeasureSizes.GRAM_LABEL_SPANISH ||
            foodManager.currentMeasure.label === MeasureSizes.GRAM_LABEL_ENGLISH
              ? foodManager.currentMeasure.label
              : `${foodManager.currentMeasure.label} (${foodManager.macros.weightInGrams} gr.)`,
          amount: foodManager.currentMeasure.amount.toString(),
          ...foodManager.macros,
        },
        equivalents: [],
      };
      dispatch(addIngredient(ingredientDetailCustomRecipe));
      foddAddedContext.setFoodAdded(true);
    }
  };

  return (
    <>
      {foodManager !== null && (
        <StyledTableRow key={foodManager.name}>
          <StyledTableCell width={'22%'} style={{ padding: '3px', paddingLeft: '7px' }} align="right">
            <FoodMeasureManager measure={measure} foodManager={foodManager} setFoodManager={setFoodManager} setMeasure={setMeasure} />
          </StyledTableCell>
          <StyledTableCell width={'38%'} style={{ padding: '4px' }} component="th" scope="row">
            {foodManager.name}
          </StyledTableCell>
          <StyledTableCell width={'7%'} style={{ padding: '4px' }} component="th" scope="row">
            {parseFloat(foodManager.macros.protein.toString()).toFixed(2)}
          </StyledTableCell>
          <StyledTableCell width={'7%'} style={{ padding: '4px' }} component="th" scope="row">
            {parseFloat(foodManager.macros.carbs.toString()).toFixed(2)}
          </StyledTableCell>
          <StyledTableCell width={'7%'} style={{ padding: '4px' }} component="th" scope="row">
            {parseFloat(foodManager.macros.fat.toString()).toFixed(2)}
          </StyledTableCell>
          <StyledTableCell width={'7%'} style={{ padding: '4px' }} component="th" scope="row">
            {foodManager.macros.calories} cal
          </StyledTableCell>
          <StyledTableCell align="right" width={'5%'} style={{ padding: '0px', paddingRight: '7px' }}>
            <Tooltip title={t('toolTips.add')} placement="right">
              <IconButton onClick={chooseIngredient}>
                <AddIcon style={{ cursor: 'pointer' }} />
              </IconButton>
            </Tooltip>
          </StyledTableCell>
        </StyledTableRow>
      )}
    </>
  );
}

export default FoodItem;
