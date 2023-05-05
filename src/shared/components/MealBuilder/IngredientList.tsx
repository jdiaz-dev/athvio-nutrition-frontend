/* eslint-disable indent */
import React, { useState } from 'react';

import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import FoodList from 'src/shared/components/MealBuilder/FoodList';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { FoddAddedContext } from 'src/shared/components/MealBuilder/FoddAddedContext';
import IngredientItem from 'src/shared/components/MealBuilder/IngredientItem';
import { DisplayedIngredient, MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { IngredientType } from 'src/shared/Consts';

const styleTableCell = {
  fontSize: 14,
  padding: '10px',
};

function IngredientList({ meal }: { meal: MealDataForBuilder }) {
  const [foodAdded, setFoodAdded] = useState(false);
  console.log('---------meal', meal);
  return (
    <>
      <FoddAddedContext.Provider value={{ foodAdded, setFoodAdded }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={styleTableCell} width={'16%'}>
                  Amount
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
                {meal.ingredientDetails.map((ingredientDetail, index) => {
                  const displayedIngredient: DisplayedIngredient =
                    ingredientDetail.ingredientType == IngredientType.UNIQUE_INGREDIENT && ingredientDetail.ingredient
                      ? { ingredientType: IngredientType.UNIQUE_INGREDIENT, ...ingredientDetail.ingredient }
                      : ({
                          ingredientType: ingredientDetail.ingredientType,
                          amount: ingredientDetail.customIngredient?.amount,
                          label: ingredientDetail.customIngredient?.label,
                          name: ingredientDetail.customIngredient?.name,
                          ...ingredientDetail.customIngredient?.macros,
                        } as DisplayedIngredient);

                  return <IngredientItem key={index} displayedIngredient={displayedIngredient} />;
                })}
                <StyledTableRow>
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
