import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

function MealList({ meals, handler }: { meals: Meal[]; handler: () => void }) {
  return (
    <List onClick={handler}>
      {meals?.map((meal, index1) => (
        <>
          <ListItemText
            key={index1}
            style={{ padding: 0 }}
            primary={meal.mealTag}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          ></ListItemText>
          <List style={{ padding: 0 }}>
            {meal.ingredientDetails.map((item, index2) => (
              <ListItemText key={index2} secondary={item.ingredient?.name} />
            ))}
          </List>
        </>
      ))}
    </List>
  );
}

export default MealList;
