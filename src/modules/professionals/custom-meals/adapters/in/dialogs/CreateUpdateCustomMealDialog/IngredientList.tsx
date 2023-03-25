import React from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types';
import FoodList from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/FoodList';
import Ingredient from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/Ingredient';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function IngredientList() {
  const customMeal = useSelector((state: ReduxStates) => state.customMeal);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={'15%'}>Amount (g) </StyledTableCell>
              <StyledTableCell align="right">Food</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          {customMeal.ingredients.length > 0 && (
            <TableBody>
              {customMeal.ingredients.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  amount={ingredient.amount}
                  ingredientName={ingredient.ingredientName}
                  unit={ingredient.unit}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <FoodList />
    </div>
  );
}

export default IngredientList;
