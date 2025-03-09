import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MealBuilderBody } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

function MealSelector({
  meals,
  setImportedMeal,
}: {
  meals: (MealBuilderBody & { name?: string; mealTag?: string })[];
  setImportedMeal: (meal: Meal) => void;
}) {
  return (
    <Autocomplete
      disablePortal
      options={meals.map((item) => ({
        label: item.name || item.mealTag,
        ...item,
      }))}
      onChange={(e, value) => {
        if (value) {
          const { label, mealTag, name, ...rest } = value;
          setImportedMeal({ ...rest, position: -1, mealTag: mealTag as string, name: name as string });
        }
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Meals" />}
    />
  );
}
export default MealSelector;
