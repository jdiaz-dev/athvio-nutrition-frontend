import React from 'react';
import { List, ListItemText, useTheme } from '@mui/material';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

function MealNamesList({ meals, handler }: { meals: Meal[]; handler: () => void }) {
  const theme = useTheme();
  return (
    <List onClick={handler}>
      {meals?.map((meal, index1) => (
        <div key={index1} style={{ marginBottom: '20px' }}>
          <ListItemText
            style={{
              padding: 0,
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
            }}
            primary={
              <div>
                <span style={{ fontWeight: 'bold', fontStyle: 'italic', color: theme.palette.primary.dark }}>{meal.mealTag}</span>
                <span style={{ margin: '0 8px' }}>:</span>
                <span>{meal.name}</span>
              </div>
            }
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
          {/* {`${meal.mealTag}  -  ${meal.name}`} */}
          <List style={{ padding: 0 }}>
            {/* doesn't work   overflowWrap: 'break-word' */}
            {meal.ingredientDetails.map((item, index2) => (
              <ListItemText
                key={index2}
                secondary={`${item.ingredient ? item.ingredient.name : item.customIngredient?.name} - ${item.ingredient?.amount} ${
                  item.ingredient?.label
                }`}
                secondaryTypographyProps={{
                  sx: {
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                  },
                }}
              />
            ))}
          </List>
          {meal.image && <img src={meal.image} width={'85%'} height={'110px'} />}
        </div>
      ))}
    </List>
  );
}

export default MealNamesList;
