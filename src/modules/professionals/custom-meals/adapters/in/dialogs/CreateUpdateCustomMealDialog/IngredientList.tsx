import React from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';

import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types';
import FoodList from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/FoodList';
import Ingredient from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/Ingredient';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';

function IngredientList() {
  const customMeal = useSelector((state: ReduxStates) => state.customMeals.customMealItem);
  console.log('-----------ingredientList', customMeal.ingredients);
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={'15%'}>Amount (g) </StyledTableCell>
              <StyledTableCell align="right">Food</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Calories&nbsp;(kcal)</StyledTableCell>
            </TableRow>
          </TableHead>
          {customMeal.ingredients.length > 0 && (
            <TableBody>
              {customMeal.ingredients.map((ingredient, index) => (
                <Ingredient key={index} {...ingredient} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <FoodList />
    </>
  );
}

export default IngredientList;
