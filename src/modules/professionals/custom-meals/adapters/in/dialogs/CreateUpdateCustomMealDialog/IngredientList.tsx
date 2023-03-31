import React, { createContext, useEffect, useMemo, useState } from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';

import { useSelector } from 'react-redux';
import FoodList from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/FoodList';
import Ingredient from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/Ingredient';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import { ReduxStates } from 'src/shared/types/types';

export const FoddAddedContext = createContext<{
  foodAdded: boolean;
  setFoodAdded: React.Dispatch<React.SetStateAction<boolean>>;
}>({ foodAdded: false, setFoodAdded: useState });

function IngredientList() {
  const customMeal = useSelector((state: ReduxStates) => state.customMeals.customMealItem);
  const [foodAdded, setFoodAdded] = useState(false);

  const foddAddedContext = {
    foodAdded,
    setFoodAdded,
  };

  /* useEffect(() => {
    if (foodAdded) {
      setHelper(true);
    }
  }, [foodAdded]); */

  return (
    <>
      <FoddAddedContext.Provider value={{ foodAdded, setFoodAdded }}>
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
            {
              <TableBody>
                {customMeal.ingredients.map((ingredient, index) => (
                  <Ingredient key={index} ingredient={ingredient} />
                ))}
                <StyledTableRow key={customMeal.name}>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                  <StyledTableCell align="right">{customMeal.totalProtein}</StyledTableCell>
                  <StyledTableCell align="right">{customMeal.totalCarbs}</StyledTableCell>
                  <StyledTableCell align="right">{customMeal.totalFat}</StyledTableCell>
                  <StyledTableCell align="right">{customMeal.totalCalories}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            }
          </Table>
        </TableContainer>
        <FoodList />
      </FoddAddedContext.Provider>
    </>
  );
}

export default IngredientList;
