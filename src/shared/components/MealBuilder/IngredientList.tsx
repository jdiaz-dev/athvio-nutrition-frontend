import React, { useState } from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';

import FoodList from 'src/shared/components/MealBuilder/FoodList';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import IngredientItem from 'src/shared/components/MealBuilder/IngredientItem';
import { MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';

const styleTableCell = {
  fontSize: 14,
  padding: '10px',
};

function IngredientList({ meal }: { meal: MealDataForBuilder }) {
  const [foodAdded, setFoodAdded] = useState(false);

  return (
    <>
      <FoddAddedContext.Provider value={{ foodAdded, setFoodAdded }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={styleTableCell} width={'16%'}>
                  Amount (g){' '}
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Food
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Carbs&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Fat&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell style={styleTableCell} align="right">
                  Calories&nbsp;(kcal)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                {meal.ingredientDetails.map((ingredient, index) => (
                  <IngredientItem key={index} ingredient={ingredient.ingredient} />
                ))}
                <StyledTableRow key={meal.name}>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.protein}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.fat}</StyledTableCell>
                  <StyledTableCell align="right">{meal.macros.calories}</StyledTableCell>
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
