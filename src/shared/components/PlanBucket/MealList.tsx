import React from 'react';
import { ListItem } from '@mui/material';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

function MealList({ meals, handler }: { meals: Meal[]; handler: () => void }) {
  return (
    <ul style={{ width: '100%' }} onClick={handler}>
      {meals?.map((meal, index) => (
        <ListItem key={index}>{meal.name}</ListItem>
      ))}
    </ul>
  );
}

export default MealList;
