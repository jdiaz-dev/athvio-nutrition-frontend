import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import { Food, FoodManager } from 'src/shared/components/MealBuilder/food.types';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { FoodDatabases, IngredientType, MeasureSizes, SupportedLanguages } from 'src/shared/Consts';
import { BootstrapInput } from 'src/shared/components/CustomizedInput';
import { calculateMacrosFixingDecimals, multiplicateFixingDecimals } from 'src/shared/components/MealBuilder/MacrosCalculator';
import { IngredientDetail } from 'src/shared/components/MealBuilder/MealBuilder.types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';
import { useTranslation } from 'react-i18next';

function FoodItem({ food }: { food: Food }) {
  const foddAddedContext = useContext(FoddAddedContext);
  const currentModuleContext = useContext(CurrentModuleContext);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { addIngredient } = useMealBuilderSlicers(currentModuleContext.currentModule);
  const [foodManager, setFoodManager] = useState<FoodManager | null>(null);
  const [measure, setMeasure] = useState<string | null>(null);

  useEffect(() => {
    const defaultMeasure = food.availableMeasures?.find((measure) =>
      i18n.language === SupportedLanguages.ENGLISH
        ? measure.label === MeasureSizes.GRAM_LABEL_ENGLISH
        : measure.label === MeasureSizes.GRAM_LABEL_SPANISH,
    );
    const defaultMeasureValue = `${defaultMeasure?.label || ''} ${defaultMeasure?.weightInGrams || ''}`;
    setMeasure(defaultMeasureValue);
    setFoodManager({
      ...food,
      measure: {
        amount: food.macros.weightInGrams,
        label: (i18n.language === SupportedLanguages.ENGLISH ? MeasureSizes.GRAM_LABEL_ENGLISH : MeasureSizes.GRAM_LABEL_SPANISH) as string,
        weightInGrams: food.macros.weightInGrams,
      },
    });
  }, [food]);

  useEffect(() => {
    const measureSplited: string[] = measure !== null ? measure.split(' ') : [];
    const measureLabel = measureSplited[0];

    if (measureLabel && foodManager !== null) {
      const amountInGrams = parseFloat(measureSplited[1]);
      const foodTotalAmount = multiplicateFixingDecimals(amountInGrams, foodManager.measure.amount);
      setFoodManager({
        ...foodManager,
        macros: {
          protein: calculateMacrosFixingDecimals(foodTotalAmount, food.macros.weightInGrams, food.macros.protein),
          carbs: calculateMacrosFixingDecimals(foodTotalAmount, food.macros.weightInGrams, food.macros.carbs),
          fat: calculateMacrosFixingDecimals(foodTotalAmount, food.macros.weightInGrams, food.macros.fat),
          calories: calculateMacrosFixingDecimals(foodTotalAmount, food.macros.weightInGrams, food.macros.calories),
          weightInGrams: foodManager.measure.amount,
        },
        measure: {
          amount: foodManager.measure.amount,
          label: measureLabel,
          weightInGrams: measureLabel === MeasureSizes.GRAM_LABEL_ENGLISH ? foodManager.measure.amount : foodTotalAmount,
        },
      });
    }
  }, [measure, foodManager?.measure.amount]);

  const handleMeasureChange = (event: SelectChangeEvent<string>) => {
    const measureSplited = event.target.value.split(' ');
    const measureLabel = measureSplited[0];

    if (foodManager !== null) {
      setMeasure(event.target.value);
      setFoodManager({
        ...foodManager,
        measure: {
          ...foodManager.measure,
          amount:
            measureLabel === MeasureSizes.GRAM_LABEL_ENGLISH
              ? (MeasureSizes.GRAM_AMOUNT as number)
              : (MeasureSizes.NORMAL_AMOUNT as number),
        },
      });
    }
  };

  const chooseIngredient = () => {
    let ingredientDetailCustomRecipe: IngredientDetail;
    if (foodManager !== null && foodManager.measure.amount > 0 && foodManager.foodDatabase === FoodDatabases.SYSTEM) {
      ingredientDetailCustomRecipe = {
        ingredientType: IngredientType.UNIQUE_INGREDIENT,
        ingredient: {
          name: foodManager.name,
          label: foodManager.measure.label,
          amount: foodManager.measure.amount.toString(),
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                inputProps={{ style: { fontSize: 'revert', height: '25px' } }}
                InputLabelProps={{ style: { fontSize: 'revert' } }}
                style={{ width: '35%', marginTop: '8%' }}
                id="standard-number"
                size="small"
                variant="standard"
                type="number"
                value={foodManager.measure.amount}
                onChange={(e) => {
                  setFoodManager({
                    ...foodManager,
                    measure: { ...foodManager.measure, amount: Number(e.target.value) },
                  });
                }}
              />
              <FormControl size="small" style={{ margin: 0, marginLeft: '5%', width: '60%' }} variant="standard">
                <InputLabel id="demo-customized-select-label">Measure</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={measure !== null ? measure : ''}
                  label="measure"
                  style={{ width: '75px', marginTop: '17%' }}
                  input={<BootstrapInput componentsProps={{ input: { style: { padding: '50px' } } }} />}
                  onChange={handleMeasureChange}
                >
                  {foodManager.availableMeasures &&
                    foodManager.availableMeasures.map((measure, index) => {
                      const value = `${measure.label} ${measure.weightInGrams}`;
                      return (
                        <MenuItem key={index} value={value}>
                          {measure.label === MeasureSizes.GRAM_LABEL_ENGLISH
                            ? measure.label
                            : `${measure.label} (${measure.weightInGrams}g)`}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <div style={{ display: 'flex', alignItems: 'center', width: '20%' }}>{foodManager.measure.weightInGrams}g</div>
            </div>
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
