import React from 'react';
import { List, ListItemText } from '@mui/material';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

function MealNamesList({ meals, handler }: { meals: Meal[]; handler: () => void }) {
  return (
    <List onClick={handler}>
      {meals?.map((meal, index1) => (
        <>
          <ListItemText
            key={index1}
            style={{
              padding: 0,
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
            }}
            primary={`${meal.mealTag}  -  ${meal.name}`}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
          <List style={{ padding: 0 }}>
            {meal.ingredientDetails.map((item, index2) => (
              <ListItemText
                style={{ overflow: 'hidden' }}
                key={index2}
                secondary={item.ingredient ? item.ingredient.name : item.customIngredient?.name}
              />
            ))}
          </List>
        </>
      ))}
    </List>
  );
}

export default MealNamesList;
