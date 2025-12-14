import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FoodManager, Measure, NutrientDetails } from 'src/shared/components/MealBuilder/food.types';
import { SupportedLanguages } from 'src/shared/Consts';
import { BootstrapInput } from 'src/shared/components/CustomizedInput';
import { getShortLang } from 'src/shared/internationalization/getShortLang';
import { useMutation } from '@apollo/client';
import {
  CalculateNutrientsByMeasureRequest,
  CalculateNutrientsByMeasureResponse,
} from 'src/modules/nutrition/internal-foods/types/nutrient';
import { CALCULATE_NUTRIENTS_BY_MEASURE } from 'src/modules/nutrition/internal-foods/adapters/out/InternalFoodQueries';

function FoodMeasureManager({
  measure,
  setMeasure,
  foodManager,
  setFoodManager,
}: {
  measure: string | null;
  setMeasure: React.Dispatch<React.SetStateAction<string | null>>;
  foodManager: FoodManager;
  setFoodManager: React.Dispatch<React.SetStateAction<FoodManager | null>>;
}) {
  const language = getShortLang();
  const [isAmountChanged, setIsAmountChanged] = useState<boolean>(false);

  const [calculateNutrientsByMeasure] = useMutation<CalculateNutrientsByMeasureResponse, CalculateNutrientsByMeasureRequest>(
    CALCULATE_NUTRIENTS_BY_MEASURE,
    {
      fetchPolicy: 'network-only',
    },
  );
  console.log('----------foodManager', foodManager.currentMeasure);
  const calculateNutrientsFetcher = async (choosedMeasureUri?: string, measureInGrams?: number, measureLabel?: string) => {
    const res = await calculateNutrientsByMeasure({
      variables: {
        input: {
          internalFood: foodManager.uuid as string,
          amount: foodManager.currentMeasure.amount,
          uri: choosedMeasureUri ? choosedMeasureUri : foodManager.currentMeasure.uri,
        },
      },
    });

    if (res.data) {
      const { ENERC_KCAL, PROCNT, CHOCDF, FAT } = res.data?.calculateNutrientsByMeasure as NutrientDetails;
      if (foodManager !== null) {
        setFoodManager({
          ...foodManager,
          currentMeasure: {
            ...foodManager.currentMeasure,
            uri: choosedMeasureUri ? choosedMeasureUri : foodManager.currentMeasure.uri,
            ...(measureLabel && { label: measureLabel }),
            ...(measureInGrams && { weightInGrams: measureInGrams }),
          },
          macros: {
            calories: ENERC_KCAL ? ENERC_KCAL.quantity : 0,
            protein: PROCNT ? PROCNT.quantity : 0,
            carbs: CHOCDF ? CHOCDF.quantity : 0,
            fat: FAT ? FAT.quantity : 0,
            weightInGrams: measureInGrams
              ? measureInGrams * foodManager.currentMeasure.amount
              : foodManager.currentMeasure.weightInGrams * foodManager.currentMeasure.amount,
          },
        });
      }
    }
  };

  const handleMeasureChange = async (event: SelectChangeEvent<string>) => {
    setMeasure(event.target.value);
    const measureSplited = event.target.value.split(' ');
    const measureLabel = measureSplited[0];
    const _weightInGrams = parseFloat(measureSplited[1]);

    const choosedMeasure: Measure = foodManager.availableMeasures?.find(
      ({ label, spanishLabel, weightInGrams }) =>
        (measureLabel === label || measureLabel === spanishLabel) && weightInGrams === _weightInGrams,
    ) as Measure;

    calculateNutrientsFetcher(choosedMeasure.uri, _weightInGrams, measureLabel);
  };

  useEffect(() => {
    if (isAmountChanged) {
      calculateNutrientsFetcher();
      setIsAmountChanged(false);
    }
  }, [isAmountChanged]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        inputProps={{ style: { fontSize: 'revert', height: '25px' } }}
        InputLabelProps={{ style: { fontSize: 'revert' } }}
        style={{ width: '35%', marginTop: '8%' }}
        id="standard-number"
        size="small"
        variant="standard"
        type="number"
        value={foodManager.currentMeasure.amount}
        onChange={(e) => {
          setFoodManager({
            ...foodManager,
            currentMeasure: { ...foodManager.currentMeasure, amount: Number(e.target.value) },
          });
          setIsAmountChanged(true);
        }}
      />
      <FormControl size="small" style={{ margin: 0, marginLeft: '5%', width: '60%' }} variant="standard">
        <InputLabel id="measure">Medida</InputLabel>
        <Select
          labelId="measure"
          id="measure-select"
          value={measure !== null ? measure : ''}
          label="measure"
          style={{ width: '75px', marginTop: '17%' }}
          input={<BootstrapInput componentsProps={{ input: { style: { padding: '50px' } } }} />}
          onChange={handleMeasureChange}
        >
          {foodManager.availableMeasures &&
            foodManager.availableMeasures.map((measure, index) => {
              const value = `${measure.spanishLabel} ${measure.weightInGrams}`;
              return (
                <MenuItem key={index} value={value}>
                  {language === SupportedLanguages.SPANISH && measure.spanishLabel !== null ? measure.spanishLabel : measure.label} (
                  {measure.weightInGrams} gr.)
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>{foodManager.macros.weightInGrams} gr.</div>
    </div>
  );
}

export default FoodMeasureManager;
