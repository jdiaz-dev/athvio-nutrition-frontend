import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MealBuilderBody } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { defaultMealTagKey } from 'src/shared/Consts';
import { useTranslation } from 'react-i18next';

function MealSelector({
  meals,
  setImportedMeal,
}: {
  meals: (MealBuilderBody & { name?: string })[];
  setImportedMeal: (meal: Meal) => void;
}) {
  const { t } = useTranslation();

  return (
    <Autocomplete
      disablePortal
      options={meals.map((item) => ({
        label: item.name,
        ...item,
      }))}
      onChange={(e, value) => {
        if (value) {
          const { label, name, ...rest } = value;
          setImportedMeal({ ...rest, position: -1, mealTag: t(defaultMealTagKey as any), name: name as string });
        }
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Meals" />}
    />
  );
}
export default MealSelector;
